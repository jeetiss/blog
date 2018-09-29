const compile = require("@mdx-js/mdx");
const babel = require("@babel/core");
const BabelPluginGatherExports = require("babel-plugin-gather-exports");
const objRestSpread = require("@babel/plugin-proposal-object-rest-spread");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) =>
  new Promise(resolve => {
    const { createNodeField } = actions;

    if (node.internal.type === `Mdx`) {
      compile(node.rawBody)
        .then(code => {
          const instance = new BabelPluginGatherExports();

          babel.transform(code, {
            plugins: [instance.plugin, objRestSpread],
            presets: [require("@babel/preset-react")]
          });

          const meta = instance.state.exports.meta;

          if (meta && typeof meta === "object") {
            const value = createFilePath({ node, getNode });

            createNodeField({
              name: "slug",
              node,
              value: `/posts${value}`
            });

            Object.keys(meta).forEach(name =>
              createNodeField({
                node,
                name,
                value: meta[name]
              })
            );
          }
        })
        .then(resolve);
    } else {
      resolve();
    }
  });
