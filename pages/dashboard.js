import { Flex } from "@chakra-ui/layout";
import React from "react";
import useWindowSize from "../src/CustomHooks/UseWindows";
import Colors from "../src/Constants/Colors";
import { Button } from "@chakra-ui/button";
export default function dashboard() {
  const getWindowSize = useWindowSize();
  return (
    <Flex
      h={getWindowSize.height}
      w={getWindowSize.width}
      {...styleProps.dashboardWrapper}
    >
      <Flex flexDirection="row">
        <Button variant="solid" color={Colors.green}>
          MENU
        </Button>
      </Flex>
    </Flex>
  );
}

const styleProps = {
  dashboardWrapper: {
    backgroundColor: Colors.white,
  },
};
