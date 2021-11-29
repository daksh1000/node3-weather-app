const request = require('postman-request');

const forecast = (lat, long, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=2ad76c62161a2171e955ae528637223e&query="+lat+","+long+"&units=f"
    request({url, json:true},(error, {body})=>{
        if(error){
            callback("Unable to connect to the services",undefined)
        }else if(body.error){
            callback("Unable to find the location", undefined);
            
        }else{
            callback(undefined,"It is currently "+ body.current.temperature+" degrees but it feels like "+body.current.feelslike+" degrees and weather is "+ body.current.weather_descriptions[0]+"and the humidity is around "+body.current.humidity+".")
            // console.log(response.body.current.weather_descriptions[0])
            // console.log("It is currently "+ response.body.current.temperature+" degrees but it feels like "+response.body.current.feelslike+" degrees")
        }
    })
}

module.exports = forecast