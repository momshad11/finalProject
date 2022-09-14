import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from "styled-components";



const Login = () => {
    const {loginWithRedirect } = useAuth0();
  return (
    <Button onClick={()=> loginWithRedirect()}>
        Login
    </Button>
  )
}


const Button = styled.button`
border: none;
padding: 15px;
font-size:30px;
&:hover{
    cursor: pointer;
}
`
export default Login