const request =require('request')

const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=d9a48d342f9e5eb8c46c264e73e0a0c0&query="+latitude+","+longitude
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Unable to connect to Location Services..!",undefined)
        }
        else if(body.success==='false'){
            callback("Unable to find location ,Try another search..!",undefined)
        }
        else{
            callback(undefined,"It is "+body.current.weather_descriptions+" out there.It is "+body.current.temperature+" degree currently and it feels like "+body.current.feelslike+" degree.")
        }

    }) 

}

module.exports =forecast