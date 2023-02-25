const express=require("express");
const app=express();
const port=3002;
const fs=require("fs");
app.get("/",(req,res)=>{
    res.send("<h1>Hello, Dheeraj Welcome to this World</h1>");
});

app.get("/list_movies",(req,res)=>{
    fs.readFile(__dirname+'/assets/movie.json','utf8',(err,data)=>{
        res.end(data);
    });
});

app.listen(port,()=>{
    console.log("Example app listening at http://localhost:3002");
});