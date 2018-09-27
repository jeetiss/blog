require("dotenv").config();
const path = require("path");

module.exports = {
  pathPrefix: "/",
  plugins: [
    {
      resolve: "gatsby-plugin-styled-components",
      options: {
        displayName: false,
        fileName: false,
        pure: true
      }
    },
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
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    }
  ]
};
