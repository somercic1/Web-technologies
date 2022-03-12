
let VjezbeAjax = (function () {
var dodajInputPolja = function (div,brojVjezbi) {
    for (let i=0;i<brojVjezbi;i++) {
        let txtInput = document.createElement("label");
        let inputPolje = document.createElement("input");
        inputPolje.setAttribute("value",4);
        let tekst = document.createTextNode("vjezba " + (i+1));
        txtInput.appendChild(tekst);
        div.appendChild(txtInput);
        div.appendChild(inputPolje);
    }


    

}
var posaljiPodatke = function (div,callback) {
  
    let djeca =div.children;
    let brojZadataka = [];
    let j=0;
    let brojVjezbi = djeca.length/2;
    for (let i=0;i<djeca.length;i++){
        if (i%2==1) {
        brojZadataka[j]= (djeca[i]).value;
        j++;
       
        }
    }
    let objekat = {brojVjezbi:brojVjezbi, brojZadataka:brojZadataka};
   let urlPost = 'http://localhost:3000/vjezbe';
  
    $.ajax({
        
        
        url: urlPost ,
        type: 'POST',
        dataType: "json",
        data: objekat,
        success: function (data) {
            callback(null,data);
         },
         failure: function (err) {
            callback(err,null);
         }});  
 
         
}

var dohvatiPodatke = function (callback) {
    
    let urlPost = 'http://localhost:3000/vjezbe';
    $.ajax({
        
        type: 'GET',
    
        url: urlPost ,
        
       success: function (data) {
       
        callback(null,data);
      },
         failure: function (err) {
           
             callback(err,null);
         }});  

}

var iscrtajVjezbe = function (div,objekat1) {
let objekat = JSON.parse(objekat1);

    for (let i=0;i<objekat.brojVjezbi;i++) {
        
        let vjezba = document.createElement("div");
        vjezba.setAttribute("class","div");
        let btn = document.createElement("button");
        btn.setAttribute("class","btn");
        let tekst = document.createTextNode("Vjezba " + (i+1));
        btn.appendChild(tekst);
        
        vjezba.appendChild(btn);
        div.appendChild(vjezba);
       
        let div2 = document.createElement("div");
      ;
       
        iscrtajZadatke(div2,(objekat.brojZadataka)[i]);
        div.appendChild(div2);
       
    }
}

var iscrtajZadatke = function (div,brojZadataka) {
 
    for (let i=0;i<brojZadataka;i++) {
        let btn = document.createElement("button");
        btn.setAttribute("class","btn1");
        let tekst = document.createTextNode("Zadatak " + (i+1));
        btn.appendChild(tekst);
        div.appendChild(btn);
       
    }
   
}


    return {
        posaljiPodatke: posaljiPodatke,
dohvatiPodatke: dohvatiPodatke,
iscrtajVjezbe:iscrtajVjezbe,
dodajInputPolja:dodajInputPolja,
iscrtajZadatke,iscrtajZadatke

    }
}());