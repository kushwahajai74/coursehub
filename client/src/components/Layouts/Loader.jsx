import { Container, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Container
      w={"full"}
      height={"95vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner
        emptyColor="gray"
        thickness="8px"
        speed="0.65s"
        color="yellow.500"
        size="xl"
        boxSize={"10vmax"}
      />
    </Container>
  );
};

export default Loader;
