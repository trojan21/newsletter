//jshint esversion: 6

const express = require("express")
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https")
// const path = require("path");
// const __dirName = path.resolve(path.dirname(""))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    const f = req.body.fName;
    const s = req.body.sName;
    const em = req.body.email;
    const data = {
        members:[{
            email_address: em,
            status: "subscribed",
            merge_fields:{
                FNAME: f,
                LNAME: s
            }
        }]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us21.api.mailchimp.com/3.0/lists/9f0b064811"
    const options={
        method: "POST",
        auth:"prakhar:82faa75ccef09fef9c564f883fad656c-us21"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname+"/success.html")
            
        }
        else
        res.sendFile(__dirname+"/failure.html")
        
    })
    request.write(jsonData);
    request.end();
})
app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(3000,function(){
    console.log("Server is runnning on port 3000")
})
//api key 82faa75ccef09fef9c564f883fad656c-us21
//list id 9f0b064811

