import {
  Box,
  Button,
  Grid,
  Heading,
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { fileExportCss } from "../../Auth/Register";

const CourseModal = ({
  isOpen,
  onClose,
  id,
  courseTitle,
  deleteLecturesHandler,
  addLectureHandler,
  lectures = [],
  isLoading,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const closeHandler = () => {
    setTitle("");
    setDescription("");
    setVideoPrev("");
    setVideo("");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeHandler} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{courseTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="16">
            <Grid templateColumns={["1fr", "3fr 1fr"]}>
              <Box px={["0", "16"]}>
                <Box my={5}>
                  <Heading children={courseTitle} />
                  <Heading children={`${id}`} size="sm" opacity={0.4} />
                </Box>
                <Heading children={"Lectures"} size="lg" />
                {lectures.length > 0 ? (
                  lectures?.map((item, index) => (
                    <VideoCard
                      title={item.title}
                      description={item.description}
                      num={index + 1}
                      lectureId={item._id}
                      courseId={id}
                      deleteLecturesHandler={deleteLecturesHandler}
                      isLoading={isLoading}
                    />
                  ))
                ) : (
                  <Text children="Lectures will arrive soon" />
                )}
              </Box>
              <Box>
                <form
                  onSubmit={(e) =>
                    addLectureHandler(e, id, title, description, video)
                  }
                >
                  <VStack spacing={"6"}>
                    <Heading children={"Add Lecture"} size="md" />
                    <Input
                      focusBorderColor="purple.300"
                      variant={"filled"}
                      type="text"
                      value={title}
                      placeholder="Title"
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <Input
                      variant={"filled"}
                      focusBorderColor="purple.300"
                      placeholder="Description"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <Input
                      variant={"filled"}
                      focusBorderColor="purple.300"
                      accept="video/*"
                      type="file"
                      css={{
                        "&::file-selector-button": {
                          ...fileExportCss,
                          color: "purple",
                        },
                      }}
                      onChange={changeVideoHandler}
                    />
                    {video && (
                      <video
                        src={videoPrev}
                        controls
                        controlsList="nodownload nofullscreen"
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                    )}
                    <Button
                      type="submit"
                      colorScheme="purple"
                      isLoading={isLoading}
                    >
                      Submit
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={closeHandler}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteLecturesHandler,
  isLoading,
}) {
  return (
    <Stack
      direction={["column", "row"]}
      my="8"
      borderRadius={8}
      boxShadow={"0 0 10px rgba(107,70,193,0.5)"}
      justifyContent={["flex-start", "space-between"]}
      p={["4", "8"]}
    >
      <Box>
        <Heading children={`#${num} ${title}`} size="sm" />
        <Text children={description} />
      </Box>
      <Button
        color={"purple.600"}
        onClick={() => deleteLecturesHandler(courseId, lectureId)}
        isLoading={isLoading}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
