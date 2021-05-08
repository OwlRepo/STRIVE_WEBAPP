import { Flex } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import useWindowSize from "../src/CustomHooks/UseWindows";
import Colors from "../src/Constants/Colors";
import { Spacer } from "@chakra-ui/layout";
import NavLoginButtonContext from "../src/Context/NavLogInButtonContext";
import UserInformations from "../src/Components/dashboard/UserInformations";
import MiniNavBar from "../src/Components/dashboard/MiniNavBar";
import DataTable from "../src/Components/dashboard/DataTable";
import axios from "axios";
import UserDataContext from "../src/Context/UserDataContext";
import Router from "next/router";
export default function dashboard(props) {
  const getWindowSize = useWindowSize();
  const userDataContext = useContext(UserDataContext);
  const navLoginButtonContext = useContext(NavLoginButtonContext);

  useEffect(() => {
    if (!navLoginButtonContext.isLoggedIn) {
      Router.push("/");
    }
  }, []);

  return (
    <Flex
      flexDirection={getWindowSize.width < 960 ? "column" : "row"}
      h={getWindowSize.height}
      {...styleProps.dashboardWrapper}
    >
      <Flex flexDirection="column">
        <UserInformations data={userDataContext.data} />
        <MiniNavBar />
      </Flex>
      <Spacer />
      <DataTable />
    </Flex>
  );
}

// export async function getServerSideProps(context) {
//   const dummyData = {
//     id: "2000138301",
//     password: "abc123",
//   };
//   var fetchedTitle = await axios
//     .get("https://opdbs.vercel.app/api/checkid/login", dummyData)
//     .then((response) => {
//       return (fetchedTitle = response.data);
//     });

//   return {
//     props: {
//       data: fetchedTitle,
//     },
//   };
// }

const styleProps = {
  dashboardWrapper: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: Colors.white,
    padding: "10",
  },
};
