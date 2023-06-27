import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { api } from "./AxiosService.js"

class CarsService {


  async getCars() {
    const res = await api.get('api/cars')
    console.log('got cars', res.data);

    const builtCars = res.data.map(carPojo => new Car(carPojo))

    AppState.cars = builtCars

    console.log("cars in the appstate", AppState.cars)
  }

  async createCar(carData) {
    const res = await api.post('api/cars', carData)

    console.log('created car????', res.data);

    const builtCar = new Car(res.data)

    AppState.cars.push(builtCar)

    AppState.emit('cars')
  }

  async deleteCar(carId) {
    console.log('car Id', carId);

    const res = await api.delete(`api/cars/${carId}`)

    console.log('deleted car', res.data);

    const carIndex = AppState.cars.findIndex(car => car.id == carId)

    if (carIndex == -1) {
      throw new Error(`No car index found with the id of ${carId}`)
    }

    AppState.cars.splice(carIndex, 1)

    AppState.emit('cars')
  }

  async editCar(carData, carId) {
    const res = await api.put(`api/cars/${carId}`, carData)

    console.log('edited car', res.data);

    const updatedCar = new Car(res.data)

    const oldCarIndex = AppState.cars.findIndex(car => car.id == carId)

    if (oldCarIndex == -1) {
      throw new Error(`No car index found with the id of ${carId}`)
    }

    AppState.cars.splice(oldCarIndex, 1, updatedCar)

    AppState.emit('cars')
  }
}

export const carsService = new CarsService()