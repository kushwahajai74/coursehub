import React from "react";
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import vector from "../../assets/images/bg.png";
import "./Home.css";
import { Link } from "react-router-dom";
import { CgGoogle, CgYoutube } from "react-icons/cg";
import { SiUdemy, SiAmazon } from "react-icons/si";
import { DiAws } from "react-icons/di";
import introVideo from "../../assets/videos/intro.mp4";

const Home = () => {
  return (
    <section>
      <div className="container">
        <Stack
          direction={["column", "row"]}
          height="100%"
          justifyContent={["center", "space-between"]}
          alignItems="center"
          spacing={["16", "56"]}
        >
          <VStack
            width={"full"}
            alignItems={["center", "flex-end"]}
            spacing="8"
          >
            <Heading
              children="LEARN BEYOND LIMITS"
              size={"2xl"}
              textAlign={["center", "right"]}
            />
            <Text
              fontSize={"2xl"}
              textAlign={["center", "right"]}
              fontFamily={"cursive"}
              children="Elevate Your Skills And Knowledge with Our Platform!"
            />
            <Link to="/courses">
              <Button size={"lg"} colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>

          <Image
            className="vector-graphics"
            boxSize={"md"}
            src={vector}
            objectFit="contain"
          />
        </Stack>
      </div>
      <Box backgroundColor={"blackAlpha.800"} padding={"8"}>
        <Heading
          textAlign={"center"}
          fontFamily={"body"}
          color={"yellow.400"}
          children="OUR BRANDS"
        />
        <HStack
          className="brandsBanner"
          justifyContent={"space-evenly"}
          marginTop={"5"}
          gap={"6"}
        >
          <CgGoogle />
          <CgYoutube />
          <SiAmazon />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <video
          src={introVideo}
          controls
          controlsList="nodownload nofullscreen "
          disablePictureInPicture
          disableRemotePlayback
          muted
        ></video>
      </div>
    </section>
  );
};

export default Home;
