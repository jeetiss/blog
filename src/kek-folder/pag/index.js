import React from "react";
// import { graphql } from "gatsby";
import Preview from "components/Preview";
import { Flex } from "components/Grid";
import { Low } from "components/Font";
import Badge from "components/Badge";
import { pluralize } from "../plural";

// export const query = graphql`
//   query {
//     allMdx(limit: 1000) {
//       edges {
//         node {
//           timeToRead

//           fields {
//             slug
//             formattedDate
//           }

//           frontmatter {
//             date
//             title
//             status
//             description
//           }
//         }
//       }
//     }
//   }
// `;

export default ({ data, location }) => {
  const posts = data.allMdx.edges
    .filter(
      ({ node }) =>
        node.frontmatter.status !== "wip" || /wip=1$/.test(location.search)
    )
    .map(({ node }) => ({
      to: `${node.fields.slug}${location.search}`,
      title: node.frontmatter.title,
      description: node.frontmatter.description,
      badge: <Badge>wip</Badge>,
      footer: (
        <Flex justifyContent="space-between">
          <Low>{node.fields.formattedDate}</Low>
          <Low>
            {pluralize(node.timeToRead, ":n минута", ":n минуты", ":n минут")}
          </Low>
        </Flex>
      )
    }))
    .map((post, key) => <Preview key={key} {...post} />);

  const empty = (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{ height: "70vh" }}
    >
      <Low>Тут пока ничего нет 👨🏻‍💻</Low>
    </Flex>
  );

  return posts.length === 0 ? empty : posts;
};
