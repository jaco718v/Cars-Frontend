import { API_URL } from "../../settings.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
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
    const allCars = await fetch(URL)
    .then(res => res.json())
    makeTable(allCars)
}
