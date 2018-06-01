
var list = [
    {"nome":"arroz","quantidade":"1","valor":"5.40"},
    {"nome":"cerveja","quantidade":"12","valor":"1.99"},
    {"nome":"carne","quantidade":"1","valor":"15.00"}
];

function getTotal(list){
    var total = 0;
    for(var key in list){
        total += list[key].valor * list[key].quantidade;
    }
    document.getElementById("valorTotal").innerHTML = formatValue(total);
}

function setList(list){
    var table = '<thead><tr><td>Nome</td><td>Quantidade</td><td>Valor</td><td>Opções</td></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].nome) +'</td><td>'+ formatAmount(list[key].quantidade) +'</td><td>'+ formatValue(list[key].valor) +'</td><td><button class="btn btn-warning" onclick="setUpdate('+key+');" >Editar</button>  <button class="btn btn-danger" onclick="deleteData('+key+');" >Deletar</button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}

function formatDesc(nome){
    var str = nome.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function  formatAmount(quantidade){
    return parseInt(quantidade);
}

function  formatValue(valor){
    var str = parseFloat(valor).toFixed(2) + "";
    str = str.replace(".",",");
    str = "R$ " + str;
    return str;
}

function addData(){
    if(!validation()){
        return;
    }
    var nome = document.getElementById("nome").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    list.unshift({"nome":nome , "quantidade":quantidade ,"valor":valor });
    setList(list);
}

function setUpdate(id){
    var obj = list[id];
    document.getElementById("nome").value = obj.nome;
    document.getElementById("quantidade").value = obj.quantidade;
    document.getElementById("valor").value = obj.valor;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm(){
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var nome = document.getElementById("nome").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;

    list[id] = {"nome":nome, "quantidade": quantidade, "valor":valor };
    resetForm();
    setList(list);
}

function deleteData(id){
    if(confirm("Tem certeza que deseja deletar esse item?")){
        if(id === list.length - 1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

function validation(){
    var nome = document.getElementById("nome").value;
    var quantidade = document.getElementById("quantidade").value;
    var valor = document.getElementById("valor").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";
    if(nome === ""){
        errors += '<p>Preencha o Nome</p>';
    }
    if(quantidade === ""){
        errors += '<p>Preencha a Quantidade</p>';
    }else if(quantidade != parseInt(quantidade)){
        errors += '<p>Coloque uma Quantidade Valida</p>';
    }
    if(valor === ""){
        errors += '<p>Preencha um valor</p>';
    }else if(valor != parseFloat(valor)){
        errors += '<p>Coloque um valor valido</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
    }else{
        return 1;
    }
}

function deleteList(){
    if(confirm("Deseja Deletar essa Lista?")){
        list = [];
        setList(list);
    }
}

function saveListStorage(list){
    var jsonStr = JSON.stringify(list);
    localStorage.setItem("list",jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");
    if(testList){
        list = JSON.parse(testList);
    }
    setList(list);
}


initListStorage();