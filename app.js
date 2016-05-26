var express=require('express'),
	app=express(),
	bodyParser=require('body-parser'),
	request=require('request'),
	moment=require('moment');

app.use(bodyParser())

app.post('/',function(req,res){
 var APPID="f5f23a05ff5d8a89d845872adc352bd4";
   var type=req.body.weather;
  type=type[type.length-1]!=="forecast"?"weather":"forecast";
  
  var uri="http://api.openweathermap.org/data/2.5/"+type;
  uri+="?q="+req.body.location;
  uri+="&APPID="+APPID;
  uri+="&units=imperial";
  
  if(type==="weather"){
  request(uri,function(err,req,body){
  	console.log(body)
    var data=JSON.parse(body);
    var weather="In " +data.name+ " I see "+data.weather[0].description+ " ! ";
    weather+=" Temp: "+Math.floor(data.main.temp)+ "degrees(F)";
    weather+=" Humidity: "+data.main.humidity +"%";
    weather+=" Wind: "+Math.floor(data.wind.speed)+ " mph";
    weather+=" Cloud Cover :"+data.clouds.all+ " %";
    
    res.json({body:weather});
  });
}
});

app.get('/get',function(req,res){
  var cricapi=require("node-cricapi");
  console.log(require("node-cricapi"))
  cricapi.cricketMatches(function(data){
    res.send(data);
  })
})

app.get('/movie',function(req,res){
var showtimes=require("showtimes");
api = new showtimes(" Aarey Colony, Goregaon, Mumbai, India",{date:'May 26 2016'});
api.getTheaters(function (error, theaters) {
  if (error) {
    throw error
  }
  console.log(theaters.length);
  res.send(theaters);
});

})

app.listen(8085,function(){
	console.log('server run')
})


