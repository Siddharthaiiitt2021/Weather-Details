const express = require('express')
const bodyPareser = require('body-parser')
const bodyParser = require('body-parser')
require('dotenv').config();

const appid = process.env.API_KEY
console.log(appid)

app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('html', require('ejs').renderFile);


app.get('/',(req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.post('/', async (req,res)=>{
    var lat;
    var lon;
    if(typeof req.body.lat === 'undefined' || typeof req.body.lon === 'undefined')
    {
        var city = await fetch('https://api.openweathermap.org/geo/1.0/direct?q='+req.body.city+'&appid='+appid)
        console.log(city)
        city = await city.json()
        console.log(city)
        if(city.cod > 399 || city.length === 0)
        {
            res.render(__dirname+'/failure.html', {issue:'city'})
        }
        else
        {
            lat = city[0].lat
            lon = city[0].lon
        }
    }
    else{
        lat = req.body.lat
        lon = req.body.lon
    }
    console.log(lat, lon)
    const string = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+appid+'&units=metric'
    var weather = await fetch(string)
    weather = await weather.json()
    console.log(weather)
    if(weather.cod>399)
    {
        res.render(__dirname+'/failure.html', {issue:'coordiates'})
    }    
    else{
        var icon = weather.weather[0].icon
        var icon = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
        const description = weather.weather[0].description
        const temp = weather.main.temp
        const feels_like = weather.main.feels_like
        const humidity = weather.main.humidity 
        const city_name = weather.name
        console.log(description)
        console.log(temp)
        console.log(feels_like)
        console.log(humidity)
        res.render(__dirname+'/weather.html', {description:description,icon:icon,temp:temp,feels_like:feels_like,humidity:humidity, city:city_name})
    }
})

app.listen(process.env.PORT||3000, async () => {
    console.log("Server is running at port 3000")
})