import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buySubscription, clearError } from "../../features/paymentSlice";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../../assets/images/logo.webp";

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState(null);

  const { error, isLoading, subscriptionId } = useSelector(
    (state) => state.payment
  );

  const subscribeHandler = async () => {
    const { data } = await axios.get("/razorpaykey");
    setKey(data.key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (subscriptionId) {
      const openPopup = async () => {
        const options = {
          key,
          subscription_id: subscriptionId,
          name: "Coursehub",
          description: "Get access to premium content on Coursehub",
          image: logo,
          callback_url: "http://localhost:3000/api/v1/paymentverification",
          redirect: false,
          prefill: {
            name: user.name,
            email: user.email,
          },
          notes: {
            address: "Coursehub Corporate Office",
          },
          theme: {
            color: "#FFC800",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopup();
    }
  }, [error, subscriptionId, user.name, user.email, key]);

  return (
    <Container h={"90vh"} p={"16"}>
      <Heading
        textAlign={"center"}
        children={"Welcome"}
        textTransform={"uppercase"}
        my={"8"}
      ></Heading>
      <VStack
        spacing={0}
        alignItems={"stretch"}
        borderRadius={"lg"}
        boxShadow={"2xl"}
      >
        <Box
          bgColor={"yellow.400"}
          p={"4"}
          css={{ borderRadius: "8px 8px 0 0" }}
        >
          <Text children={"Pro pack - ₹299.00"} />
        </Box>
        <Box p={"4"}>
          <VStack spacing={"8"} textAlign={"center"} px={8} mt={4}>
            <Text children={"Join propack and get access to all content."} />
            <Heading size={"md"} children={"₹299 only"} />
          </VStack>
          <Button
            my={"8"}
            colorScheme="yellow"
            width={"full"}
            onClick={subscribeHandler}
            isLoading={isLoading}
          >
            Buy Now
          </Button>
        </Box>
        <Box
          bgColor={"blackAlpha.600"}
          p={"4"}
          css={{ borderRadius: "0 0 8px 8px" }}
        >
          <Heading
            size={"sm"}
            color={"white"}
            children={"100% REFUND ON CANCELLATIONS"}
          />
          <Text color={"white"} children={"*Terms & Conditions apply"} />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
