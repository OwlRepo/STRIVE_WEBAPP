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
import useWindowSize from "../../CustomHooks/UseWindows";
export default function DataTable() {
  const getWindowSize = useWindowSize();
  const [activity, setActivity] = useState("Activity 1");
  const [activityList, setActivityList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const userDataContext = useContext(UserDataContext);

  async function getActivityScores(props) {
    setIsDataLoading(!isDataLoading);
    if (userDataContext.data.type == 0) {
      var activityInfo = await axios
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
      var activityInfo = await axios
        .get(
          `https://opdbs.vercel.app/api/activity/studentsAct${props.actNumber}`
        )
        .then((response) => {
          return setActivityList(response.data);
        })
        .then((res) => {
          setIsDataLoading(false);
        });
    }
  }

  useEffect(() => {
    getActivityScores({ actNumber: "1" });
  }, []);

  return (
    <Flex {...styleProps.dataTableContainer}>
      {userDataContext.data.type == 0 ? null : (
        <Flex flexDirection="row" alignItems="center">
          <Text marginRight="2.5">Select Activity: </Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<AiFillCaretDown />}>
              {activity}
            </MenuButton>
            <MenuList
              onClick={(value) => {
                setActivity(value.target.value);
                const splittedString = value.target.value.split("");
                console.log(splittedString[splittedString.length - 1]);
                getActivityScores({
                  actNumber: splittedString[splittedString.length - 1],
                });
              }}
            >
              <MenuItem value="Activity 1">Activity 1</MenuItem>
              <MenuItem value="Activity 2">Activity 2</MenuItem>
              <MenuItem value="Activity 3">Activity 3</MenuItem>
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
                <Th>SCORE</Th>
              </Tr>
            </Thead>
          ) : (
            <Thead>
              <Tr>
                <Th>STUDENT ID</Th>
                <Th>STUDENT NAME</Th>
                <Th>SCORE</Th>
              </Tr>
            </Thead>
          )}
          <Tbody alignItems="center" justifyContent="center">
            {activityList.map((val, index) => {
              if (userDataContext.data.type == 0) {
                return (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{val.id.title}</Td>
                    <Td>{val.id.score}</Td>
                  </Tr>
                );
              } else {
                return (
                  <Tr key={index}>
                    <Td>{val.id.id}</Td>
                    <Td>
                      {val.id.lastName}, {val.id.firstName}{" "}
                      {val.id.middleInitial}
                    </Td>
                    <Td>{val.id.score}</Td>
                  </Tr>
                );
              }
            })}
          </Tbody>
        </Table>
      )}
    </Flex>
  );
}

const styleProps = {
  dataTableContainer: {
    flex: 9,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    alignItems: "flex-end",
    justifyContent: "center",
    shadow: "lg",
    padding: "10",
    borderRadius: "lg",
  },
};
