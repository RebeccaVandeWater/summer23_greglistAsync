import { AppState } from "../AppState.js"

export class House {
    constructor(data) {
        this.id = data.id
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl || 'https://plus.unsplash.com/premium_photo-1683133571543-fdc948a9dddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
        this.year = data.year
        this.price = data.price
        this.description = data.description || 'This is a house.'
        this.creatorId = data.creatorId
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
        this.creatorName = data.creator.name
        this.creatorPicture = data.creator.picture

    }

    // TODO: Make own CSS Class for user images
    // TODO: Fix margins on Houses images

    get houseCard() {
        return /*html*/`
        <div class="col-10 elevation-5 m-auto my-3">
                
            <section class="row">

                <div class="col-12 col-md-4">
                    <img class="img-fluid" src="${this.imgUrl}" alt="${this.creatorName}">
                </div>

                <div class="col-12 col-md-8">

                    <div class="d-flex justify-content-evenly p-2 fs-2">
                        <span>${this.year}</span>
                        <span>$${this.price}</span>
                    </div>

                    <div class="d-flex justify-content-evenly p-2 fs-3">
                        <p>${this.description}</p> <br>

                        <span>Bedrooms: ${this.bedrooms}</span>
                        <span>Bathrooms: ${this.bathrooms}</span>
                        <span>Levels: ${this.levels}</span>
                    </div>

                    <div class="d-flex justify-content-evenly p-2 fs-4">
                        <span>${this.createdAt.toLocaleString()}</span>
                        <img class="img-fluid creator-picture" src="${this.creatorPicture}" alt="${this.creatorName}">
                        <span>${this.creatorName}</span>
                    </div>

                    ${this.ComputeDeleteButton}

                </div>
            </section>
        </div>
        `
    }

    get ComputeDeleteButton() {
        if (!AppState.account || AppState.account.id != this.creatorId) {
            return ''
        }
        return `
        <div>
            <button onclick="app.HousesController.deleteHouse('${this.id}')" class="btn btn-danger">
            Delete House
            </button>
        </div>
        `
    }

    static get CreateHouseForm() {
        return `
        <form onsubmit="app.HousesController.createHouse(event)">

                <div>
                <label for="houseImg">House Image</label>
                <input type="url" name="imgUrl" id="houseImg">
                </div>

                <div>
                <label for="houseYear">Year</label>
                <input type="number" name="year" id="houseYear" min="1900" max="2024" required>
                </div>

                <div>
                <label for="housePrice">Price</label>
                <input type="number" name="price" id="housePrice" min="1" max="2000000" required>
                </div>

                <div>
                <label for="houseBedrooms">Bedrooms</label>
                <input type="number" id="houseBedrooms" name="bedrooms" min="1" max="15" required>
                </div>

                <div>
                <label for="houseBathrooms">Bathrooms</label>
                <input type="number" id="houseBathrooms" name="bathrooms" min=".5" max="15" step=".5" required>
                </div>

                <div>
                <label for="houseLevels">Levels</label>
                <input type="number" id="houseLevels" name="levels" min="1" max="5" required>
                </div>

                <div>
                <label for="houseDescription">Description</label>
                <textarea name="description" id="houseDescription" cols="30" rows="10"></textarea>
                </div>

                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
                </div>
            </form>
        `
    }
}