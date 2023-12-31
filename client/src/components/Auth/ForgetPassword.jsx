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
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  forgetPassword,
} from "../../features/profileSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");

  const { error, isLoading, message } = useSelector((state) => state.profile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(forgetPassword(email));
    navigate("/profile");
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
          <Button
            colorScheme="yellow"
            type="submit"
            width={"full"}
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
