import { API_URL} from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows } from "../../utils.js"

const URL = `${API_URL}/reservations`

export async function initListReservationsAll() {
    getUserReservations()
}

function makeTable(reservations){
    const tableRows = reservations.map(reser => `
        <tr>
            <td>${reser.id}</td>
            <td>${reser.carId}</td>
            <td>${reser.rentalDate}</td>
            <td>${reser.rentalDateEnd}</td>
        </tr>
        `)
    const tableRowAsString = tableRows.join("")
    document.getElementById("tablerows").innerHTML = sanitizeStringWithTableRows(tableRowAsString)
}


async function getUserReservations(evt){
    const username = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    try{
    const allReservations = await fetch(URL+'/'+username,{
        headers:{ "Authorization":"Bearer "+ token}
    })
    .then(handleHttpErrors)
    makeTable(allReservations)
    }catch(err){
        console.log(err.message)
    }
}

