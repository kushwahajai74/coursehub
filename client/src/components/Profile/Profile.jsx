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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileExportCss } from "../Auth/Register";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearMessage,
  updateProfilePicture,
} from "../../features/profileSlice";
import toast from "react-hot-toast";
import { deleteFromPlaylist, getMyProfile } from "../../features/userSlice";
import {
  cancelSubscription,
  clearError as subscriptionClearError,
  clearMessage as subscriptionClearMessage,
} from "../../features/paymentSlice";

const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, error, message } = useSelector((state) => state.profile);
  const {
    isLoading: subscriptionLoading,
    error: subscriptionError,
    message: subscriptionMessage,
  } = useSelector((state) => state.payment);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch(subscriptionClearError());
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage, { duration: 10000 });
      dispatch(subscriptionClearMessage());
    }
  }, [error, message, dispatch, subscriptionError, subscriptionMessage]);

  const removeFromPlaylistHandler = async (e, id) => {
    e.preventDefault();
    await dispatch(deleteFromPlaylist(id));
    dispatch(getMyProfile());
  };
  const subscriptionCancelHandler = async (e) => {
    e.preventDefault();
    await dispatch(cancelSubscription());
    dispatch(getMyProfile());
  };

  const channgeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    await dispatch(updateProfilePicture(formData));
    dispatch(getMyProfile());
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
          <Avatar boxSize={"48"} src={user.avatar.url} />
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
                <Button
                  color={"yellow.500"}
                  variant="unstyled"
                  isLoading={subscriptionLoading}
                  onClick={subscriptionCancelHandler}
                >
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
                src={element.poster}
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={"ghost"} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>

                <Button
                  onClick={(e) => removeFromPlaylistHandler(e, element.course)}
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
        isLoading={isLoading}
      />
    </Container>
  );
};

export default Profile;
function BasicUsage({ isOpen, onClose, channgeImageSubmitHandler, isLoading }) {
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
              <Button
                w={"full"}
                colorScheme={"yellow"}
                type="submit"
                isLoading={isLoading}
              >
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
