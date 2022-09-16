const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

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

app.listen(8000, () =>{
  console.info('Listening on port 8000')
});
