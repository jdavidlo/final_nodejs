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
        var id = localStorage.getItem("id")
        loadUserId(id);
        document.querySelector('.sin').addEventListener('click', logout);
        document.querySelector('.search').addEventListener('click', searchU);
        
    }else{
        window.location.href = "index.html"
    }
}



function loadUserId(id){
    axios.get(url + "/user/"+id, headers)
    .then(function(res) {
        console.log(res)
        displayUserId(res.data.message)
    }).catch(function(err) {
        console.log(err)
    })
}

function displayUserId(user) {
    document.getElementById("input-name").value = user[0].user_name
    document.getElementById("input-lastName").value = user[0].user_lastname
    document.getElementById("input-phone").value = user[0].user_phone
    document.getElementById("input-address").value = user[0].user_address
    document.getElementById("input-mail").value = user[0].user_mail
    document.getElementById("input-password").value = user[0].user_password
     
    document.querySelector('.editE').addEventListener('click', editU);
}

function editU(){
    var name = document.getElementById('input-name').value
    var lastName = document.getElementById('input-lastName').value
    var phone = document.getElementById('input-phone').value
    var address = document.getElementById('input-address').value
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value
    var id = localStorage.getItem("id")

    axios({
        method: 'put',
        url: `http://localhost:3000/user/`+id,
        data: {
            user_name: name,
            user_lastname: lastName,
            user_phone: phone,
            user_address: address,
            user_mail: mail,
            user_password: pass,

        }
    }).then(function(res){
        console.log(res);
        alert("Modificacion correcta")
        window.location.href = "listaEmpleados.html"
    }).catch(function(err){
        console.log(err)
    })
}
function searchU(){
    var name = document.getElementById("search").value
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