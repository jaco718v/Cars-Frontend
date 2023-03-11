
import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "/cars"

export async function initReservation() {
    document.getElementById("table-rows").onclick = evt => showReservation()
    getAllCars()

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
            <button id="row-btn_delete_${car.id}" type="button"  class="btn btn-sm btn-danger">Delete</button>
            </td>
        </tr>
        `)
    const tableRowAsString = tableRows.join("")
    document.getElementById("table-rows").innerHTML = sanitizeStringWithTableRows(tableRowAsString)
}


async function getAllCars(evt){
    const allCars = await fetch(URL)
    .then(res => res.json())
    makeTable(allCars)
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
        
      }

      if(btnAction === "delete"){

      }
}

