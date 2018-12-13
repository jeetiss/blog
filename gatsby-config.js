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
    "gatsby-plugin-no-sourcemaps",
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-126675501-1'
      }
    },
    {
      resolve: "gatsby-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '›',
              aliases: {},
            },
          },
        ],
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
