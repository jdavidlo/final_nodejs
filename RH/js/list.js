window.onload = init;
var headers = {};
var url = "http://localhost:3000"

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization' : "bearer " + localStorage.getItem("token")
            }
        }
        loadUser();
        document.querySelector('.sin').addEventListener('click', logout);
        document.querySelector('.search').addEventListener('click', searchU);
        document.querySelector('.delete').addEventListener('click', deleteU);
        
        

    }else{
        window.location.href = "index.html"
    }
}


function loadUser(){
    axios.get(url + "/user", headers)
    .then(function(res) {
        console.log(res)
        displayUser(res.data.message)
    }).catch(function(err) {
        console.log(err)
    })
}

function displayUser(user) {
    var body = document.querySelector("tbody");
    for(var i = 0; i < user.length; i++ ){
        body.innerHTML += ` <tr>
                            <td>${user[i].user_name}</td> 
                            <td>${user[i].user_lastname}</td> 
                            <td>${user[i].user_phone}</td> 
                            <td>${user[i].user_address}</td> 
                            <td>${user[i].user_mail}</td> 
                            <td> <button class="btn btn-primary edit" id="editU" onclick=editU("${user[i].user_id}")> <i class="fa fa-pencil"></i>Editar</button>  <button class="btn btn-danger delete" id="deleteU" onclick=deleteU("${user[i].user_id}")> <i class="fa fa-trash"></i>Borrar </button></td>
                            </tr>`
                            
    }
    
}

function deleteU(id){
    axios.delete(url + `/user/${id}`, headers)
    .then(function(res){
        console.log(res.data);
        if(res.data.code === 201){
            alert("Empleado eliminado correctamente")
            window.location.href = "listaEmpleados.html"
        }else{
            alert("Ocurrio un error inesperado intentelo mas tarde")
        }
    }).catch(function(err){
        console.log(err)
    })
}

function editU(id){
    localStorage.setItem("id", id)
    window.location.href = "editEmpleado.html"
}
function searchU(){
    var name = document.getElementById("search").value
    console.log(name)
    localStorage.removeItem("name")
    localStorage.setItem("name", name)
    window.location.href = "busquedaEmpleado.html"
}
function logout(){
    localStorage.removeItem("name")
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    window.location.href = "login.html"
}