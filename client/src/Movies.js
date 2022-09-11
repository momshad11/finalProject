import React from 'react'
import styled from "styled-components";


const Movies = ({movies}) => {
    let img_path = "https://image.tmdb.org/t/p/w500"
  return (
      <Div>
    <Title>{movies.title}</Title>
    <Rating>
     {movies.vote_average}
    </Rating>
    <Poster src={img_path+movies.poster_path}/>
    </Div>
  )
}

const Div = styled.div`
  text-align: center;
`
const Title = styled.h4`
font-size: 20px;
`
const Rating = styled.div`
display: flex;
flex-direction: column;
`
const Poster = styled.img`
width: 300px;
height: 400px;
`
export default Movies