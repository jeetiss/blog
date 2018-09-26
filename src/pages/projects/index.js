import React from "react";
import { graphql } from "gatsby";
import Font from "components/Font";
import { Box } from "components/Grid";
import Preview from "components/Preview";

export default ({ data }) => (
  <>
    <Box mt={16}>
      <Font>oпенсорс</Font>
    </Box>

    {data.github.viewer.repositoriesContributedTo.nodes
      .map(rep => ({
        href: rep.url,
        description: rep.description,
        title: rep.name
      }))
      .map((props, i) => (
        <Preview {...props} key={i} />
      ))}
  </>
);

export const query = graphql`
  query {
    github {
      viewer {
        repositoriesContributedTo(
          contributionTypes: [COMMIT, PULL_REQUEST]
          privacy: PUBLIC
          orderBy: { direction: DESC, field: STARGAZERS }
          first: 8
        ) {
          nodes {
            name
            description
            url
          }
        }
      }
    }
  }
`;
