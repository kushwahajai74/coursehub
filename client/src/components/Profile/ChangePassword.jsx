import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = () => {};

  return (
    <Container minH={"95vh"} py={"16"}>
      <form>
        <Heading
          children="Update Password"
          textTransform={"uppercase"}
          textAlign={["center", "left"]}
          my={16}
        />
        <VStack spacing={8}>
          <Input
            required
            placeholder="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ChangePassword;
