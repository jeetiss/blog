import React from "react";
import CheckBox from "./Checkbox";
import Layout from "components/Layout";
import {Flex} from 'components/Flexbox'

export default () => (
  <Layout pt={160}>
    <Flex justifyContent='center'>
      <CheckBox type="checkbox" />

    </Flex>
  </Layout>
);
