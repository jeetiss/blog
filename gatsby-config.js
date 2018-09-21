const path = require("path");

module.exports = {
  pathPrefix: "/",
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"]
      }
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        components: path.join(__dirname, "src/components"),
        pages: path.join(__dirname, "src/pages")
      }
    },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/Layout")
      }
    }
  ]
};
