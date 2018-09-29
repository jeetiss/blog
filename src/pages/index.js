import React from "react";
import { graphql } from "gatsby";
import Preview from "components/Preview";

export const query = graphql`
  {
    allMdx(sort: { fields: [fields___date], order: DESC }, limit: 1000) {
      edges {
        node {
          fields {
            title
            description
            date
            slug
          }
        }
      }
    }
  }
`;

export default ({ data }) =>
  data.allMdx.edges
    .map(({ node }) => node.fields)
    .map(fields => ({
      title: fields.title,
      description: fields.description,
      href: fields.slug
    }))
    .map(post => <Preview {...post} />);
