import React from "react";
import CheckBox from "./Checkbox";
import Layout from "../../components/Layout";
import { Flex } from "../../components/Flexbox";

export const frontmatter = {
  title: 'Анимация чекбокса',
  description: 'Идею взял c кодпена 🤷🏻‍♂️',
  slug: 'checkbox',
  video: 'https://ucarecdn.com/0fee1cce-429c-42d0-b117-a4f88683f3e4/',
}

export default () => (
  <Layout pt={160}>
    <Flex justifyContent="center">
      <CheckBox type="checkbox" />
    </Flex>
  </Layout>
);
