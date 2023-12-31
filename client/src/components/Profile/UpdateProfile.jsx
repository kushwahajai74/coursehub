import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../features/profileSlice";
import { useNavigate } from "react-router-dom";

import { getMyProfile } from "../../features/userSlice";

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const { isLoading } = useSelector((state) => state.profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile({ name, email }));
    dispatch(getMyProfile());
    navigate("/profile");
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
          <Button
            isLoading={isLoading}
            w={"full"}
            mt={4}
            colorScheme={"yellow"}
            type="submit"
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
