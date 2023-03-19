import { toggleLoginStatus } from "../login/login.js"


export function initLogout() {
    document.getElementById("btn-logout").onclick = clearLoginDetails
}

function clearLoginDetails() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("roles")
    
    toggleLoginStatus(false)
    window.router.navigate("login")
  }