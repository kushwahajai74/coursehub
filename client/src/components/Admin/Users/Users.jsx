import React, { useEffect } from "react";
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
import {
  clearError,
  clearMessage,
  deleteUser,
  getAllUsers,
  updateUserRole,
} from "../../../features/adminSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Row = ({ item, updateHandler, deleteUserHandler, isLoading }) => {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription?.status === "active" ? "Active" : "Not Active"}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            variant={"outline"}
            color={"purple.500"}
            onClick={() => updateHandler(item._id)}
            isLoading={isLoading}
          >
            Change Role
          </Button>
          <Button
            color={"purple.600"}
            isLoading={isLoading}
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
  const dispatch = useDispatch();
  const { error, message, isLoading, users } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    dispatch(getAllUsers());
  }, [error, message]);

  const updateHandler = (id) => {
    dispatch(updateUserRole(id));
  };
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
              {users.length > 0 &&
                users.map((item) => (
                  <Row
                    item={item}
                    key={item._id}
                    updateHandler={() => updateHandler(item._id)}
                    deleteUserHandler={() => deleteUserHandler(item._id)}
                    isLoading={isLoading}
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
