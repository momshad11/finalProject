import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import ProfileMovie from "./ProfileMovie";
import styled from "styled-components";
import gif from '../src/assets/giphy.gif'
const Profile = () => {
  const { user } = useAuth0();
  const [movie, setMovies] = useState();

  useEffect(() => {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) { 
        values.push(localStorage.getItem(keys[i]));
    }
    setMovies(values);
  }, []);

  return (
    <>
      <Info>{user?.name}'s Watch List</Info>
      {movie?.length !=0 && 
      <Wrapper>
        
        {movie?.map((item, index) => {
          return <ProfileMovie key={`${item}${index}`} movie={item} />;
        })}
      </Wrapper>
      }
      {movie?.length === 0 && 
      <>
      <Info>Watch List Empty!!</Info>
      <Gif src={gif}/>
      </>
      }
    </>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;
const Gif = styled.img`
padding: 10px;
height: 500px;
margin-left: 600px;
`;
const Info = styled.h3`
  margin: 20px 0px;
  color: white;
  text-align: center;
`;
export default Profile;
