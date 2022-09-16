import Movies from "./Movies";
import styled from "styled-components";
import { useContext } from "react";
import { Context } from "./Context";

const TopRated = () => {
  const { topRatedMovies } = useContext(Context);
  return (
    <>
      <Wrapper>
        {/* mapping over movies and passing it to movie component */}
        {topRatedMovies?.map((item, index) => {
          return <Movies key={`${item}${index}`} movies={item} />;
        })}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;
export default TopRated;