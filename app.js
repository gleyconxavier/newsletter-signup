// jshint esversion:6
const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/post", function(req, res) {
  res.redirect("/");
});

app.post("/", function(req, res) {

  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  let data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };

  let jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/", // mailchimp list
    method: "POST",
    headers: {
      "Authorization": "" //api key
    },
    body: jsonData
  };

  request(options, function(error, response, body) {

    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/sucess.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }

  });
});

app.listen(3000, function() {
  console.log("Server is running on 3000");
});
