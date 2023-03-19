import { API_URL } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "/members"

export function initMembers(){
    getAllMembers()
}

function makeTable(members){
    const tableRows = members.map(member => `
        <tr>
            <td>${member.username}</td>
            <td>${member.email}</td>
            <td>${member.firstName} ${member.lastName}</td>
            <td>${member.ranking}</td>
        </tr>
        `)
    const tableRowAsString = tableRows.join("")
    document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowAsString)
}

async function getAllMembers(){
    const token = localStorage.getItem("token")
    try{
    const allMembers = await fetch(URL,{
        headers:{ "Authorization":"Bearer "+ token}
    })
    .then(handleHttpErrors)
    makeTable(allMembers)
    }catch(err){
        console.log(err.message)
    }
}