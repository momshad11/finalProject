import { useState, useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const Context = createContext(null);
export const Provider = ({ children }) => {

  //api key and url for fetching data from TMDB api
  let API_key = "api_key=8f6a064c0008f46387d46465ed87d543";
  let base_url = "https://api.themoviedb.org/3";
  let img_path = "https://image.tmdb.org/t/p/w500";
  let upcomingUrl =
    base_url + `/movie/upcoming?` + API_key + `&language=en-US&page=1`;
  let popularUrl =
    base_url + "/movie/popular?" + API_key + "&language=en-US&page=1";
  let topRatedUrl =
    base_url + "/movie/top_rated?" + API_key + "&language=en-US&page=1";

  //Use State to set movies 
  const [popularMovies, setPopularMovies] = useState();
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [topRatedMovies, setTopRatedMovies] = useState();

  //Fetching from api and setting to according usestate

  //popular movies
  useEffect(() => {
    fetch(popularUrl)
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //upcoming Movies
  useEffect(() => {
    fetch(upcomingUrl)
      .then((res) => res.json())
      .then((data) => {
        setUpcomingMovies(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //top Rated Movies
  useEffect(() => {
    fetch(topRatedUrl)
      .then((res) => res.json())
      .then((data) => {
        setTopRatedMovies(data.results);

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //sinking backend to front end
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getProtectedMessage = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        fetch("/fetch-message", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    getProtectedMessage();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <Context.Provider
      value={{
        popularMovies,
        setPopularMovies,
        API_key,
        base_url,
        img_path,
        upcomingMovies,
        setUpcomingMovies,
        topRatedMovies,
        setTopRatedMovies,
      }}
    >
      {children}
    </Context.Provider>
  );
};
