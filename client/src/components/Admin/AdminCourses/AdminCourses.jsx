import React, { useState } from "react";
import Sidebar from "../Sidebar";
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import { RiDeleteBin7Fill } from "react-icons/ri";
import CourseModal from "./CourseModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourse } from "../../../features/coursesSlice";
const Row = ({ item, courseDetailsHandler, deleteCourseHandler }) => {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} alt="poster" />
      </Td>
      <Td>{item.title}</Td>
      <Td>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            variant={"outline"}
            color={"purple.500"}
            onClick={() => courseDetailsHandler(item._id)}
          >
            View Lectures
          </Button>
          <Button
            color={"purple.600"}
            onClick={() => deleteCourseHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

const AdminCourses = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { courses, error } = useSelector((state) => state.courses);

  useState(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    dispatch(getAllCourse());
  }, [error]);
  const courseDetailsHandler = (id) => {
    onOpen();
  };
  const deleteCourseHandler = (id) => {
    console.log(id);
  };
  const deleteLecturesHandler = (courseId, lectureId) => {
    console.log(courseId, lectureId);
  };
  const addLectureHandler = (e, courseId, title, description, video) => {
    e.preventDefault();
    console.log(courseId, title, description, video);
  };
  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
      css={{ cursor: `url(${cursor}), default` }}
    >
      <Box p={["0", "8"]} overflowX={"auto"}>
        <Heading
          children="All Courses"
          my={16}
          ml={["0", "16"]}
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />
        <TableContainer w={["100vw", "full"]}>
          <Table variant={"simple"} size={"lg"}>
            <TableCaption>All available courses in a database</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {courses?.map((item) => (
                <Row
                  item={item}
                  key={item._id}
                  courseDetailsHandler={courseDetailsHandler}
                  deleteCourseHandler={deleteCourseHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          id={"sdadasddsad"}
          courseTitle={"React Course"}
          addLectureHandler={addLectureHandler}
          deleteLecturesHandler={deleteLecturesHandler}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;
