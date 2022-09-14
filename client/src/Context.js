import { useState, useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
export const Context = createContext(null);
export const Provider = ({ children }) => {
  //api key and url for fetching data
  let API_key = "&api_key=8f6a064c0008f46387d46465ed87d543";
  let base_url = "https://api.themoviedb.org/3";
  let url = base_url + "/discover/movie?sort_by=popularity.desc" + API_key;
  let img_path = "https://image.tmdb.org/t/p/w500";
  //Use State to set movies to
  const [movies, setMovies] = useState();

  //Fetching from api and setting to usestate
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);
  //similar movies
  // useEffect(() => {
  //   fetch(
  //     'https://api.themoviedb.org/3/movie/1010819/similar?api_key=8f6a064c0008f46387d46465ed87d543&language=en-US&page=1'
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('similar',data);
  //     });
  // }, []);

  //sinking backend to front end
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getProtectedMessage = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        console.log("access token ", accessToken);
        fetch("/fetch-message", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }
    };
    getProtectedMessage();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <Context.Provider
      value={{
        movies,
        setMovies,
        API_key,
        base_url,
        img_path,
      }}
    >
      {children}
    </Context.Provider>
  );
};
