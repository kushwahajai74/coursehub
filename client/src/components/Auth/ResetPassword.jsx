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
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearError,
  clearMessage,
  resetPassword,
} from "../../features/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message, isLoading } = useSelector((state) => state.profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword({ password, confirmPassword, token }));
    navigate("/login");
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  return (
    <Container
      h={"85vh"}
      py={16}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
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
          <Input
            required
            variant={"filled"}
            type="password"
            id="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            focusBorderColor="yellow.500"
          />
          <Button
            colorScheme="yellow"
            type="submit"
            width={"full"}
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
