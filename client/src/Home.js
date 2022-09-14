import Movies from "./Movies";
import styled from "styled-components";
import { useContext } from "react";
import { Context } from "./Context";

const Home = () => {
  const { movies } = useContext(Context);
  console.log(movies);
  return (
    <>
      <Wrapper>
        {/* mapping over movies and passing it to movie component */}
        {movies?.map((item, index) => {
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
export default Home;
