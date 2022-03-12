window.onload = function () {
   
    var div2 = document.getElementById("vjezbe");
    VjezbeAjax.dohvatiPodatke((err2,data2) => {
          
        if (err2==null) {
           
        VjezbeAjax.iscrtajVjezbe(div2,data2);
        }
        else {
            alert("Doslo je do greske");
            console.log(err2);
        }
    });
   }