import React from "react";

import { Flex, Box } from "../components/Flexbox";
import Layout from "../components/Layout";
import Video from "../components/Video";
import Link from "../components/Link";
import { Text, Header } from "../components/Text";

const Example = ({ title, description, link, video }) => (
  <Flex my={120} flexDirection="column">
    <Link to={link}>
      <Box>
        <Header>{title}</Header>
      </Box>

      <Box>
        <Text>{description}</Text>
      </Box>

      <Box>
        <Video src={video} />
      </Box>
    </Link>
  </Flex>
);

export default ({ pageContext: { examples } }) => (
  <Layout>
    {examples.map((example, index) => (
      <Example key={index} {...example} />
    ))}
  </Layout>
);
