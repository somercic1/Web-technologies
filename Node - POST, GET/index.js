var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require("body-parser");
const fs = require("fs");
const { parse } = require("path");
const { json } = require("body-parser");
const { response } = require('express');

const db = require("./database/db.js");
db.sequelize.sync({
    force: true
   });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.raw({
      inflate: true,
      limit: '50mb',
      type: () => true, 
    })
  );


// ovo je zbog cors erorra
   const cors = require('cors');
   const corsOptions ={
       origin:'http://localhost:3000', 
       credentials:true,           
       optionSuccessStatus:200
   }
   app.use(cors(corsOptions));
 

app.get("/vjezbe", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
   
        db.vjezba.findAll().then(function(vjezbe) {
          let nizVjezbi = [];
          let i=0;
          vjezbe.forEach(vjezba => {
            nizVjezbi[i]=vjezba;
           i++;
          });
          let response = {};
          response.brojVjezbi = nizVjezbi.length;
        let niz=  [];
          for (let i=0;i<nizVjezbi.length;i++){
              niz[i]=nizVjezbi[i].brojZadataka;
          }
          response.brojZadataka = niz;
          res.send(JSON.stringify(response));
        });
        
   
  });




// post vjezbe 


app.post('/vjezbe',function(req,res){
    //ovo dodajemo da bi se u kromu mogao ajax izvrsiti i vratiti success
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  
    let request = JSON.stringify(req.body);
    let objekat = JSON.parse(request);
   
    let response="Pogrešan parametar ";
   
    if (objekat.brojVjezbi<1 || objekat.brojVjezbi>15 || !Number.isInteger(Number(objekat.brojVjezbi))){
       
        response+="brojVjezbi";
    }
        for (let i=0;i<objekat.brojZadataka.length;i++){
            if (objekat.brojZadataka[i]<0 || objekat.brojZadataka[i]>10 || !Number.isInteger(Number(objekat.brojZadataka[i]))) {
                if (response == "Pogrešan parametar " ) response+="z"+ i ;
               else  response+=",z"+ i ;
            }

        }
       if (response!="Pogrešan parametar ") 
        res.json({status:"error",data:response});
    else {
   //pokusamo otvoriti datoteku

   for (let i=0;i<objekat.brojVjezbi;i++){
    db.vjezba.create({ brojVjezbi : (i+1),
        brojZadataka: objekat.brojZadataka[i]
}).then(response =>{res.end("Vjezbe su dodane")
}).catch(function (err) {
      console.log( err);
      return 0;
  });

 }
    }
});


//nove rute

// post studenta u bazu
app.post('/student',function(req,res){
    
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    let request = req.body; 
    let index = request['index'];
    let grupa = request['grupa'];
    let id = 1;

db.student.findOne({ where: { index: index}}).then(function(data) {
    if (data!=null) {
        let status ="Student sa indexom {"+ index +"} već postoji!" ;
        res.json({status : status});  
    }

    else {
        db.grupa.findOne({where: {naziv : grupa}}).then(function(dataReq2){
            if (dataReq2==null){
                db.grupa.create({ naziv : grupa
            }).then(resp =>{
            }).catch(function (err) {
                  console.log( err);
                  return 0;
              }); 

             
            }
            id = (JSON.parse(JSON.stringify(dataReq2))).id;
    
        }).catch(function (err) {
            console.log( err);
            return 0;
        }); 
       
       
        db.student.findOne({where: {index: index}}).then (function(dataReq3){
            if (dataReq3==null) {
                db.student.create({
                    ime:request['ime'],
                    prezime : request['prezime'],
                    index : request['index'],
                    GrupaId : id
                }).then(req4 => {
                    res.send({status: "Kreiran student!"})
                }).catch(function(err) {
                    console.log(err);
                    return 0;
                })
            }
            else {
                res.send({status: "Student sa indexom {"  + index + "}već postoji"});
            }
        })

    }
}).catch(function (err) {
    console.log( err);
    return 0;
}); 


  });


  //put metoda
  app.put('/student/:index',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    let request = req.body; 
    let grupa = request['grupa'];
    let index = req.params.index;

db.student.findOne({ where: { index: index}}).then(function(responStudent) {
    if (responStudent==null) {
        let status ="Student sa indexom {"+ index +"} ne postoji!" ;
        res.json({status : status});  
    }

    else {
        let foreinKey;
        db.grupa.findOne({where: {naziv : grupa}}).then(function(responseGrupa){
            if (responseGrupa==null){
                db.grupa.create({ naziv : grupa
            }).then(function(responseGrupa){
                if (responseGrupa!=null) {
                   
                    foreinKey = (JSON.parse(JSON.stringify(responseGrupa))).id;
                    db.student.update({                       
                        GrupaId : foreinKey
                    }, {where: {index : index}}).then(odgovor => {
                        res.send({status: "Promjena grupe studentu { "+ index + "}"})
                    }).catch(function(err) {
                        console.log(err);
                        return 0;
                    })
                  
                }
            }).catch(function (err) {
                  console.log( err);
                  return 0;
              }); 

           
            }
            else {
                foreinKey = (JSON.parse(JSON.stringify(responseGrupa))).id;
             db.student.update({                       
                GrupaId : foreinKey
            }, {where: {index : index}}).then(odgovor => {
                res.send({status: "Promjena grupe studentu { "+ index + "}"})
            }).catch(function(err) {
                console.log(err);
                return 0;
            })
            }

    
        }).catch(function (err) {
            console.log( err);
            return 0;
        }); 
       


    }
}).catch(function (err) {
    console.log( err);
    return 0;
}); 


  });
   

app.post('/batch/student',function(req,res){
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    let csv = req.body.toString(); 

    let studenti = csv.split("\n");
    let CSVStudent = [];
    for (let i =0;i<studenti.length;i++){
    
    let niz  = [];
    niz = studenti[i].split(",");
    let student = {ime: niz[0], prezime: niz[1],index: niz[2]  ,grupa: niz[3]};
    CSVStudent[i] = student;  
    }

    let brDodanih = 0;
    let partOfTheStatus = "";

    for (let i=0;i<CSVStudent.length;i++) {
   let idGrupe =1;
db.student.findOne({ where: { index: CSVStudent[i].index}}).then(function(student) {
    if (student!=null) {
        partOfTheStatus+= CSVStudent[i].index + ",";
  
        if (i==CSVStudent.length-1) {
           
            let status ="";
            status = "Studenti {" + partOfTheStatus + "} već postoje!";
         res.json({status: status});
        }
    }

    else {
        db.grupa.findOne({where: {naziv : CSVStudent[i].grupa}}).then(function(grupaOdg){
            if (grupaOdg==null){
                db.grupa.create({ naziv : CSVStudent[i].grupa
            }).then( function(odg2) {
                idGrupe = (JSON.parse(JSON.stringify(odg2))).id;
                db.student.findOne({where: {index: CSVStudent[i].index}}).then (function(studentOdg){
                    if (studentOdg==null) {
                        
                        db.student.create({
                            ime: CSVStudent[i].ime,
                            prezime : CSVStudent[i].prezime,
                            index : CSVStudent[i].index,
                            GrupaId : idGrupe
                        }).then(function(odg3) {
                            if(i!=CSVStudent.length-1) brDodanih++; 
                            else {
                                brDodanih++;
                                let status = "";
   
                                if (brDodanih< CSVStudent.length) {
                                    status = "Dodano {" + brDodanih;
                                    status += "} studenata, a studenti {";
                                    status += partOfTheStatus + "} već postoje!";
                                    res.send({status: status});
                                }
                                else {
                                    status = "Dodano {" + brDodanih + "} studenata";
                                    res.send({status: status});
                                }
                            }
                        
                        }).catch(function(err) {
                            console.log(err);
                            return 0;
                        })
                    }
                    
                })
            }).catch(function (err) {
                  console.log( err);
                  return 0;
              }); 
             
          
             
            }
            else {
                idGrupe = (JSON.parse(JSON.stringify(grupaOdg))).id;
            db.student.findOne({where: {index: CSVStudent[i].index}}).then (function(studentOdg){
                if (studentOdg==null) {
                  
                    db.student.create({
                        ime: CSVStudent[i].ime,
                        prezime : CSVStudent[i].prezime,
                        index : CSVStudent[i].index,
                        GrupaId : idGrupe
                    }).then(function(odg3) {
                        if(i!=CSVStudent.length-1) brDodanih++; 
                        else {
                            brDodanih++;
                            let status = "";

                            if (brDodanih< CSVStudent.length) {
                                status = "Dodano {" + brDodanih;
                                status += "} studenata, a studenti {" + partOfTheStatus;
                                status += "} već postoje!";
                                res.send({status: status});
                            }
                            else {
                                status = "Dodano {" + brDodanih + "} studenata";
                                res.send({status: status});
                            }
                        }
                    
                    }).catch(function(err) {
                        console.log(err);
                        return 0;
                    })
                }
                
            })
            }
    
        }).catch(function (err) {
            console.log( err);
            return 0;
        }); 
       
       
     

    }
}).catch(function (err) {
    console.log( err);
    return 0;
}); 


    }
    
      
  });
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/drugi.html"));
});
app.get('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    res.sendFile(path.join(__dirname + "/public/student.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/mochaTestovi.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/unosVjezbi.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/zadaci.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/zadatak.html"));
});
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/public/mojRepozitorij.html"));
});

app.listen(3000);




