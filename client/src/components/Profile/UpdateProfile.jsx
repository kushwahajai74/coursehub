import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../features/userSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(name, email));
  };
  return (
    <Container minH={"95vh"} py={16}>
      <form onSubmit={handleSubmit}>
        <Heading
          my={16}
          children="update Profile"
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
        />
        <VStack spacing={8}>
          <Input
            required
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Button w={"full"} mt={4} colorScheme={"yellow"} type="submit">
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
