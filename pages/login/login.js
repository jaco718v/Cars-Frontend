import { API_URL } from "../../settings.js"
import { handleHttpErrors } from "../../utils.js"


const URL = API_URL+'/auth/login'

export function initLogin() {
    document.getElementById("btn-login").onclick = login
}
async function login(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value


    try {
    const res = await fetch(URL, {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({username,password})
    
    }).then(handleHttpErrors)
    storeLoginDetails(res)
    window.router.navigate("")
    }
    catch (err){
        console.log(err.message)
    }
}

function storeLoginDetails(res) {
    localStorage.setItem("token", res.token)
    localStorage.setItem("user", res.username)
    localStorage.setItem("roles", res.roles)

    toggleLoginStatus(true,res.roles)
  }


export function toggleLoginStatus(loginStatus,roles){

    document.getElementById("nav-login").style.display = loginStatus ? "none" : "block"
    document.getElementById("nav-logout").style.display = loginStatus ? "block" : "none"
    const statusTxt = loginStatus ? `User: ${localStorage["user"]} (${localStorage["roles"]})` : ""
    document.getElementById("user-details").innerText = statusTxt
    roleNavToggle(roles)
}

function roleNavToggle(roles){
    if(null==roles){
        roles = []
    }

    document.getElementById("nav-reservation").style.display = roles.includes('USER') ? "block" : "none"
    document.getElementById("nav-cars").style.display = roles.includes('ADMIN') ? "block" : "none"
    document.getElementById("nav-members").style.display = roles.includes('ADMIN') ? "block" : "none"
    
    document.getElementById("nav-signup").style.display = roles.length == 0 ? "block" : "none"
    
}