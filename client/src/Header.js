import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import pic from "../src/assets/logo.png";
import Login from "./Login";
import LogOut from "./LogOut";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <>
      <Nav>
        <NavLink to="/">
          <Logo src={pic} />
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/profile">
            <Greeting>{user.name}</Greeting>
          </NavLink>
        )}
        {isAuthenticated ? <LogOut /> : <Login />}
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Greeting = styled.h1``;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 20px;
  text-decoration: none;
  color: black;
  cursor: pointer;

  &:hover {
    color: white;
    transition: 0.5s;
  }
  &.active {
    color: red;
  }
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  &:hover {
    opacity: 0.75;
  }
`;

export default Header;
