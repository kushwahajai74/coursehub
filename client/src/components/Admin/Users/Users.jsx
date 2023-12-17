import React from "react";
import Sidebar from "../Sidebar";
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import { RiDeleteBin2Fill } from "react-icons/ri";
const Row = ({ item, updateHandler, deleteUserHandler }) => {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription.status === "active" ? "Active" : "Not Avtive"}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            variant={"outline"}
            color={"purple.500"}
            onClick={() => updateHandler(item._id)}
          >
            Change Role
          </Button>
          <Button
            color={"purple.600"}
            onClick={() => deleteUserHandler(item._id)}
          >
            <RiDeleteBin2Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

const Users = () => {
  const users = [
    {
      _id: "sddfsfsdfsdf",
      name: "John Doe",
      email: "john@email.com",
      role: "admin",
      subscription: {
        status: "active",
      },
    },
  ];
  const updateHandler = (id) => {
    console.log(id);
  };
  const deleteUserHandler = (id) => {
    console.log(id);
  };
  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
      css={{ cursor: `url(${cursor}), default` }}
    >
      <Box p={["0", "8"]} overflowX={"auto"}>
        <Heading
          children="All Users"
          my={16}
          ml={["0", "16"]}
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />
        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size={"lg"}>
            <TableCaption>All available users in a database</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((item) => (
                <Row
                  item={item}
                  key={item._id}
                  updateHandler={updateHandler}
                  deleteUserHandler={deleteUserHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default Users;
