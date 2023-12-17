import React from "react";
import { ColorModeSwitcher } from "../../colourModeSwitcher";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const LinkButton = ({ url, title, onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={"ghost"}>{title}</Button>
  </Link>
);
const Header = () => {
  const isAuthenticated = true;
  const user = {
    role: "admin",
  };

  const logoutHandler = () => {
    return console.log("logout");
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
          <DrawerHeader borderBottomWidth={1}>COURSE BUNDLER</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} alignItems={"flex-start"}>
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />
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
