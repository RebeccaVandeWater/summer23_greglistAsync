import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { housesService } from "../services/HousesService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"

function _drawHouses() {
    const houses = AppState.houses

    let template = ''

    houses.forEach(h => template += h.houseCard)

    setHTML('houseList', template)
}

export class HousesController {
    constructor() {
        console.log("Houses Controller Loaded")

        this.getHouses()

        this.drawCreateForm()

        AppState.on('houses', _drawHouses)
        AppState.on('account', _drawHouses)
    }

    async getHouses() {
        try {
            await housesService.getHouses()
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async createHouse(event) {
        try {
            event.preventDefault()

            const form = event.target

            const formData = getFormData(form)

            await housesService.createHouse(formData)
        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    async deleteHouse(houseId) {
        try {
            const deleteConfirmation = await Pop.confirm('Are you ready to sell this house?')

            if (!deleteConfirmation) {
                return
            }

            await housesService.deleteHouse(houseId)

        } catch (error) {
            console.log(error)
            Pop.error(error.message)
        }
    }

    drawCreateForm() {
        setHTML('form-section', House.CreateHouseForm)
    }
}