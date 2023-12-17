import {
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container h={"95vh"}>
      <VStack height={"full"} justifyContent={"center"}>
        <Heading children={"Welcome to Course Bundler"} />
        <form style={{ width: "100%" }}>
          <Box my={4}>
            <FormLabel htmlFor="Email" children="Email Address" />
            <Input
              required
              type="email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              focusBorderColor="yellow.500"
              variant={"filled"}
            />
          </Box>

          <Box my={4}>
            <FormLabel htmlFor="Email" children="Password" />
            <Input
              type="password"
              required
              value={password}
              variant={"filled"}
              onChange={(e) => setPassword(e.target.value)}
              id="Password"
              placeholder="Password"
              focusBorderColor="yellow.500"
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
            Login
          </Button>
          <Box my={4}>
            New user?{" "}
            <Link to={"/register"}>
              <Button variant={"link"} colorScheme="yellow">
                Signup
              </Button>
            </Link>{" "}
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
