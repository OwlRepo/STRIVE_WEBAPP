import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React, { useContext } from "react";
import Link from "next/link";
import NavLoginButtonContext from "../../Context/NavLogInButtonContext";
import { BiMenu } from "react-icons/bi";
export default function NavBarButtons() {
  const navLoginButtonContext = useContext(NavLoginButtonContext);

  return (
    <Flex flex={1} flexDirection="row" justifyContent="space-around">
      <Button variant="ghost" color="white" colorScheme="blackAlpha">
        FAQ
      </Button>
      <Button variant="ghost" color="white" colorScheme="blackAlpha">
        STRIVE Learning Model
      </Button>

      <Button variant="ghost" color="white" colorScheme="blackAlpha">
        STRIVE Mobile App
      </Button>
      <Link href={navLoginButtonContext.buttonRoute}>
        <Button
          variant="solid"
          shadow="lg"
          backgroundColor="#ffffff"
          color="#00adb5"
          colorScheme="whiteAlpha"
          onClick={() =>
            navLoginButtonContext.isLoggedIn
              ? null
              : navLoginButtonContext.handleLoggedInState()
          }
        >
          {navLoginButtonContext.buttonText}
        </Button>
      </Link>
    </Flex>
  );
}
