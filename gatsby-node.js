require("dayjs/locale/ru");
const { createFilePath } = require("gatsby-source-filesystem");
const dayjs = require("dayjs");
const { pluralizeDate } = require("./src/plural");

exports.onCreateNode = ({ node, getNode, actions }) =>
  new Promise(resolve => {
    const { createNodeField } = actions;

    if (node.internal.type === `Mdx`) {
      const value = createFilePath({ node, getNode });

      createNodeField({
        name: "slug",
        node,
        value: `/posts${value}`
      });

      createNodeField({
        name: "formattedDate",
        node,
        value: pluralizeDate(
          dayjs(node.frontmatter.date)
            .locale("ru")
            .format("D MMMM YYYY")
        )
      });
    }

    resolve();
  });
