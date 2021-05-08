import { Flex, Text } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import axios from "axios";
import { AiFillCaretDown } from "react-icons/ai";
import UserDataContext from "../../Context/UserDataContext";
export default function DataTable() {
  const [activityList, setActivityList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userDataContext = useContext(UserDataContext);
  async function getActivityScores() {
    setIsDataLoading(!isDataLoading);
    if (userDataContext.data.type == 0) {
      var activityInfo = axios
        .get(
          "https://opdbs.vercel.app/api/activity/student/" +
            userDataContext.data.id
        )
        .then((response) => {
          return setActivityList((prevData) => {
            return prevData.concat(response.data);
          });
        })
        .then((res) => {
          setIsDataLoading(false);
        });
    } else {
      setIsDataLoading(false);
      // var activityInfo = axios
      //   .get(
      //     "https://opdbs.vercel.app/api/activity/student/" +
      //       userDataContext.data.id
      //   )
      //   .then((response) => {
      //     return setActivityList((prevData) => {
      //       return prevData.concat(response.data);
      //     });
      //   })
      //   .then((res) => {
      //     setIsDataLoading(false);
      //   });
    }
  }
  useEffect(() => {
    getActivityScores();
  }, []);
  return (
    <Flex
      flex={9}
      flexDirection="column"
      justifyContent="center"
      backgroundColor="#ffffff"
      alignItems="flex-end"
      justifyContent="center"
      shadow="lg"
      padding="10"
      borderRadius="lg"
    >
      {userDataContext.data.type == 0 ? null : (
        <Flex flexDirection="row" alignItems="center">
          <Text>Select Activity: </Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<AiFillCaretDown />}>
              Activity1
            </MenuButton>
            <MenuList>
              <MenuItem>Activity1</MenuItem>
              <MenuItem>Activity2</MenuItem>
              <MenuItem>Activity3</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}

      {isDataLoading ? (
        <Spinner />
      ) : (
        <Table variant="striped" size="lg" colorScheme="teal">
          {userDataContext.data.type == 0 ? (
            <Thead>
              <Tr>
                <Th>ACTIVITY</Th>
                <Th>NAME</Th>
                <Th isNumeric>SCORE</Th>
              </Tr>
            </Thead>
          ) : (
            <Thead>
              <Tr>
                <Th>STUDENT ID</Th>
                <Th>STUDENT NAME</Th>
                <Th isNumeric>SCORE</Th>
              </Tr>
            </Thead>
          )}
          <Tbody alignItems="center" justifyContent="center">
            {activityList.map((val, index) => {
              return (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{val.id.title}</Td>
                  <Td isNumeric>{val.id.score}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Flex>
  );
}
