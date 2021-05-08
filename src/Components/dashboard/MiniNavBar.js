import { Flex } from "@chakra-ui/layout";
import React, { useContext } from "react";
import Colors from "../../Constants/Colors";
import { Button } from "@chakra-ui/button";
import Link from "next/link";
import { GrScorecard } from "react-icons/gr";
import { IoIosPersonAdd, IoIosCreate } from "react-icons/io";
import { FaListAlt } from "react-icons/fa";
import NavLoginButtonContext from "../../Context/NavLogInButtonContext";
import UserDataContext from "../../Context/UserDataContext";

export default function MiniNavBar() {
  const navLoginButtonContext = useContext(NavLoginButtonContext);
  const userDataContext = useContext(UserDataContext);
  return (
    <Flex
      flexDirection="column"
      justifyContent="stretch"
      backgroundColor="#ffffff"
      shadow="lg"
      padding="5"
      borderRadius="lg"
    >
      {userDataContext.data.type == 0 ? null : (
        <>
          <Button
            leftIcon={<IoIosPersonAdd color={Colors.green} size={25} />}
            variant="ghost"
            justifyContent="left"
          >
            Create New Account
          </Button>
          <br />
          <Button
            leftIcon={<IoIosCreate color={Colors.green} size={25} />}
            variant="ghost"
            justifyContent="left"
          >
            Create New Section
          </Button>
          <br />
        </>
      )}
      <Button
        leftIcon={<FaListAlt color={Colors.green} size={25} />}
        variant="ghost"
        justifyContent="left"
      >
        View Scores
      </Button>
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
