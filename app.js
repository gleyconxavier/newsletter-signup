// jshint esversion:6
const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  let firstName = req.body.fName;
  let lastName = req.body.lName;
  let email = req.body.email;

  let data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }
    ]
  };

  let jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/",
    method: "POST",
    headers: {
      "Authorization": ""
    },
    body: jsonData
  };

  request(options, function(error, response, body) {

    if (error) {
      console.log(error);
    } else {
      console.log(response.statusCode);
    }

  });
});

app.listen(3000, function() {
  console.log("Server is running on 3000");
});
