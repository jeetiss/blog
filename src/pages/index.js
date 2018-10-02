import "dayjs/locale/ru";
import React from "react";
import { graphql } from "gatsby";
import dayjs from "dayjs";
import Preview from "components/Preview";
import { Flex } from "components/Grid";
import { Low } from "components/Font";
import { pluralize, pluralizeDate } from "../plural";

export const query = graphql`
  query {
    allMdx(sort: { fields: [fields___date], order: DESC }, limit: 1000) {
      edges {
        node {
          timeToRead

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
    .map(({ node }) => ({
      to: node.fields.slug,
      title: node.fields.title,
      description: node.fields.description,
      footer: (
        <Flex justifyContent="space-between">
          <Low>
            {pluralizeDate(
              dayjs(node.fields.date)
                .locale("ru")
                .format("D MMMM YYYY")
            )}
          </Low>
          <Low>
            {pluralize(node.timeToRead, ":n минута", ":n минуты", ":n минут")}
          </Low>
        </Flex>
      )
    }))
    .map(post => <Preview {...post} />);
