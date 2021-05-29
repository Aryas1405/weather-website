const path =require('path')
const express = require('express')
const hbs =require('hbs')
const app = express()
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//define path for express config
const publicPath = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebar engine and views location
hbs.registerPartials(partialsPath)
app.set('view engine','hbs')
app.set('views',viewsPath)

//setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        'title':'Weather',
        'name': 'Harsh Arya'
    })
})
app.get('/weather',(req,res)=>{
    if(req.query.address){
        geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
            if(error===undefined){
                forecast(latitude,longitude,(error,data)=>{
                    if(error)
                    return res.send({
                        'error':error
                    })
                    else{
                        return res.send({
                            'forecast':data,
                            'location':location,
                            'address':req.query.address
                        })
                    }
                })
            }
            else
            return res.send({
                'error':error
            })
        })
    }
    else
    res.send({
        'error':'Please provide a location to find the weather.'
    })
   
})
app.get('/about',(req,res)=>{
    res.render('about',{
        'title':"About",
        'name':'Harsh Arya'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        'title':'Help',
        'name':'Harsh Arya'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        'title':'404-Page Not Found',
        'describtion':'The Page you are tryng to access is not exist !!!',
        'name':'Harsh Arya'
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000 !!')
})