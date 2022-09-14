import React from 'react'
import styled from "styled-components";



const Footer = () => {

    //email github linkdin ect 
    //contact info 
    //api used 
    //languages used 
    //description 

    return (
      <Wrapper>
     <Nav> This is footer
     </Nav>
      </Wrapper>
    );
  };
  
  const Nav = styled.div`
    border: 1px solid red;
    height: 100%;
    text-align: center;
    font-size: xx-large;
`;

const Wrapper = styled.div`
height: 300px;
`;


export default Footer