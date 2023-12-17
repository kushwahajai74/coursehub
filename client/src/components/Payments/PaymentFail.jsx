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
import { RiCheckboxCircleFill, RiErrorWarningFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <Container h={"90vh"} p={16} spacing={4}>
      <VStack h={"full"} justifyContent={"center"}>
        <RiErrorWarningFill size={"5rem"} />
        <Heading children="Payment Failed" />
        <Link to={"/subscribe"}>
          <Button children="Try Again!" colorScheme="yellow" />
        </Link>
      </VStack>
    </Container>
  );
};

export default PaymentFail;
