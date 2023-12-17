import { Box, HStack, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

import { TiSocialInstagram } from "react-icons/ti";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg={"blackAlpha.900"} minH={"10vh"} padding={8}>
      <Stack
        direction={["column", "row"]}
        justifyContent={["center", "space-between"]}
        alignItems={"center"}
      >
        <VStack color={"yellow.500"} alignItems={["center", "flex-start"]}>
          <Heading children="All rights reserved"></Heading>
          <Text children="Jai kushwaha &copy; 2023" />
        </VStack>
        <HStack color={"white"} fontSize={35} spacing={8}>
          <a href="http://instagram.com/jaikushwaha_" target="_blank">
            <TiSocialInstagram />
          </a>
          <a href="http://linkedin.com/in/kushwahajai74" target="_blank">
            <FaLinkedin />
          </a>
          <a href="http://github.com/kushwahajai74" target="_blank">
            <FaGithub />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
