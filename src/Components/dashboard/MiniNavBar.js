import { Flex } from "@chakra-ui/layout";
import React, { useContext } from "react";
import Colors from "../../Constants/Colors";
import { Button } from "@chakra-ui/button";
import Link from "next/link";
import NavLoginButtonContext from "../../Context/NavLogInButtonContext";

export default function MiniNavBar() {
  const navLoginButtonContext = useContext(NavLoginButtonContext);
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#ffffff"
      shadow="lg"
      padding="5"
      borderRadius="lg"
    >
      <Button variant="ghost">View Scores</Button>
      <br />
      <Link href={navLoginButtonContext.isLoggedIn ? "/" : "/login"}>
        <Button
          variant="solid"
          shadow="lg"
          backgroundColor={Colors.green}
          color={Colors.white}
          colorScheme="cyan"
          onClick={() =>
            navLoginButtonContext.isLoggedIn
              ? navLoginButtonContext.handleLoggedInState()
              : null
          }
        >
          {navLoginButtonContext.isLoggedIn ? "LOG OUT" : "LOG IN"}
        </Button>
      </Link>
    </Flex>
  );
}
