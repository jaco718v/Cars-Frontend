
import { API_URL,FETCH_NO_API_ERROR } from "../../settings.js"

const URL = `${API_URL}/cars`

export function initAddCar(match) {
  document.getElementById("btn-submit-car").onclick = evt => {
    evt.preventDefault()
    addCar()
  }
}

async function addCar(){
    const brand = document.getElementById("brand").value
    const model = document.getElementById("model").value
    const price = document.getElementById("price-pr-day").value
    const discount = document.getElementById("best-discount").value

    const response = await fetch(URL, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            brand: brand,
            model: model,
            pricePrDay: price,
            bestDiscount: discount
        })
    })
    .then(data => data.json())
    console.log(response)
}
