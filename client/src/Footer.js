import React from 'react'
import styled from "styled-components";
import { BsGithub,BsLinkedin } from "react-icons/bs";

const Footer = () => {
    return (
      <Wrapper>
        
          <A href='https://www.linkedin.com/in/momshad-hussain-68b557145/'><BsLinkedin/></A>
          <A href='https://github.com/momshad11'><BsGithub/></A>
      </Wrapper>
    );
  };

const A = styled.a`
  font-size: 30px;
  padding: 25px;
color: white;
&:hover{
  color: black;
}
`;

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
height: 100px;
border-top: 1px solid black;
width: 100%;
color: white;
margin-top: 25px;
`;


export default Footer