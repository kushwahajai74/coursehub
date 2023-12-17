import {
  Box,
  Button,
  Center,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const ForgetPassword = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container
      h={"85vh"}
      py={16}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form style={{ width: "100%" }}>
        <Heading
          textTransform={"uppercase"}
          children={"Forget Password"}
          my={"9"}
          textAlign={"center"}
        />
        <VStack spacing={8}>
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
          <Button colorScheme="yellow" type="submit" width={"full"}>
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
