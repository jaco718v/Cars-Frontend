import { API_URL} from "../../settings.js"
import { handleHttpErrors, setResponseText } from "../../utils.js"


const URL = API_URL + "/members"


export function initSignup() {
    document.getElementById("btn-submit-user").onclick = evt => {
        evt.preventDefault()
        signUpUser()
    }
}

async function signUpUser(){
    const username = document.getElementById("input-username").value
    const email = document.getElementById("input-email").value
    const password = document.getElementById("input-username").value
    const firstName = document.getElementById("input-firstname").value
    const lastName = document.getElementById("input-lastname").value
    const street = document.getElementById("input-street").value
    const city = document.getElementById("input-city").value
    const zip = document.getElementById("input-zip").value
    
    try{
    const response = await fetch(URL, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            zip: zip
        })
    })
    .then(handleHttpErrors)
    window.router.navigate("login")
    }catch(err){
        setResponseText(false, err.message)
    }
}



