import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { setHTML } from "../utils/Writer.js"
import { api } from "./AxiosService.js"


class HousesService {


    async getHouses() {
        const res = await api.get('api/houses')

        console.log("got houses from the API?", res.data)

        const houses = res.data.map(pojo => new House(pojo))

        AppState.houses = houses

        console.log("Houses in the AppState", AppState.houses)
    }

    async createHouse(formData) {
        const res = await api.post('api/houses', formData)

        console.log("Created House?", res.data)

        const builtHouse = new House(res.data)

        AppState.houses.push(builtHouse)

        AppState.emit('houses')
    }

    async deleteHouse(houseId) {

        const res = await api.delete(`api/houses/${houseId}`)

        console.log("deleted house", res.data)

        let houseIndex = AppState.houses.findIndex(h => h.id == houseId)

        if (houseIndex < 0) {
            throw new Error(`No house found at index ${houseIndex}`)
        }

        AppState.houses.splice(houseIndex, 1)

        AppState.emit('houses')
    }

}

export const housesService = new HousesService