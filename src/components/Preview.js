import React from "react";
import { Flex, Box } from "components/Grid";
import { Paragraph, H1, Low } from "components/Font";
import Link from "./Link";

const Preview = ({ title, description, to, badge, footer }) => (
  <Link to={to}>
    <Flex flexDirection="column" mb={24}>
      <Flex alignItems="center">
        <H1>{title}</H1>

        {!!badge && <Box ml={24}>{badge}</Box>}
      </Flex>

      <Paragraph my={0}>{description}</Paragraph>

      {!!footer && <Box my="8px">{footer}</Box>}
    </Flex>
  </Link>
);

export default Preview;
