const { json } = require("express");
const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")

})
//catch the data 
app.post("/", (req,res) => {
    const query = req.body.cityName;
    const apiKey = "47f3658b7cfe7affc73d3e82b405d1fb";
    const units = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    //get the data for the location
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            //conver to javascript
          const weatherData= JSON.parse(data)
          //gettting the temp from the json files from weather api
          const temp = weatherData.main.temp;
          //description
          const weatherDescription =weatherData.weather[0].description
          //icon that correspond with the weather
          const icon = weatherData.weather[0].icon;
          //adding the icon to the url
          const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          console.log(weatherDescription);
          res.write("<p>The weather is currently " + weatherDescription + "</p>");
          res.write("<h1>The temperature in " + query.toUpperCase() + " is " + temp + " degrees fahrenheit.</h1>");
          res.write("<img src= "+ imageURL + ">")
          res.send();
        })
    })

})





app.listen(3000, function() {
    console.log("server is running on port 3000")
})