import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import pic from '../src/assets/logo.png'


const Header = () => {
  return (
    <>
    <Nav>
    <NavLink to='/'><Logo src={pic} /></NavLink>
    </Nav>
    </>
  );
};

export default Header;
const Nav = styled.nav`
    margin: 0;
    padding: 0;
    display: flex;
    background-color: lightgray;
    justify-content: space-between;
    z-index: 10;
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 20px;
    text-decoration: none;
    color: black;
    cursor: pointer;

    &:hover{
        color: white;
        transition: 0.5s;
    }

    &.active{
        color: white;
    }
`;

const Logo = styled.img`
    height: 200px;
    width: 200px;

    &:hover {
        opacity: 0.75;
    }
`;
