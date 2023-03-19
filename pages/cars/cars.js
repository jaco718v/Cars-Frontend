import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
import { handleHttpErrors } from "../../utils.js"
const URL = API_URL + "/cars"

export function initCars() {
    getAllCars()
    
    
}

function makeTable(cars){
    const tableRows = cars.map(car => `
        <tr>
            <td>${car.id}</td>
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.pricePrDay}</td>
            <td>${car.bestDiscount}</td>
        </tr>
        `)
    const tableRowAsString = tableRows.join("")
    document.getElementById("table-rows").innerHTML = sanitizeStringWithTableRows(tableRowAsString)
}


async function getAllCars(evt){
    const token = localStorage.getItem("token")
    
    try{
    const allCars = await fetch(URL, {
        headers: {"Authorization":"Bearer "+token}
    })
    .then(handleHttpErrors)
    makeTable(allCars)}
    catch(err){
        console.log(false, err.message)
    }
}
