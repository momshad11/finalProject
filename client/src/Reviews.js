import React from 'react'

const Reviews = ({review}) => {
    console.log('review',review)
  return (
    <>
 
    <div>{review?.author}</div>
    
    </>
  )
}

export default Reviews