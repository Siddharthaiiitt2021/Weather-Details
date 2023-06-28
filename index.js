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
    const lat = req.body.lat
    const lon = req.body.lon
    const string = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+appid+'&units=metric'
    var weather = await fetch(string)
    weather = await weather.json()
    var icon = weather.weather[0].icon
    var icon = 'https://openweathermap.org/img/wn/'+icon+'@2x.png'
    const description = weather.weather[0].description
    const temp = weather.main.temp
    const feels_like = weather.main.feels_like
    const humidity = weather.main.humidity 
    console.log(description)
    console.log(temp)
    console.log(feels_like)
    console.log(humidity)
    res.render(__dirname+'/weather.html', {description:description,icon:icon,temp:temp,feels_like:feels_like,humidity:humidity})
})

app.listen(3000, async () => {
    console.log("Server is running at port 3000")
})