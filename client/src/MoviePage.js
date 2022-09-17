import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./Context";
import Reviews from "./Reviews";
import { useAuth0 } from "@auth0/auth0-react";
import Youtube from "react-youtube";
import Login from "./Login";
import moment from 'moment';
const MoviePage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth0();
  //Usestates For movie page
  const [userDB, setUser] = useState();
  const [isAdded, setIsAdded] = useState(false);
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
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/user/${user.email}`);
      const result = await res.json();
      setUser(result.data);
      result.data.watchlist
        ? setIsAdded(
            result.data.watchlist.filter((i) => i.id === movie.id).length > 0
          )
        : setIsAdded(false);
    };
    if (isAuthenticated) {
      getUser();
    }
  }, [movie, isAuthenticated]);

  const handleWatchList = async () => {
    const body = {
      email: userDB.email,
      data: {
        id: movie.id,
        title: movie.title,
        image: movie.poster_path,
        score: movie.vote_average,
      },
    };
    localStorage.setItem(movie.id, JSON.stringify(movie.id));
    setIsAdded((current) => !current);
    try {
      await fetch("/watchlist", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log("an error occured of type --- ", error);
    }
  };
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
      />
    );
  };

  return (
    <>
      <Container>
        <Block>
          <Poster src={img_path + movie?.poster_path} />
          <Span>
            <Div>
              <Title>{movie?.title}</Title>
              <Trailer>{trailer ? renderTrailer() : null}</Trailer>
              <Info>Overview : {movie?.overview}</Info>
              {movie?.runtime !== 0 && (
                <Info>Runtime : {movie?.runtime} min</Info>
              )}
              <Info>Status : {movie?.status}</Info>
              <Info>
                Genre(s) :{" "}
                {genres?.map((item) => {
                  return item.name + " ";
                })}
              </Info>
              <Info>Release Date : {moment(movie?.release_date).format('MMMM Do, Y')}</Info>
              <Info>
                Companie(s) :{" "}
                {companies?.map((item) => {
                  return item.name + " ";
                })}
              </Info>
              <Info>
                Countrie(s)  :{" "}
                {countries?.map((item) => {
                  return item.name + " ";
                })}
              </Info>
              <A href={movie?.homepage}>Watch Now</A>
              {!isAdded && isAuthenticated && (
                <Button onClick={handleWatchList}>Add To Watchlist</Button>
              )}
              {!isAuthenticated && (
                <Button>
                  <Login />
                </Button>
              )}
            </Div>
          </Span>
        </Block>
        <Info>
          {/* mapping over reviews and passing it to reviews componenet */}
          <InfoR>Reviews :</InfoR>
          {reviews?.map((item, index) => {
            return <Reviews key={`${item}${index}`} review={item} />;
          })}
          {!reviews && <Info> No Reviews available </Info>}
        </Info>
      </Container>
    </>
  );
};
const Poster = styled.img`
  width: 600px;
  height: 800px;
`;
const Title = styled.h3`
  margin-bottom: 20px;
  font-size: 30px;
  flex: 0 0 90%;
`;

const Trailer = styled.div``;
const A = styled.a`
  font-size: 20px;
  color: white;
  text-decoration: none;
  &:hover {
    color: black;
  }
`;

const Container = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
`;
const Block = styled.div`
  display: flex;
  margin-left: 20px;
`;
const Info = styled.h3`
  margin: 20px 0px;
`;
const InfoR = styled.h3`
  margin: 20px 0px;
  font-size: 40px;
  text-align: center;
`;
const Div = styled.div`
  margin-left: 20px;
`;
const Span = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  cursor: pointer;
  padding: 10px;
  border: none;
  font-size: 20px;
  color: white;
  background: inherit;
  &:hover {
    color: black;
  }
`;

export default MoviePage;
