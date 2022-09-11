import { useState, useEffect } from "react";
import Movies from "./Movies";
import Header from "./Header";
import styled from "styled-components";


const Home = () => {
  let API_key = "&api_key=8f6a064c0008f46387d46465ed87d543";
  let base_url = "https://api.themoviedb.org/3";
  let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      });
  }, []);
  console.log("hi", movies);
  return (
    <>
      <Header />
      <Wrapper>
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
`
export default Home;

