import React, { useEffect, useState } from "react";
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

import toast from "react-hot-toast";
import {
  getAllCourse,
  getCourseLectures,
} from "../../../features/coursesSlice";
import {
  addLectures,
  clearError,
  clearMessage,
  deleteCourse,
  deleteLectures,
} from "../../../features/adminSlice";
const Row = ({
  item,
  courseDetailsHandler,
  deleteCourseHandler,
  isLoading,
}) => {
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
      <Td isNumeric>{item.numberOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={"flex-end"}>
          <Button
            variant={"outline"}
            color={"purple.500"}
            onClick={() => courseDetailsHandler(item._id, item.title)}
            isLoading={isLoading}
          >
            View Lectures
          </Button>
          <Button
            color={"purple.600"}
            onClick={() => deleteCourseHandler(item._id)}
            isLoading={isLoading}
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
  const [courseTitle, setCourseTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { courses, lectures } = useSelector((state) => state.courses);
  const { error, message, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    dispatch(getAllCourse({ keyword: "", category: "" }));
  }, [error, message]);

  const courseDetailsHandler = (courseId, courseTitle) => {
    dispatch(getCourseLectures(courseId));
    setCourseTitle(courseTitle);
    setCourseId(courseId);
    onOpen();
  };
  const deleteCourseHandler = (id) => {
    dispatch(deleteCourse(id));
  };
  const deleteLecturesHandler = async (courseId, lectureId) => {
    await dispatch(deleteLectures({ courseId, lectureId }));
    dispatch(getCourseLectures(courseId));
  };
  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", video);

    await dispatch(addLectures({ formData, courseId }));
    dispatch(getCourseLectures(courseId));
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
                  courseDetailsHandler={() =>
                    courseDetailsHandler(item._id, item.title)
                  }
                  deleteCourseHandler={() => deleteCourseHandler(item._id)}
                  isLoading={isLoading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          id={courseId}
          courseTitle={courseTitle}
          addLectureHandler={addLectureHandler}
          deleteLecturesHandler={deleteLecturesHandler}
          lectures={lectures}
          isLoading={isLoading}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;
