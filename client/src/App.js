import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Home from "./Home";
import MoviePage from "./MoviePage";
import Header from "./Header";
import Profile from "./Profile";
import Footer from "./assets/Footer";

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/movies/:id" element={<MoviePage />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </Wrapper>
  );
}
const Wrapper = styled.div``;

export default App;
