const path = require("path")
const express = require("express")
const hbs = require("hbs")
const app = express()
const port = process.env.PORT || 3000
const forecast = require("../src/utils/forecast")
const geocode = require("../src/utils/geocode")
console.log(__dirname)

//  Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,"../templates/partials")


// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("/",(req,res)=>{
    res.render("index",{
        title:"Home",
        name:"Daksh"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        help:"Landed on a help page"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"about",
        name:"Daksh"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide an address"
        })
    }
    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude,(error, forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location:location,
                forecast:forecastData,
                address:req.query.address
            })
        })
    })
    
})

app.get("/help/*",(req,res)=>{
    res.render("404page",{
        title:"help",
        error:"Help page not found"
    })
})

app.get('*',(req,res)=>{
    res.render("404page",{
        title:"404 page",
        error:"Page not found"
    })
})

app.listen(port,()=>{
    console.log("Server started on port" + port)
})