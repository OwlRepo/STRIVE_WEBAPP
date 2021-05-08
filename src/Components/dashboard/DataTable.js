import { Flex, Text } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
import axios from "axios";
import UserDataContext from "../../Context/UserDataContext";
export default function DataTable() {
  const [activityList, setActivityList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const userDataContext = useContext(UserDataContext);
  async function getActivityScores() {
    setIsDataLoading(!isDataLoading);
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
  }
  useEffect(() => {
    getActivityScores();
  }, []);
  return (
    <Flex
      flex={9}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#ffffff"
      shadow="lg"
      padding="10"
      borderRadius="lg"
    >
      {isDataLoading ? (
        <Spinner />
      ) : (
        <Table variant="striped" size="lg" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ACTIVITY</Th>
              <Th>NAME</Th>
              <Th isNumeric>SCORE</Th>
            </Tr>
          </Thead>
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
