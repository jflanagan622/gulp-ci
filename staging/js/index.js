var express=require("express"),bodyParser=require("body-parser"),app=express();app.use(bodyParser.json()),app.use(bodyParser.urlencoded({extended:!0})),app.get("/",function(e,s){s.send("signup")}),app.listen(3e3,function(){}),app.use(express.static("views")),app.post("/signup",function(e,s){s.send("Signed Up!")});