import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  changePassword,
  clearError,
  clearMessage,
} from "../../features/userSlice";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { error, isLoading, message } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearError());
  //   }
  //   if (message) {
  //     toast.success(message);
  //     dispatch(clearMessage());
  //     navigate("/profile");
  //   }
  // }, [error, message, navigate]);

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword({ oldPassword, newPassword, confirmPassword }));
  };

  return (
    <Container minH={"95vh"} py={"16"}>
      <form onSubmit={handleSubmit}>
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

export default ChangePassword;
