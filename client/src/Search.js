import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import Movies from "./Movies";
const Search = () => {
  const state = useLocation();
  return (
    <Wrapper>
      {state.state.movie_search.results.map((item, index) => {
        return <Movies key={`${item}${index}`} movies={item} />;
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;
export default Search;
