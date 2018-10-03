import React, { Children } from "react";
import { Flex, Box } from "./Grid";
import Button from "./Button";

const Tab = ({ active, ...props }) => (
  <Button type={active ? "primary" : "cancel"} {...props} />
);

const Tabs = ({ children }) => (
  <Flex mr="-8px">
    {Children.toArray(children).map((child, index) => (
      <Box key={index} ml={[16, 32]}>
        {child}
      </Box>
    ))}
  </Flex>
);

export { Tabs, Tab };
