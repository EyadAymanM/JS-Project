const { log } = require("console");
//import express to create our api
const express = require("express");
//import file system to read/wrire our data from/to json file
const fs = require("fs");
//we create an instance for our api
const app = express();
//read the data from json file
let fileData = fs.readFileSync("./website/data.json");
usersData = JSON.parse(fileData);
//we specify our directory for the front end files
app.use(express.static("website"));
//import body-parser to parse our request body
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//we set the port and initialize our server
const port = 8080;
const server = app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
//setting the route for get request
app.get("/get-users-data", (req, res) => {
  res.send(usersData);
});
//setting the route for post request
//and pushing the new data to json file
app.post("/post-users-data", (req, res) => {
  const data = req.body;
  // console.log(data);
  const addedUser = { email: data["email"], password: data["password"] };
  usersData.push(addedUser);
  const newFileData = JSON.stringify(usersData);
  fs.writeFile("./website/data.json", newFileData, (err) => {
    if (err) throw err;
  });
  res.send();
});
