import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from './GlobalStyles';
import Home from "./Home";
import MoviePage from "./MoviePage";
import Header from "./Header";
import Profile from "./Profile";
import Footer from "./Footer";
import Search from "./Search";
import Upcoming from "./Upcoming";
import TopRated from "./TopRated";
function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
        <GlobalStyles />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/movies/:id" element={<MoviePage />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
          <Route exact path="/upcoming-movies" element={<Upcoming />}></Route>
          <Route exact path="/toprated-movies" element={<TopRated />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </Wrapper>
  );
}
const Wrapper = styled.div`
`;

export default App;
