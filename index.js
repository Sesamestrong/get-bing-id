const express=require("express");
const bodyParser=require("body-parser");
const moment=require("moment");

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/",async (req,res)=>{
    const {day,month,year} = req.body;
    const daysSinceThen=moment.duration(moment().startOf("day").diff(moment(`${year}-${month}-${day}`))).days();
    res.send(daysSinceThen);
});