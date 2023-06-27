export const HousesView = /*html*/ `
<div class="container-fluid">
<section class="row">
    <div class="col-12 d-flex mt-3">

    <h1 class="mx-4">Houses</h1>

    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#houseModal">
        Create House
    </button>

    <div class="modal fade" id="houseModal" tabindex="-1" aria-labelledby="houseModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="houseModalLabel">Create a House</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="form-section">
            
            </div>
        </div>
        </div>
    </div>

    </div>

</section>

<section class="row" id="houseList">
</section>
</div>
    `