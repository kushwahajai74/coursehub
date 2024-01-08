import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buySubscription,
  clearError,
  verifyPayment,
} from "../../features/paymentSlice";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../../assets/images/logo.webp";
import { useNavigate } from "react-router-dom";
import { clearError as courseClearError } from "../../features/coursesSlice";

const Subscribe = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [key, setKey] = useState(null);

  const { error, isLoading, subscriptionId } = useSelector(
    (state) => state.payment
  );
  const { error: courseError } = useSelector((state) => state.courses);

  const subscribeHandler = async () => {
    const { data } = await axios.get("/razorpaykey");
    setKey(data.key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch();
    }
    if (subscriptionId) {
      const openPopup = () => {
        const options = {
          key,
          subscription_id: subscriptionId,
          name: "Coursehub",
          description: "Get access to premium content on Coursehub",
          image: logo,
          currency: "USD",
          handler: function (response) {
            const razorpay_payment_id = response.razorpay_payment_id;
            const razorpay_subscription_id = response.razorpay_subscription_id;
            const razorpay_signature = response.razorpay_signature;

            // This function will be called after a successful payment
            dispatch(
              verifyPayment({
                razorpay_payment_id,
                razorpay_subscription_id,
                razorpay_signature,
              })
            );
            navigate(`/paymentsuccess?reference=${razorpay_payment_id}`);
          },
          prefill: {
            name: user.name,
            email: user.email,
            method: "upi",
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
    if (courseError) {
      toast.error(courseError);
      dispatch(courseClearError());
    }
  }, [error, subscriptionId, user.name, user.email, key, courseError]);

  return (
    <Container h={"90vh"} px={"12"}>
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

      <Heading
        children={"Note"}
        my={"3"}
        textAlign={"center"}
        textDecoration={"underline"}
      />
      <Text
        children={
          "Please use the following card number to process test transaction seemlessly."
        }
      />
      <Text children={"* 5267 3181 8797 5449"} />
      <Text children={"* Use any CVV and future expiry date"} />
    </Container>
  );
};

export default Subscribe;
