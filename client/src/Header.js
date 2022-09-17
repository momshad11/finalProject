import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import pic from "../src/assets/logo3.png";
import Login from "./Login";
import LogOut from "./LogOut";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
const Header = () => {
  const { isAuthenticated, user } = useAuth0();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const searchMovies = async (e) => {
    e.preventDefault();
    if (input) {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=8f6a064c0008f46387d46465ed87d543&query=${input}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        navigate("/search", {
          state: {
            movie_search: data,
          },
        });
      } catch {
        console.log("error ", e);
      }
    }
  };

  return (
    <>
      <Nav>
        <NavLink to="/">
          <Logo src={pic} />
        </NavLink>
        <NavLink to="/">
          <h1>Popular Movies</h1>
        </NavLink>
        <NavLink to="/upcoming-movies">
          <h1>Upcoming Movies</h1>
        </NavLink>
        <NavLink to="/toprated-movies">
          <h1>Top rated Movies</h1>
        </NavLink>
        {isAuthenticated && (
          <NavLink to="/profile">
            <Greeting><CgProfile/></Greeting>
          </NavLink>
        )} 
         <form onSubmit={searchMovies}>
          <Input type="text" placeholder="Search..." onChange={(e) => setInput(e.target.value)} />
          <Button type={"submit"}><BsSearch/></Button>
        </form>
        {isAuthenticated ? <LogOut /> : <Login />}
      </Nav>
    </>
  );
};

const Input = styled.input`
border-bottom-color: white;
color: white;
border-radius: 20px;
padding: 10px;
outline: none;
background-color: rgb(23, 34, 67);
font-size: large;
`
const Button = styled.button`
border: none;
color: white;
background-color: rgb(23, 34, 67);
font-size:  20px;
&:hover{
    cursor: pointer;
    transform: scale(1.1);
}
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Greeting = styled.h3`
color: white;
font-size: 30px;
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 20px;
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transition: 0.5s;
    color: black;
  }
  &.active {
    color: black;
  }
`;

const Logo = styled.img`
  height: 150px;
  width: 150px;
  &:hover {
    opacity: 0.75;
  }
`;

export default Header;
