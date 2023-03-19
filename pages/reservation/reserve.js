
import { API_URL } from "../../settings.js"
import { handleHttpErrors, sanitizeStringWithTableRows, setResponseText } from "../../utils.js"
const carURL = API_URL + "/cars"
const resURL = API_URL + "/reservations"

export async function initReservation() {
    getAllCars()
    document.getElementById("table-rows").onclick = evt => showReservation(evt)
    document.getElementById("btn-reservation").onclick = evt => makeReservation()

}

async function setupReservationModal(evt) {
}

function makeTable(cars){
    const tableRows = cars.map(car => `
        <tr>
            <td>${car.id}</td>
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.pricePrDay}</td>
            <td>
            <button id="row-btn_reserve_${car.id}" type="button"  class="btn btn-sm btn-primary"  data-bs-toggle="modal" data-bs-target="#reservation-modal" >Reserve</button> 
            </td>
        </tr>
        `)
    const tableRowAsString = tableRows.join("")
    document.getElementById("table-rows").innerHTML = sanitizeStringWithTableRows(tableRowAsString)
}


async function getAllCars(evt){
    const token = localStorage.getItem("token")
    
    try{
    const allCars = await fetch(carURL,{
        headers:{ "Authorization":"Bearer "+ token}
    })
    .then(handleHttpErrors)
    makeTable(allCars)
    }catch(err){
        console.log(err.message)
    }
}

async function makeReservation(evt){
    const rentalDate = document.getElementById("reservation-date-start").value
    const rentalDateEnd = document.getElementById("reservation-date-end").value
    const username = localStorage.getItem("user")
    const carId = document.getElementById("modal-carid-display").innerText
    
    const token = localStorage.getItem("token")

    try{
    const response = await fetch(resURL+"/"+username, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            "Authorization":"Bearer "+ token
        },
        body: JSON.stringify({
            rentalDate,rentalDateEnd,carId})
    }).then(handleHttpErrors)
    setResponseText(true)
    }catch(err){
        setResponseText(false,err.message)
    }
}

 async function showReservation(evt){
    const target = evt.target
    if (!target.id.startsWith("row-btn_")) {
        return
      }
      const parts = target.id.split("_");
      const id = parts[2]
      const btnAction = parts[1]
      if(btnAction === "reserve"){
        document.getElementById("modal-username-display").innerText = localStorage.getItem("user")
        document.getElementById("modal-carid-display").innerText = id
      }
} 



