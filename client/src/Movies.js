import styled from "styled-components";
import { Link } from "react-router-dom";
import { Context } from "./Context";
import { useContext } from "react";

const Movies = ({ movies }) => {
  //url for movie img
  const { img_path } = useContext(Context);
  return (
    <Div>
      <Container>
      {/* rendering movie data to homepage  */}
      <StyleLink key={movies.id} to={`/movies/${movies.id}`}>
        <Poster src={img_path + movies.poster_path} />
      </StyleLink>
      <Info>
      <Title>{movies.title}</Title>
      {movies.vote_average !== 0 &&
      movies.vote_average > 7.5 &&
      <Rating style={{color:'green'}}>{movies.vote_average.toFixed(1)}</Rating>
      }
      {movies.vote_average !== 0 &&
      movies.vote_average > 6.0 &&  movies.vote_average < 7.5 &&
      <Rating style={{color:'yellow'}}>{movies.vote_average.toFixed(1)}</Rating>
      }
        {movies.vote_average !== 0 &&
      movies.vote_average < 6.0 &&  
      <Rating style={{color:'red'}}>{movies.vote_average.toFixed(1)}</Rating>
      }
      </Info>
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
export default Movies;
