const express=require("express");
const bodyParser=require("body-parser");
const moment=require("moment");
const request=require("request-promise");

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//TODO Really, the requesting and stuff should be done via json-scraper
app.post("/",async (req,res)=>{
    const {day,month,year,locale} = req.body;
    console.log(day,month,year);
    const daysSinceThen=Math.floor(moment.duration(moment().startOf("day").diff(moment(`${year}-${month}-${day}`,"YYYY-MM-DD"))).asDays());
    console.log(daysSinceThen);
    const doShift=daysSinceThen>0;
    const jsonForThatTime=await request({uri:`https://bing.com/HPImageArchive.aspx?format=js&idx=${doShift?daysSinceThen-1:daysSinceThen}&n=${doShift?2:1}&mkt=${locale}`,json:true});
    res.send(jsonForThatTime.images.pop().url);
});

const PORT=process.env.PORT || 3000;
app.listen(PORT,console.log("Listening on port",PORT));
