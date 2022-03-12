
let assert = chai.assert;
after(function () {
    sinon.restore();
    
  });
  
 
  it("[Test 1] - dohvatiPodatke", function () {
    sinon.replace(jQuery, "ajax", sinon.fake());
    VjezbeAjax.dohvatiPodatke(sinon.fake());
  
    assert(jQuery.ajax.calledWithMatch({ url: "http://localhost:3000/vjezbe" , type: "GET"}));
  });


  
  it("[Test 2] - posalji podatke", function () {
    //sinon.replace(jQuery, "ajax", sinon.fake());
    let vjezbe = document.getElementById("pomocni");
    let input = document.createElement("input");
    input.value=2;
    vjezbe.appendChild(input);
    
    VjezbeAjax.posaljiPodatke(vjezbe,sinon.fake());

    assert(jQuery.ajax.calledWithMatch({ url: "http://localhost:3000/vjezbe", type: "POST" }));
  });

  it("[Test 3] - dodajInputPolja", function () {
    let div= document.getElementById("pomocni");
    while(div.firstChild){
      div.removeChild(div.lastChild);
    }
    //sinon.replace(jQuery, "ajax", sinon.fake());
    let inputi = document.getElementById("pomocni");

    VjezbeAjax.dodajInputPolja(inputi,2);
    assert.equal(inputi.children.length,4);
    
  });
  it("[Test 4] - dodajInputPolja - provjerava jel incijlalno unesena cetvorka u input", function () {
    let div= document.getElementById("pomocni");
    while(div.firstChild){
      div.removeChild(div.lastChild);
    }
    //sinon.replace(jQuery, "ajax", sinon.fake());
    let inputi = document.getElementById("pomocni");

    VjezbeAjax.dodajInputPolja(inputi,1);
    assert.equal(inputi.lastChild.value,4);
    
  });

  it("[Test 5] - iscrtajZadatke - provjerava da li se iscrta 1 zadatak", function () {
    let div= document.getElementById("pomocni");
    while(div.firstChild){
      div.removeChild(div.lastChild);
    }
    //sinon.replace(jQuery, "ajax", sinon.fake());
    let inputi = document.getElementById("pomocni");

    VjezbeAjax.iscrtajZadatke(inputi,1);
    assert.equal(inputi.children.length,1);
    
  });

  it("[Test 5] - iscrtajZadatke - provjerava da li se iscrta 1 zadatak", function () {
    let div= document.getElementById("pomocni");
    while(div.firstChild){
      div.removeChild(div.lastChild);
    }
    //sinon.replace(jQuery, "ajax", sinon.fake());
    let inputi = document.getElementById("pomocni");

    VjezbeAjax.iscrtajZadatke(inputi,1);
    assert.equal(inputi.children.length,1);
    
  });