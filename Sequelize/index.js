var express = require('express');
var app = express();


var path = require('path');
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

  
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/mojRepozitorij.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/test.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/z1.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/z2.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/zadaci.html"));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/vjezbe.html"));
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/unosVjezbi.html"));
});

function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }
function vratiOdg(brojVjezbi, zadaci) {
    let data = "";
    let pom = false;
    if (brojVjezbi<1 || brojVjezbi>15 || !isInt(brojVjezbi)){
       pom = true;
      data ="Pogrešan parametar brojVjezbi"
        
        for (let i=0;i<zadaci.length;i++){
            if (zadaci[i]<0 || zadaci[i]>10 || !isInt(zadaci[i])) {
                
                data+=",z"+ i ;
            }

        }
     
    }
    if (pom==false){
       
        
        for (let i=0;i<zadaci.length;i++){
        
            if (zadaci[i]<0 || zadaci[i]>10 || !isInt(zadaci[i])) {
                if (i==0)  data ="Pogrešan parametar ";
                data+="z"+ i ;
                if (i!=zadaci.length-1) data+=",";
            }

        }
    }
    return data;
}
app.post('/vjezbe',function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    let odg = vratiOdg(req.body.brojVjezbi,req.body.brojZadataka);
  
    if (odg!=0) res.json({status: "error", data:odg});
     else  {
    fs.readFile("vjezbe.csv",function(err,data){
     if (err){
         let podaci = "brojVjezbe,brojZadatka";
         for (let i=1;i<=req.body.brojVjezbi;i++){
             podaci+="\n" + i+","+req.body.brojZadataka[i-1];
         }
         fs.appendFile('vjezbe.csv',podaci,function(err){
             if(err) throw err;
             res.json({status:"Dodane vjezbe u csv"});
         });

     }
     else {
         let podaci =data;
         for (let i=1;i<=req.body.brojVjezbi;i++){
            podaci+="\n" + i+","+req.body.brojZadataka[i-1];
        }
        fs.writeFile('vjezbe.csv', podaci, (err) => {
    
            res.json({status :"Dodane vjezbe u csv" });
        });
     }
    });
}
});



//get vjezbe

app.get("/vjezbe", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
   
    fs.readFile(__dirname+"/vjezbe.csv", function(err, data) {
      console.log(data.toString());
        if(err) throw err;
        let obj = dajPodatke(data.toString());
      res.send(obj);
    });
  });

  function dajPodatke (data) {
    let zadaci = [];
    let odg = {};
    
     let red = data.split("\n");
     odg.brojVjezbi = red.length-1;
    for (let j=1;j<red.length;j++){
      
       if (red[j]!="") {
     zadaci[j-1] = parseInt( ((red[j].toString().split(","))[1]));
       }
    
   }
   odg.brojZadataka = zadaci;
   return odg;
  }

app.listen(3000);




