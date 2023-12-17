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
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Course = ({
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  return (
    <VStack
      className="course"
      alignItems={["center", "flex-start"]}
      padding={2}
      borderRadius={"lg"}
      borderColor={"gray.200"}
      boxShadow={"md"}
    >
      <Image src={imageSrc} boxSize="60" objectFit={"contain"} />
      <Heading
        textAlign={["center", "left"]}
        maxW="200px"
        size={"sm"}
        fontFamily={"sans-serif"}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />
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
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const courses = [
    "Web Development",
    "Data Structures & Algorithms",
    "Machine Learning",
    "Data Science",
    "Artificial Inteligence",
    "Game Development",
  ];
  const addToPlaylistHandler = (id) => {
    console.log("Added to playlist");
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
        {courses.map((item, index) => (
          <Link>
            <Button key={index} onClick={() => setCategory(item)} minW={"60"}>
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
        <Course
          title="Sample"
          imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVR5Yk775-DXTDk-8hsJhyx1G0p5_gpyK_ldRnwc8q49jraaSspfGRXK4pEi3Tw8cgyk&usqp=CAU"
          creator="Sample"
          description="Sample"
          lectureCount="2"
          addToPlaylistHandler={addToPlaylistHandler}
          id="Sample"
        />
        <Course
          title="Sample"
          imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVR5Yk775-DXTDk-8hsJhyx1G0p5_gpyK_ldRnwc8q49jraaSspfGRXK4pEi3Tw8cgyk&usqp=CAU"
          creator="Sample"
          description="Sample"
          lectureCount="2"
          addToPlaylistHandler={addToPlaylistHandler}
          id="Sample"
        />
        <Course
          title="Sample"
          imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVR5Yk775-DXTDk-8hsJhyx1G0p5_gpyK_ldRnwc8q49jraaSspfGRXK4pEi3Tw8cgyk&usqp=CAU"
          creator="Sample"
          description="Sample"
          lectureCount="2"
          addToPlaylistHandler={addToPlaylistHandler}
          id="Sample"
        />
        <Course
          title="Sample"
          imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVR5Yk775-DXTDk-8hsJhyx1G0p5_gpyK_ldRnwc8q49jraaSspfGRXK4pEi3Tw8cgyk&usqp=CAU"
          creator="Sample"
          description="Sample"
          lectureCount="2"
          addToPlaylistHandler={addToPlaylistHandler}
          id="Sample"
        />
        <Course
          title="Sample"
          imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVR5Yk775-DXTDk-8hsJhyx1G0p5_gpyK_ldRnwc8q49jraaSspfGRXK4pEi3Tw8cgyk&usqp=CAU"
          creator="Sample"
          description="Sample"
          lectureCount="2"
          addToPlaylistHandler={addToPlaylistHandler}
          id="Sample"
        />
        <Course
          title="Sample"
          imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVR5Yk775-DXTDk-8hsJhyx1G0p5_gpyK_ldRnwc8q49jraaSspfGRXK4pEi3Tw8cgyk&usqp=CAU"
          creator="Sample"
          description="Sample"
          lectureCount="2"
          addToPlaylistHandler={addToPlaylistHandler}
          id="Sample"
        />
      </Stack>
    </Container>
  );
};

export default Courses;
