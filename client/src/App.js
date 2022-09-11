import { BrowserRouter, Routes, Route} from "react-router-dom";
import  Home  from './Home';
import styled from "styled-components";


function App() {
  return(
    <Wrapper>
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
    </Wrapper>
  )

}
const Wrapper = styled.div`
`

export default App;
