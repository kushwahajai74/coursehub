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
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = React.useState("");
  console.log(token);

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
          children={"Reset Password"}
          my={"9"}
          textAlign={"center"}
        />
        <VStack spacing={8}>
          <Input
            required
            variant={"filled"}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            focusBorderColor="yellow.500"
          />
          <Button colorScheme="yellow" type="submit" width={"full"}>
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
