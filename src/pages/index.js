import React from "react";
import { Tabs, Tab } from "components/Tabs";
import { Box } from "components/Grid";
import { Value } from "react-powerplug/dist/react-powerplug.umd";

const toProps = (selfIndex, active, set) => ({
  onClick: () => set(selfIndex),
  active: selfIndex === active
});

export default () => (
  <Box mt={7}>
  <Value initial={1}>
    {({ value, set }) => (
      <Tabs>
        <Tab {...toProps(0, value, set)}>Первый таб</Tab>
        <Tab {...toProps(1, value, set)}>Второй таб</Tab>
        <Tab {...toProps(2, value, set)}>Третий таб</Tab>
        <Tab {...toProps(3, value, set)}>Четвертый таб</Tab>
      </Tabs>
    )}
  </Value>
  </Box>
);
