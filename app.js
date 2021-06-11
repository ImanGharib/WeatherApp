const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));//parsing the body of post

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const cityName = req.body.cityName;

    const apikey = "081e6ff895251b8fea869bb4100a7598&units";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apikey + "=" + unit;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p> The temp in " + cityName + " is " + temp + "</p>");
            res.write("<h2>It has " + description + "</h2>");
            res.write("<img src=" + imgUrl + ">");

            res.send()
        })
    })
})

app.listen(3000, function () {
    console.log("started")
})


