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
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-126675501-1"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "examples",
        path: path.join(__dirname, "/src/examples/"),
        ignore: ["**/.*"]
      }
    }
  ]
};
