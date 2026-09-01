require("dotenv").config();
// console.log(process.env.apiKey);
const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname , "public")));   //setting path for static files like CSS
app.use(express.urlencoded({ extended: true }));

app.set("view engine" , "ejs");



const port = 8080;

app.listen(port , () => {
    console.log("Server is Listening");
});

app.get("/" , (req , res) => {
    res.render("index.ejs")
});

app.get("/weather" , (req , res) => {
    res.render("weather.ejs");
});

app.post("/weather" , async (req , res) => {
    const {city} = req.body;
    const weatherApiKey = process.env.apiKey;
    let url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}`
   
    try{
        let response = await axios.get(url);
        const { location, current } = response.data;
        res.render("result.ejs", { location, current });
    }
    catch(err){
        res.render("error.ejs");
    }
});