const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){

  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  var data = {
    members: [
      {
        email_address: userEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: userPassword
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/20242aa99d";
  const options = {
    method: "POST",
    auth: "nnamdi1:b0d970bcceb196bc8dafc77627339531-us14"
  }
  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));

      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/failure.html");
      } else
        res.sendFile(__dirname + "/failure.html");
    });
  });

  request.write(jsonData);
  request.end();
});


app.post("/failure", function(req, res){
  res.redirect("/");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});


// APIKey
// b0d970bcceb196bc8dafc77627339531-us14
