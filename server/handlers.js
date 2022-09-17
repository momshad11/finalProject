"use strict";
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = "db-name";


//Gets all users stored in database 
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db(dbName);
    const users = await db.collection("users").find().toArray();
    users
      ? res.status(200).json({
          status: 200,
          data: users,
          message: "User data retrieved successfully.",
        })
      : res
          .status(500)
          .json({ status: 500, message: "Error - something went wrong." });
  } catch (error) {
    console.log("Error :", error);
  }
  client.close();
};

//Gets  user stored in database by email 

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db(dbName);
    const email = req.params.email;
    const user = await db.collection("users").findOne({ email: email });
    user
      ? res.status(200).json({
          status: 200,
          data: user,
          message: "User data retrieved successfully.",
        })
      : res
          .status(404)
          .json({ status: 404, message: "Error - something went wrong." });
  } catch (error) {
    console.log("Error :", error);
  }
  client.close();
};


//Handler isnt working for some odd reason i keep getting body is undefined
const getWatchList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db(dbName);
    const email = req.body.email;
    const user = await db.collection("users").findOne({ email: email });
    const watchlist = [];

    if (!user.watchlist) {
      watchlist.push(req.body.data);
    } else {
        let exist = false;
        for (const movie of user.watchlist){
          console.log(movie);
          if(movie.id === req.body.data.id ){
            (exist = true);
          }
          else{
            watchlist.push(movie);
          }
        }
        if(!exist){
        watchlist.push(req.body.data);
        }
       
    }

    const update = await db
      .collection("users")
      .findOneAndUpdate({ email: email }, { $set: { watchlist: watchlist } });
    update
      ? res.status(200).json({
          status: 200,
          data: update,
          message: "User data updated successfully.",
        })
      : res
          .status(404)
          .json({ status: 500, message: "Error - something went wrong." });
  } catch (error) {
    console.log("Error :", error);
  }
  client.close();
};

module.exports = {
  getUsers,
  getUser,
  getWatchList,
};
