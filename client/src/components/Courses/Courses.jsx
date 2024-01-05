import {
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToPlaylist,
  clearError,
  clearMessage,
  getAllCourse,
} from "../../features/coursesSlice";
import toast from "react-hot-toast";
import { getMyProfile } from "../../features/userSlice";

const Course = ({
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  views,
  description,
  lectureCount,
  isLoading,
}) => {
  return (
    <VStack
      className="course"
      alignItems={["center", "flex-start"]}
      padding={2}
      borderRadius={"lg"}
      borderColor={"gray.200"}
      boxShadow={"2xl"}
      width={"300px"}
      height={"500px"}
      justifyContent={"space-between"}
    >
      <Image src={imageSrc} boxSize="60" objectFit={"contain"} mx={"auto"} />
      <Heading
        textAlign={["center", "left"]}
        maxW="200px"
        size={"sm"}
        fontFamily={"sans-serif"}
        noOfLines={3}
        children={title}
      />
      <Text
        noOfLines={2}
        children={description}
        textAlign={["center", "left"]}
      />
      <HStack>
        <Text
          fontWeight={"bold"}
          textTransform="uppercase"
          children={"Creator"}
        />
        <Text
          fontFamily={"body"}
          textTransform="uppercase"
          children={creator}
        />
      </HStack>
      <Heading
        textAlign={"center"}
        size="xs"
        children={`Lectures - ${lectureCount}`}
        textTransform="uppercase"
      />
      <Heading textAlign={"center"} size="xs" children={`Views - ${views}`} />
      <Stack direction={["column", "row"]} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={"yellow"}>Watch Now</Button>
        </Link>
        <Button
          variant={"ghost"}
          colorScheme={"yellow"}
          onClick={() => {
            addToPlaylistHandler(id);
          }}
          isLoading={isLoading}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const { courses, error, isLoading, message } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(getAllCourse({ keyword, category }));
  }, [keyword, category, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const coursesCategory = [
    "Web Development",
    "Data Structures & Algorithms",
    "Machine Learning",
    "Data Science",
    "Artificial Inteligence",
    "Game Development",
  ];

  const addToPlaylistHandler = async (id) => {
    await dispatch(addToPlaylist(id));
    dispatch(getMyProfile());
  };
  return (
    <Container minH={"95vh"} maxW="container.lg" paddingY={"8"}>
      <Heading children="All Courses" m={8} />
      <Input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        focusBorderColor="yellow.500"
        w="full"
        mb={8}
        size="lg"
        variant="filled"
        colorScheme="yellow"
        placeholder="Search a course..."
      />
      <HStack
        overflowX={"auto"}
        scrollBehavior={"smooth"}
        paddingY={"8"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {coursesCategory.map((item, index) => (
          <Link key={index}>
            <Button onClick={() => setCategory(item)}>
              <Text children={item} />
            </Button>
          </Link>
        ))}
      </HStack>
      <Stack
        direction={["column", "row"]}
        flexWrap="wrap"
        justifyContent={["flex-start", "space-evenly"]}
        alignItems={["center", "flex-start"]}
      >
        {courses.length > 0 ? (
          courses.map((course) => (
            <Course
              key={course._id}
              title={course.title}
              imageSrc={course.poster.url}
              creator={course.createdBy}
              description={course.description}
              lectureCount={course.numberOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              id={course._id}
              views={course.views}
              isLoading={isLoading}
            />
          ))
        ) : (
          <Heading opacity={0.5} mt={4} children="Course Not Found" />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
