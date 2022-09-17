const express = require("express");
const morgan = require("morgan");


const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

const { getUsers, getUser, getWatchList } = require("./handlers");

app
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"));

const checkJwt = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://dev-lvv55a4h.us.auth0.com",
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Public" });
});
app.get("/fetch-message", checkJwt, function (req, res) {
  res.status(200).json({ message: "Authenticated" });
});


//getting all users
app.get("/users", getUsers);

// Getting user by emal 
app.get('/user/:email', getUser);

//posting movie to user account

app.put('/watchlist', getWatchList);

app.listen(8000, () => {
  console.info("Listening on port 8000");
});
