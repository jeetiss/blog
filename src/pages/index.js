import React from "react";
import { Flex, Box } from "../components/Flexbox";
import Layout from "../components/Layout";
import Video from "../components/Video";
import { Link } from "gatsby";

import { Text, Header } from "../components/Text";

export default () => (
  <Layout>
    <Flex py="30vh" flexDirection="column">
      <Box>
        <Header>Position sticky && grid layout</Header>
      </Box>

      <Box>
        <Text>Демка календаря с месяцем на плавающих блоках</Text>
      </Box>

      <Box>
        <Link to="./calendar">
          <Video src="https://ucarecdn.com/e9c96dc9-4f84-4a1d-91e6-0ad535d48245/" />
        </Link>
      </Box>
    </Flex>
  </Layout>
);
