

let modulStudent = (function () {
   
    var dodajBatch= function (csv,callbackFJA){
    let url = 'http://localhost:3000/batch/student'
         
        $.ajax({
            type: "POST",
            enctype: 'text/csv',
            url: url ,
            data: csv,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
               
                callbackFJA(data,null);
            },
            failure: function (err) {
                callbackFJA(null,err);
            }
        });
    }
    
   
    
    var posaljiStudent= function (studentObjekat, callback){

        let url = 'http://localhost:3000/student';
        $.ajax({
            url: url ,
            type: 'POST',
            data: studentObjekat,
            success: function (data) {
                callback(data,null);
            },
            failure: function (err) {
                callback(null,err);
            }
        });
    }
    
    var postaviGrupu=function (indexStudenta,grupa,callback){
    let url ='http://localhost:3000/student/'+indexStudenta;
        $.ajax({
            url: url,
            data:grupa,
            type: 'PUT',
            success: function (data) {
                callback(data,null);
            },
            failure: function (err) {
                callback(null,err);
            }
        });
    }
    
        return {
    dodajBatch:dodajBatch,
    posaljiStudent :posaljiStudent,
    postaviGrupu :postaviGrupu
        }
    }());