
function dodaj() {
    var div = document.getElementById("inputPolja");
    var input = document.getElementById("brojVjezbi").value;
 VjezbeAjax.dodajInputPolja(div,input);
 
 }
function posalji() {
 var div = document.getElementById("inputPolja");

 
    VjezbeAjax.posaljiPodatke(div,(err,data2)=> {
if (err==null) {
    alert("Podaci su poslani");
        console.log("Poslano");
    }
    else {
        alert("Doslo je do greske. Podaci nisu poslani.");
        console.log("Nije poslano");
    }
    });
 

}
