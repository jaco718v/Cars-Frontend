import { API_URL} from "../../settings.js"

const URL = `${API_URL}/cars`

export function initFindEditCar(){
    document.getElementById("btn-fetch-car").onclick = evt => {
        const idURL = URL +"/"+ document.getElementById("car-id-input").value
        getCarById(idURL)
  }
    document.getElementById("btn-submit-edited-car").onclick = evt => {
        const idURL = URL +"/"+ document.getElementById("car-id").value
        updateCar(idURL)
}
    document.getElementById("btn-delete-car").onclick = evt => {
        const idURL = URL +"/"+ document.getElementById("car-id").value
        deleteCar(idURL)
}

}

async function updateCar(URL){
    const brand = document.getElementById("brand").value
    const model = document.getElementById("model").value
    const price = document.getElementById("price-pr-day").value
    const discount = document.getElementById("best-discount").value
    
    const response = await fetch(URL, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            brand: brand,
            model: model,
            pricePrDay: price,
            bestDiscount: discount
        })
    }).then(res => res.json())
    console.log(response)
}

async function getCarById(URL){
    const carData = await fetch(URL)
    .then(res => res.json())
    document.getElementById("car-id").value = carData.id
    document.getElementById("brand").value = carData.brand
    document.getElementById("model").value = carData.model
    document.getElementById("price-pr-day").value = carData.pricePrDay
    document.getElementById("best-discount").value = carData.bestDiscount
    console.log(carData.discount)
}

async function deleteCar(URL){
    const response = await fetch(URL, {
        method:'DELETE'
    })
    
}