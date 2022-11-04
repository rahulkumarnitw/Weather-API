const express= require("express");
const https= require("https");
const bodyParser = require("body-parser");
const app=express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{

      res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){

const query =req.body.cityname;
const apikey= "b0176384cb57d2ca2d05726627dfa1d3"
const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey +"&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);


    response.on("data",function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.weather[0].description ;
      const des = weatherdata.main.temp;
      const icon = weatherdata.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png" ;
      console.log(temp);
      res.write("<p> The weather is currently "+ temp + "</p>")
      res.write("<h1>The temperature in "+ query + " is "+ des + " degree celsiys </h1>");
      res.write("<img src=" + imageurl + ">");
      res.send();
    });



  });

});


app.listen(3000,function(){
  console.log("server started 3000");
});
