import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const fileExportCss = {
  cursor: "pointer",
  height: "100%",
  width: "110%",
  marginLeft: "-5%",
  padding: "0",
  border: "none",
  color: "#ECC94B",
  backgroundColor: "transparent",
};

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");

  const fileSelectorStyle = {
    "&::file-selector-button": fileExportCss,
  };

  const imagePrevHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <Container h={"95vh"}>
      <VStack
        height={"full"}
        justifyContent={"center"}
        spacing={"10"}
        marginTop={"2rem"}
      >
        <Heading textTransform={"uppercase"} children={"Registration"} />
        <form style={{ width: "100%" }}>
          <Box display={"flex"} justifyContent={"center"}>
            <Avatar size={"2xl"} src={imagePrev} />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              variant={"filled"}
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              variant={"filled"}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box my={4}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              type="password"
              required
              variant={"filled"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Password"
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="avatar" children="Avatar" />
            <Input
              accept="image/*"
              name="avatar"
              required
              type="file"
              id="avatar"
              onChange={imagePrevHandler}
              focusBorderColor="yellow.500"
              css={fileSelectorStyle}
            />
          </Box>
          <Box>
            <Link to={"/forgetpassword"}>
              <Button fontSize={"sm"} variant={"link"}>
                Forget password?
              </Button>
            </Link>
          </Box>
          <Button my={4} colorScheme={"yellow"}>
            Sign Up
          </Button>
          <Box my={4}>
            Already Signed Up?{" "}
            <Link to={"/login"}>
              <Button variant={"link"} colorScheme="yellow">
                Login
              </Button>
            </Link>{" "}
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
