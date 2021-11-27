const request = require('postman-request');

const geocode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiZGFrc2gyOCIsImEiOiJja3ZyeGNhOWEwNmZ0Mm5vMng5M2N0aXI4In0.AI8rDQYT8qCzAqiZlWw38w&limit=1"
    request({url, json:true},(error, {body})=>{
        if(error){
            callback("Unable to connect to the location services!",undefined)
        }else if(body.features=== undefined){
            callback("Unable to find location, try another search",undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode