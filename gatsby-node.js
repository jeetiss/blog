require("@babel/register");

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(
    `
      {
        allFile(sort: { fields: mtimeMs, order: DESC }) {
          edges {
            node {
              absolutePath
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  const regex = /(\/[^\/]+)+\/examples\/[^\/]+\/index.js$/;
  const examples = result.data.allFile.edges
    .map(edge => edge.node)
    .filter(edge => regex.test(edge.absolutePath));

  const exampleInfos = examples
    .map(example => ({
      ...require(example.absolutePath).frontmatter,
      component: example.absolutePath
    }))
    .map(info => ({ ...info, link: `/example/${info.slug}` }))
    .filter(info => !info.hide);

  createPage({
    path: `/`,
    component: require.resolve("./src/templates/index.js"),
    context: { examples: exampleInfos }
  });

  exampleInfos.forEach(info =>
    createPage({ path: info.link, component: info.component })
  );
};
