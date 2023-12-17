import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileExportCss } from "../Auth/Register";

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = {
    name: "John Doe",
    email: "johndoe@email.com",
    createdAt: String(new Date().toISOString()),
    subscription: {
      status: "active",
    },
    role: "user",
    playlist: [
      {
        course: "dskakajsadsa",
        poster: "sdadadasd",
      },
      {
        course: "dskakajsad",
        poster: "sdadadasd",
      },
      {
        course: "dskakaj",
        poster: "sdadadasd",
      },
    ],
  };
  const removeFromPlaylistHandler = (id) => {
    console.log(id);
  };
  const channgeImageSubmitHandler = (e, image) => {
    e.preventDefault();
    console.log(image);
  };
  return (
    <Container minH={"95vh"} maxW={"container.lg"}>
      <Heading children={"PROFILE"} m={8} />
      <Stack
        direction={["column", "row"]}
        alignItems={"center"}
        justifyContent={"flex-start"}
        spacing={["8", "16"]}
        padding={8}
      >
        <VStack>
          <Avatar boxSize={"48"} />
          <Button variant={"ghost"} colorScheme={"yellow"} onClick={onOpen}>
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
          <HStack>
            <Text children="Name:" fontWeight={"bold"} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children="Email:" fontWeight={"bold"} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="CreatedAt:" fontWeight={"bold"} />
            <Text children={user.createdAt.split("T")[0]} />
          </HStack>
          {user.role !== "admin" && (
            <HStack>
              <Text children="Subscription:" fontWeight={"bold"} />
              {user.subscription && user.subscription.status === "active" ? (
                <Button color={"yellow.500"} variant="unstyled">
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={"yellow"}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={["column", "row"]} alignItems={"center"}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>

            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading children="Playlist" size={"md"} my="8" />
      {user.playlist.length > 0 && (
        <Stack
          direction={["column", "row"]}
          alignItems={"center"}
          flexWrap="wrap"
          p="4"
        >
          {user.playlist.map((element) => (
            <VStack w="48" m="2" key={element.course}>
              <Image
                boxSize={"full"}
                objectFit="contain"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXVR5Yk775-DXTDk-8hsJhyx1G0p5_gpyK_ldRnwc8q49jraaSspfGRXK4pEi3Tw8cgyk&usqp=CAU"
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={"ghost"} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>

                <Button
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <BasicUsage
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        channgeImageSubmitHandler={channgeImageSubmitHandler}
      />
    </Container>
  );
};

export default Profile;
function BasicUsage({ isOpen, onClose, channgeImageSubmitHandler }) {
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => channgeImageSubmitHandler(e, image)}>
            <VStack spacing={4}>
              <Avatar boxSize={"48"} src={imagePrev} />
              <Input
                type="file"
                css={{ "&::file-selector-button": fileExportCss }}
                onChange={changeImage}
              />
              <Button w={"full"} colorScheme={"yellow"} type="submit">
                Change
              </Button>
            </VStack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
