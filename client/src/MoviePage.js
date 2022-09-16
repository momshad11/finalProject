import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./Context";
import Reviews from "./Reviews";
import Youtube from "react-youtube";
const MoviePage = () => {
  const { id } = useParams();

  //Usestates For movie page
  const [movie, setMovies] = useState();
  const [genres, setGenres] = useState();
  const [companies, setCompanies] = useState();
  const [countries, setCountries] = useState();
  const [trailer, setTrailer] = useState();
  const [reviews, setReviews] = useState();

  //Retrieving api infos from context
  const { API_key, base_url, img_path } = useContext(Context);

  //url to find movie user clicked on
  let url = base_url + `/movie/` + `${id}?` + API_key;

  //movie trailer url
  let trailerUrl =
    base_url + `/movie/` + `${id}?` + API_key + "&append_to_response=videos";

  //movie reviews url
  let reviewsUrl =
    base_url +
    `/movie/` +
    `${id}` +
    `/reviews?` +
    API_key +
    "&language=en-US&page=1";

  //fetching reviews and setting it
  useEffect(() => {
    fetch(reviewsUrl)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //fetching user clicke on movie and setting it
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setGenres(data.genres);
        setCompanies(data.production_companies);
        setCountries(data.production_countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //fetching trailer and setting it
  useEffect(() => {
    fetch(trailerUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("trailer", data);
        setTrailer(data.videos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  //function to render trailer on movie page with youtube npm package
  const renderTrailer = () => {
    //mapping through state and finding movie trailer
    const youtubeTrailer = trailer?.results.find(
      (vid) =>
        vid.name.includes("Official Trailer") ||
        vid.name.includes("Trailer") ||
        vid.name.includes("Official")
    );

    //if movie trailer cannot be found with above logic we take the first trailer available
    const key = youtubeTrailer ? youtubeTrailer.key : trailer?.results[0]?.key;

    //if no trailers for movie exists return null
    if (!key) {
      return null;
    }
    return (
      //Youtube trailer returned
      <Youtube
        videoId={key}
        opts={{
          playerVars: {
            autoplay: 1,
          },
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    );
  };

  return (
    <>
        {/* rendering trailer if trailer exists */}
        <Trailer>{trailer ? renderTrailer() : null}</Trailer>
      <button>Add To profile</button>
      {/* rendering rest of movie data */}
      <P>
        <Container>
      <Title>{movie?.title}</Title>
      <Poster src={img_path + movie?.poster_path} />
      <div>overview : {movie?.overview}</div>
      <div>runtime : {movie?.runtime}</div>
      <div>status : {movie?.status}</div>
      <div>
        Genres :{" "}
        {genres?.map((item) => {
          return item.name + " ";
        })}
      </div>
      <div>Release Date : {movie?.release_date}</div>
      <div>
        Companies :{" "}
        {companies?.map((item) => {
          return item.name + " ";
        })}
      </div>
      <div>
        Countries :{" "}
        {countries?.map((item) => {
          return item.name + " ";
        })}
      </div>
      <a href={movie?.homepage}>Watch Now</a>
      </Container>
     </P>
      <div>
        {/* mapping over reviews and passing it to reviews componenet */}
        <h1>Reviews :</h1>
        {reviews?.map((item, index) => {
          return <Reviews key={`${item}${index}`} review={item} />;
        })}
      </div>
    </>
  );
};
const Poster = styled.img`
  width: 600px;
  height: 800px;
`;
const Title = styled.h4`
  font-size: 20px;
`;

const Trailer = styled.div`

`;
const Container = styled.div`
    
`;
const P = styled.div`
`;

export default MoviePage;
