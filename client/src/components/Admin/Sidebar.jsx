import { Button, VStack } from "@chakra-ui/react";
import React from "react";
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <VStack
      spacing={8}
      p={16}
      boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}
      alignItems={"left"}
    >
      <LinkButton
        url={"/admin/dashboard"}
        Icon={RiDashboardFill}
        text={"Dashboard"}
        active={location.pathname === "/admin/dashboard"}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        url={"/admin/createcourse"}
        text={"Add Course"}
        active={location.pathname === "/admin/createcourse"}
      />
      <LinkButton
        url={"/admin/courses"}
        text={"Courses"}
        Icon={RiEyeFill}
        active={location.pathname === "/admin/courses"}
      />
      <LinkButton
        url={"/admin/users"}
        text={"Users"}
        Icon={RiUser3Fill}
        active={location.pathname === "/admin/users"}
      />
    </VStack>
  );
};

export default Sidebar;

const LinkButton = ({ url, Icon, text, active }) => {
  return (
    <Link to={`${url}`}>
      <Button
        fontSize={"larger"}
        variant={"ghost"}
        colorScheme={active ? "purple" : ""}
      >
        <Icon style={{ margin: "4px" }} />
        {text}
      </Button>
    </Link>
  );
};
