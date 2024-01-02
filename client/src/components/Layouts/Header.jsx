import { useDispatch } from "react-redux";
import React from "react";
import { ColorModeSwitcher } from "../../colourModeSwitcher";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { logout } from "../../features/userSlice";
import { FaBookReader } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi2";
import { TbBooks } from "react-icons/tb";
import { BiBookAdd } from "react-icons/bi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";

const LinkButton = ({ url, title, onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={"ghost"}>{title}</Button>
  </Link>
);
const Header = ({ isAuthenticated = false, user }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ColorModeSwitcher />
      <Button
        colorScheme="yellow"
        width={"12"}
        height={"12"}
        rounded={"full"}
        position={"fixed"}
        onClick={onOpen}
        top={4}
        left={4}
        zIndex={"overlay"}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth={1}>
            <HStack>
              <Heading size={"lg"}>Coursehub</Heading>
              <FaBookReader size={30} />
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} alignItems={"flex-start"}>
              <HStack>
                <HiOutlineHome size={30} />
                <LinkButton onClose={onClose} url="/" title="Home" />
              </HStack>
              <HStack>
                <TbBooks size={30} />
                <LinkButton
                  onClose={onClose}
                  url="/courses"
                  title="Browse All Courses"
                />
              </HStack>
              <HStack>
                <BiBookAdd size={30} />
                <LinkButton
                  onClose={onClose}
                  url="/request"
                  title="Request a Course"
                />
              </HStack>

              <HStack>
                <HiOutlineChatBubbleOvalLeftEllipsis size={30} />
                <LinkButton
                  onClose={onClose}
                  url="/contact"
                  title="Contact Us"
                />
              </HStack>
              <HStack>
                <HiMiniBars3BottomLeft size={30} />
                <LinkButton onClose={onClose} url="/about" title="About" />
              </HStack>
            </VStack>
            <HStack
              justifyContent={"space-evenly"}
              position="absolute"
              bottom={"2rem"}
              width="80%"
            >
              {isAuthenticated ? (
                <>
                  <VStack>
                    <HStack>
                      <Link onClick={onClose} to="/profile">
                        <Button variant={"ghost"} colorScheme={"yellow"}>
                          Profile
                        </Button>
                      </Link>
                      <Button variant={"ghost"} onClick={logoutHandler}>
                        <RiLogoutBoxLine />
                        Logout
                      </Button>
                    </HStack>

                    {user && user.role === "admin" && (
                      <Link onClick={onClose} to="/admin/dashboard">
                        <Button colorScheme={"purple"} variant="ghost">
                          <RiDashboardFill style={{ margin: "4px" }} />
                          Dashboard
                        </Button>
                      </Link>
                    )}
                  </VStack>
                </>
              ) : (
                <>
                  <Link to={"/login"}>
                    <Button colorScheme="yellow" onClick={onClose}>
                      Login
                    </Button>
                  </Link>
                  <p>OR</p>
                  <Link to={"/register"}>
                    <Button colorScheme="yellow" onClick={onClose}>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
