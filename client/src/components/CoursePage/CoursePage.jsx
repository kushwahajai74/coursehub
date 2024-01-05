import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import introVideo from "../../assets/videos/intro.mp4";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseLectures } from "../../features/coursesSlice";
import Loader from "../Layouts/Loader";

const CoursePage = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [lecNumber, setLecNumber] = useState(0);

  // const lectures = [
  //   {
  //     _id: 1,
  //     title: "Sample one",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, quidem.",
  //     video: {
  //       url: "sample",
  //     },
  //   },
  //   {
  //     _id: 2,
  //     title: "Sample two",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, quidem.",
  //     video: {
  //       url: "sample",
  //     },
  //   },
  //   {
  //     _id: 3,
  //     title: "Sample three",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, quidem.",
  //     video: {
  //       url: "sample",
  //     },
  //   },
  // ];
  const { isLoading, lectures } = useSelector((state) => state.courses);

  useEffect(() => {
    if (
      user.role !== "admin" &&
      user.subscription !== undefined &&
      user.subscription.status !== "active"
    )
      navigate("/subscribe");

    dispatch(getCourseLectures(params.id));
  }, [params.id, dispatch]);

  return isLoading ? (
    <Loader />
  ) : lectures.length > 0 ? (
    <Grid minH={"90vh"} templateColumns={["1fr", "3fr 1fr"]}>
      <Box>
        <video
          width="95%"
          controls
          controlsList="nodownload"
          disablePictureInPicture
          disableRemotePlayback
          autoPlay
        >
          <source src={lectures[lecNumber]?.video?.url} type="video/mp4" />
        </video>

        <Heading
          m={4}
          children={`#${lecNumber + 1} ${lectures[lecNumber]?.title}`}
        />
        <Heading m={4} children="Description" />
        <Text m={4} children={lectures[lecNumber]?.description} />
      </Box>
      <VStack>
        {lectures.length > 0 &&
          lectures.map((lec, index) => (
            <button
              key={lec._id}
              variant={"ghost"}
              style={{
                padding: "1rem",
                width: "100%",
                textAlign: "center",
                margin: "0",
                borderBottom: "1px solid rgba(0,0,0,0.2)",
              }}
              onClick={() => setLecNumber(index)}
            >
              <Text noOfLines={1}>
                #{index + 1} {lec.title}
              </Text>
            </button>
          ))}
      </VStack>
    </Grid>
  ) : (
    <Box
      height={"90vh"}
      w={"100vw"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading children="Lectures will Arrive soon" />
    </Box>
  );
};

export default CoursePage;
