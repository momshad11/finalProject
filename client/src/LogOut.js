import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LogOut = () => {
  const { logout } = useAuth0();

  return <Button onClick={() => logout()}>log out</Button>;
};

const Button = styled.button`
  border: none;
  padding: 15px;
  font-size: 30px;
	background-color: rgb(23, 34, 67);
  color: white;
  &:hover {
    cursor: pointer;
  }
`;
export default LogOut;
