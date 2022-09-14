import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Context } from "./Context"
import Youtube from "react-youtube";
const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovies] = useState();
  const [genres, setGenres] = useState();
  const [companies, setCompanies] = useState();
  const [countries, setCountries] = useState();
  const [trailer, setTrailer] = useState();

  const {API_key,base_url,img_path} = useContext(Context);

  let url = base_url + `/movie/`+ `${id}?` + API_key;

  let trailerUrl = base_url + `/movie/` + `${id}?` + API_key + '&append_to_response=videos';

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setGenres(data.genres);
        setCompanies(data.production_companies);
        setCountries(data.production_countries);
      });
  }, [id]);

  useEffect(() => {
    fetch(trailerUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("trailer", data);
        setTrailer(data.videos);
      });
  }, [id]);

  const renderTrailer = () => {
    const youtubeTrailer = trailer?.results.find(
      (vid) =>
        vid.name.includes("Official Trailer") ||
        vid.name.includes("Trailer") ||
        vid.name.includes("Official")
    );
    const key = youtubeTrailer ? youtubeTrailer.key : trailer?.results[0]?.key;
    if (!key) {
      return null;
    }
    return (
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
      <P>
        <Trailer>{trailer ? renderTrailer() : null}</Trailer>
      </P>
      <button>Add To profile</button>
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
    </>
  );
};
const Poster = styled.img`
  width: 300px;
  height: 400px;
`;
const Title = styled.h4`
  font-size: 20px;
`;

const Trailer = styled.div``;
const P = styled.div`
  display: flex;
  justify-content: center;
`;

export default MoviePage;
