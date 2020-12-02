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
        document.querySelector('.sin').addEventListener('click', logout);
        document.querySelector('.search').addEventListener('click', searchU);
        document.querySelector('.newE').addEventListener('click', signin);
        
        

    }else{
        window.location.href = "index.html"
    }
}


function signin(){
    var name = document.getElementById('input-name').value
    var lastName = document.getElementById('input-lastName').value
    var phone = document.getElementById('input-phone').value
    var address = document.getElementById('input-address').value
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value


    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
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
        alert("Registro exitoso")
        window.location.href = "base.html"
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