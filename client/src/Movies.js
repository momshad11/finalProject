import styled from "styled-components";
import { Link } from "react-router-dom";
import { Context } from "./Context";
import { useContext } from "react";

const Movies = ({ movies }) => {
  const { img_path } = useContext(Context);
  return (
    <Div>
      <Title>{movies.title}</Title>
      <Rating>{movies.vote_average}</Rating>
      <StyleLink key={movies.id} to={`/movies/${movies.id}`}>
        <Poster src={img_path + movies.poster_path} />
      </StyleLink>
    </Div>
  );
};

const Div = styled.div`
  text-align: center;
`;
const Title = styled.h4`
  font-size: 20px;
`;
const Rating = styled.div`
  display: flex;
  flex-direction: column;
`;
const Poster = styled.img`
  width: 300px;
  height: 400px;
`;
const StyleLink = styled(Link)``;
export default Movies;
