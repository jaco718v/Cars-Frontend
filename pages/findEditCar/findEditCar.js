import { API_URL} from "../../settings.js"
import { handleHttpErrors, setResponseText } from "../../utils.js"

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
    
    const token = localStorage.getItem("token")

    try{
    const response = await fetch(URL, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":"Bearer "+ token
        },
        body: JSON.stringify({
            brand: brand,
            model: model,
            pricePrDay: price,
            bestDiscount: discount
        })
    }).then(handleHttpErrors)
    setResponseText(true)
    }catch(err){
        setResponseText(false, err.message)
    }
}

async function getCarById(URL){
    const token = localStorage.getItem("token")
    
    try{
    const carData = await fetch(URL, {
        headers:{ "Authorization":"Bearer "+ token}
    })
    .then(handleHttpErrors)
    document.getElementById("car-id").value = carData.id
    document.getElementById("brand").value = carData.brand
    document.getElementById("model").value = carData.model
    document.getElementById("price-pr-day").value = carData.pricePrDay
    document.getElementById("best-discount").value = carData.bestDiscount
    } catch(err){
        setResponseText(false, err.message)
    }
}

async function deleteCar(URL){
    const response = await fetch(URL, {
        method:'DELETE'
    })
    
}