import { useState,useEffect,useContext } from "react";
import { Context } from "./Context";
import { Link } from "react-router-dom";
import styled from "styled-components";
const ProfileMovie = ({movie}) => {
    const [profileMovie, setMovies] = useState();
    const { API_key, base_url, img_path } = useContext(Context);
  let url = base_url + `/movie/` + `${movie}?` + API_key;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMovies(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movie]);

  const remove = (e) =>{
    e.preventDefault()
    localStorage.removeItem(profileMovie.id);
    window.location.reload();
  }

return (
    <Div>
      <Container>
      {/* rendering movie data to homepage  */}
      <StyleLink key={profileMovie?.id} to={`/movies/${profileMovie?.id}`}>
        <Poster src={img_path + profileMovie?.poster_path} />
      </StyleLink>
      <Info>
      <Title>{profileMovie?.title}</Title>
      {profileMovie?.vote_average !== 0 &&
      profileMovie?.vote_average > 7.5 &&
      <Rating style={{color:'green'}}>{profileMovie?.vote_average}</Rating>
      }
      {profileMovie?.vote_average !== 0 &&
      profileMovie?.vote_average > 6.0 &&  profileMovie?.vote_average < 7.5 &&
      <Rating style={{color:'yellow'}}>{profileMovie?.vote_average}</Rating>
      }
        {profileMovie?.vote_average !== 0 &&
      profileMovie?.vote_average < 6.0 &&  
      <Rating style={{color:'red'}}>{profileMovie?.vote_average}</Rating>
      }
      </Info>
      <Button onClick={(e) => remove(e)}>remove</Button>
      </Container>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  flex-direction: row;
`;
const Info = styled.div`
padding: 5px;
display:flex;
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
  &:hover{
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
  }`;

export default ProfileMovie;