import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./Context";
import styled from "styled-components";
import gif from "../src/assets/giphy.gif";
const Profile = () => {
  const { user } = useAuth0();
  const [userDB, setUser] = useState();
  const { img_path } = useContext(Context);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/user/${user.email}`);
      const result = await res.json();
      setUser(result.data);
    };
    getUser();
  }, []);

  const remove = async (e, movie) => {
    e.preventDefault();
    const newWatchlist = userDB.watchlist.filter(
      (elem) => elem.id !== movie.id
    );
    setUser({
      ...userDB,
      watchlist: newWatchlist,
    });

    const body = {
      email: userDB.email,
      data: {
        id: movie.id,
        title: movie.title,
        image: movie.poster_path,
        score: movie.vote_average,
      },
    };
    try {
      await fetch("/watchlist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log("an error occured of type --- ", error);
    }
  };
  return (
    <>
      <Info2>{user?.name}'s Watch List</Info2>
      {userDB?.watchlist.length != 0 && (
        <Wrapper>
          {userDB?.watchlist?.map((movie) => {
            return (
              <Div>
                <Container>
                  {/* rendering movie data to homepage  */}
                  <StyleLink key={movie?.id} to={`/movies/${movie?.id}`}>
                    <Poster src={img_path + movie?.image} />
                  </StyleLink>
                  <Info>
                    <Title>{movie?.title}</Title>
                    {movie?.score !== 0 && movie?.score > 7.5 && (
                      <Rating style={{ color: "green" }}>
                        {movie?.score.toFixed(1)}
                      </Rating>
                    )}
                    {movie?.score !== 0 &&
                      movie?.score > 6.0 &&
                      movie?.score < 7.5 && (
                        <Rating style={{ color: "yellow" }}>
                          {movie?.score.toFixed(1)}
                        </Rating>
                      )}
                    {movie?.score !== 0 && movie?.score < 6.0 && (
                      <Rating style={{ color: "red" }}>
                        {movie?.score.toFixed(1)}
                      </Rating>
                    )}
                  </Info>
                  <Button onClick={(e) => remove(e, movie)}>remove</Button>
                </Container>
              </Div>
            );
          })}
        </Wrapper>
      )}
      {userDB?.watchlist?.length === 0 && (
        <>
          <Info2>Watch List Empty!!</Info2>
          <Gif src={gif} />
        </>
      )}
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
const Info2 = styled.h3`
  margin: 20px 0px;
  color: white;
  text-align: center;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  flex-direction: row;
`;
const Info = styled.div`
  padding: 5px;
  display: flex;
  width: 300px;
  justify-content: space-between;
`;
const Container = styled.div`
  padding: 10px;
  text-align: center;
`;

const Title = styled.h4`
  font-size: 20px;
  padding: 5px;
`;
const Rating = styled.div`
  font-size: 20px;
  padding: 5px;
`;
const Poster = styled.img`
  width: 300px;
  height: 500px;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 15px 0px;
  }
`;
const StyleLink = styled(Link)``;
const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  font-size: 20px;
  color: white;
  background: inherit;
  &:hover {
    color: black;
  }
`;
export default Profile;
