import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Subscribe = () => {
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
          <Button my={"8"} colorScheme="yellow" width={"full"}>
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
