import React from "react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const users = [
    {
      _id: "sddfsfsdfsdf",
      title: "React Course",
      category: "Web Development",
      poster: {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVR5Yk775-DXTDk-8hsJhyx1G0p5_gpyK_ldRnwc8q49jraaSspfGRXK4pEi3Tw8cgyk&usqp=CAU",
      },
      createdBy: "Jai Kushwaha",
      views: "123",
      numOfVideos: "3",
    },
  ];
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
              {users.map((item) => (
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
