function ispisiPoruku(data,error){
    
    if(error == null){
        alert(JSON.stringify(data))
    }else {
        alert(JSON.stringify(error));
    }
}

function posaljiStudenta() {
    modulStudent.posaljiStudent({ime: document.getElementById('ime').value,prezime: document.getElementById('prezime').value,index: document.getElementById('index').value, grupa: document.getElementById('grupa').value},ispisiPoruku)
}

function posaljiStudente () {
    modulStudent.dodajBatch( document.getElementById('textarea').value,ispisiPoruku)
}

