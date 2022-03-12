var Modul=(function(){

    var dajTacnost = function (report) {

        const reportObj = JSON.parse(report);
        
        var tac = parseFloat((reportObj.stats.passes/reportObj.stats.tests*100).toFixed(1));

        var result = {};
        var greske = [];
        result.tacnost = tac + "%";
        result.greske = greske;

        if(reportObj.stats.pending > 0){
            tac = 0;
            result.greske.push('Testovi se ne mogu izvrsiti');
        }
        else if(tac < 100){
            for(var i=0; i<reportObj.failures.length; i++){
                greske.push(reportObj.failures[i].fullTitle);
            }
        }

        // console.log('Rezultat: ' + JSON.stringify(result));

        return result;
    }


    var porediRezultate = function (rez1, rez2) {

        const rezultat1 = JSON.parse(rez1);
        const rezultat2 = JSON.parse(rez2);

        var padajauUR1ANisuUR2 = 0;
        var padajuUR2 = 0;
        var brojTestovaUR2 = 0;

        var result = {};   

        var istiNazivi = true;

        if(rezultat1.tests.length == rezultat2.tests.length){

            for(var i=0; i<rezultat1.tests.length; i++){
                if(rezultat1.tests[i].fullTitle != rezultat2.tests[i].fullTitle){
                    istiNazivi = false;
                    break;
                }
            }
        } else {
            istiNazivi = false;
        }

        if(istiNazivi){
            var tac = this.dajTacnost(rez2);
            result.promjena = tac.tacnost; 

            var greske = [];
            result.greske = greske.sort();
            result.greske = tac.greske;    
        }
        else{
            for(var i=0; i<rezultat1.tests.length; i++){

                if(!JSON.stringify(rezultat2).includes(JSON.stringify(rezultat1.tests[i]))){
                    // console.log('\nTest koji nije u oba: ' + JSON.stringify(rezultat1.tests[i]));
                    padajauUR1ANisuUR2++;
                }
            }

            padajuUR2 = rezultat1.failures.length;
            brojTestovaUR2 = rezultat1.tests.length;

            result.promjena = parseFloat((padajauUR1ANisuUR2 + padajuUR2)/(padajauUR1ANisuUR2 + brojTestovaUR2)*100).toFixed(1) + "%";


            var tac = this.dajTacnost(rez1);

            var greske = [];
            result.greske = greske.sort();
            result.greske = tac.greske;
        }

        // console.log('Rezultat: ' + JSON.stringify(result));

        return result;
    }


    return{
        dajTacnost: dajTacnost,
        porediRezultate: porediRezultate
    }
}());