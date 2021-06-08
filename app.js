//jshint esversion:6
//require npm modues
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const https=require("https");
const fetch=require("node-fetch");
const _ = require("lodash");
// const parseJson = express.json({ extended: true });

//express started
const app = express();
//EJS started
app.set('view engine', 'ejs');
// bdoy-parser started
app.use(bodyParser.urlencoded({extended: true}));

// start for public folder of ejs modual for css and image folder and views for html files
app.use(express.static("public"));
//mongoose database started for mongodb atlas conection
mongoose.connect('mongodb+srv://admin-Anubhav:test123@cluster0.ouoor.mongodb.net/datadb', {useNewUrlParser: true, useUnifiedTopology: true});



//database connected
const db = mongoose.connection;
// checking for connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("successfully connected");
});
// database Schema
const dataSchema = new mongoose.Schema({
  serial:Number,
  name: String,
  last: String,
  buy:Number,
  sell:Number,
  volume:Number,
  base_uniy:String,
  quote_unit:String
});
// initialise Schema
const Data = mongoose.model('Data', dataSchema);
var arr=[];
var arr2=[];

app.get("/",function(req,res){
  Data.find({serial:{$lt: 11}},function(err,found){
     if(err){
       console.log(err);
     }else{

      }
      console.log(found);
      res.render("home",{data:found,BTCdata:arr,INRdata:arr2});

  });

});
 var num=0;
// fetch('https://api.wazirx.com/api/v2/tickers')
//     .then(res => res.json())
//     .then(json =>
//        Object.entries(json).forEach((entry) => {
//          num=num+1;
//          const [key, value] = entry;
//          if(!(value.base_unit in arr)){
//            arr.push(_.upperCase(value.base_unit));
//          }
//          if(!(value.quote_unit in arr2)){
//            arr2.push(_.upperCase(value.quote_unit));
//          }
//          const data = new Data({
//            serial:num,
//            name: value.name,
//            last: value.last,
//            buy:value.buy,
//            sell:value.sell,
//            volume:value.volume,
//            base_uniy:value.base_unit,
//            quote_unit:value.quote_unit
//          });
//          data.save();
//
//        })
//      );




app.listen(3000, function(){
  console.log("server started at port 3000");
});
