import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  return (
    <Container h={"90vh"}>
      <VStack height={"full"} justifyContent={"center"}>
        <Heading children={"Contact Us"} />
        <form style={{ width: "100%" }}>
          <Box my={4}>
            <FormLabel htmlFor="Name" children="Name" />
            <Input
              required
              type="name"
              id="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              focusBorderColor="yellow.500"
              variant={"filled"}
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="Email" children="Email Address" />
            <Input
              required
              type="email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@gmail.com"
              focusBorderColor="yellow.500"
              variant={"filled"}
            />
          </Box>
          <Box my={4}>
            <FormLabel htmlFor="Message" children="Message" />
            <Textarea
              required
              id="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              focusBorderColor="yellow.500"
              variant={"filled"}
            />
          </Box>
          <Button my={4} colorScheme={"yellow"}>
            Send Me!
          </Button>
          <Box my={4}>
            Need Course?{" "}
            <Link to={"/request"}>
              <Button variant={"link"} colorScheme="yellow">
                Request a course
              </Button>
            </Link>{" "}
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
