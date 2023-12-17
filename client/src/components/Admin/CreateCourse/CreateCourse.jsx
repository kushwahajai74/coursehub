import React, { useState } from "react";
import Sidebar from "../Sidebar";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import cursor from "../../../assets/images/cursor.png";
import { fileExportCss } from "../../Auth/Register";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const courses = [
    "Web Development",
    "Data Structures & Algorithms",
    "Machine Learning",
    "Data Science",
    "Artificial Inteligence",
    "Game Development",
  ];
  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
      css={{ cursor: `url(${cursor}), default` }}
    >
      <Container py={16}>
        <form>
          <Heading
            children="Create Course"
            my={8}
            ml={["0", "16"]}
            textTransform={"uppercase"}
            textAlign={["center", "left"]}
          />
          <VStack m="auto" spacing={8}>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              focusBorderColor="purple.300"
              type="text"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              placeholder="Created By"
              focusBorderColor="purple.300"
              type="text"
            />
            <Select
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {courses.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              onChange={changeImageHandler}
              placeholder="Image"
              focusBorderColor="purple.300"
              type="file"
              css={{
                "&::file-selector-button": {
                  ...fileExportCss,
                  color: "purple",
                },
              }}
            />
            {imagePrev && (
              <Image
                src={imagePrev}
                alt="image"
                boxSize={64}
                objectFit={"contain"}
              />
            )}
            <Button w={"full"} colorScheme="purple" type="submit">
              Create
            </Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
