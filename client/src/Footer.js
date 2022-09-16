import React from 'react'
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import Login from "./Login";
import LogOut from "./LogOut";
import { useAuth0 } from "@auth0/auth0-react";


const Footer = () => {

  const { isAuthenticated } = useAuth0();


    //email github linkdin ect 
    //contact info 
    //api used 
    //languages used 
    //description 

    return (
      <Wrapper>
        <Contact>
        </Contact>
        {isAuthenticated ? <LogOut /> : <Login />}
      </Wrapper>
    );
  };
  
  const Contact = styled.div`
    
    
`;

const Wrapper = styled.div`
height: 300px;
border-top: 1px solid black;
width: 100%;
margin-top: 25px;
`;


export default Footer