import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  clearError,
  clearMessage,
  createCourse,
} from "../../../features/adminSlice";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const { error, message, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
      navigate("/admin/courses");
    }
  }, [error, message]);

  const createCourseHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("createdBy", createdBy);
    formData.append("category", category);
    formData.append("file", image);

    dispatch(createCourse(formData));
  };

  return (
    <Grid
      minH={"100vh"}
      templateColumns={["1fr", "5fr 1fr"]}
      css={{ cursor: `url(${cursor}), default` }}
    >
      <Container py={16}>
        <form onSubmit={createCourseHandler}>
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
            <Button
              w={"full"}
              colorScheme="purple"
              type="submit"
              isLoading={isLoading}
            >
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
