import React from "react";
import { Link } from "gatsby";

import { Flex, Box } from "../components/Flexbox";
import Layout from "../components/Layout";
import Video from "../components/Video";
import { Text, Header } from "../components/Text";

const Example = ({ title, description, link, video }) => (
  <Flex my={120} flexDirection="column">
    <Box>
      <Header>{title}</Header>
    </Box>

    <Box>
      <Text>{description}</Text>
    </Box>

    <Box>
      <Link to={link}>
        <Video src={video} />
      </Link>
    </Box>
  </Flex>
);

export default ({ pageContext: { examples } }) => (
  <Layout>
    {examples.map((example, index) => (
      <Example key={index} {...example} />
    ))}
  </Layout>
);
