import React from "react";
import styled from "styled-components";

const Reviews = ({ review }) => {
  return (
    <>
      <Line>
        <Content>{review?.author} wrote: </Content>
        <ContentR>{review?.content}</ContentR>
      </Line>
    </>
  );
};
const Line = styled.div`
  display: flex;
  flex-direction: column;
`;
const Content = styled.h3`
  margin: 10px 0px;
  font-size: 25px;
  text-align: center;
`;
const ContentR = styled.h3`
  font-style: italic;
  padding: 5px;
  text-align: center;
`;
export default Reviews;
