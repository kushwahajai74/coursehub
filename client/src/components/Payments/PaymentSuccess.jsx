import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <Container h={"90vh"} p={16}>
      <Heading children="You Have Pro Pack" my={8} textAlign={"center"} />
      <VStack spacing={8} alignItems={"center"} boxShadow={"lg"} pb={"14"}>
        <Box
          bgColor={"yellow.400"}
          width={"full"}
          p={"4"}
          css={{ borderRadius: "8px 8px 0 0 " }}
        >
          <Text children={"Payment Success"} />
        </Box>
        <Box p={4}>
          <VStack
            textAlign={"center"}
            px={"8"}
            spacing={6}
            justifyContent={"center"}
          >
            <Text children="Congratulations! You are a pro member. Now you can access our premium content."></Text>
            <Heading size={"4xl"}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link to={"/profile"}>
          <Button children="Go to Profile" colorScheme="yellow" />
        </Link>
        <Heading size={"sm"} children="Refrence: dfjdkfhksdjfjdfjsdfh" />
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
