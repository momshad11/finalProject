const express = require("express");

const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

const checkJwt = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://dev-lvv55a4h.us.auth0.com",
});

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.status(200).json({ message: "Public" });
});
app.get("/fetch-message", checkJwt, function (req, res) {
  res.status(200).json({ message: "Authenticated" });
  //res.status(401).json({message:'Not Authenticated'})
});

app.listen(8000);
