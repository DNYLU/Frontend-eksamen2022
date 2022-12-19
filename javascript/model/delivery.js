
/*----------------------DISPLAY DELIVERIES------------------------*/
const displayMyDeliveries = (container, deliveries, productOrders) => {
  container.innerHTML = "";

  container.innerHTML += `
  <div class="delivery-container">
  <div class="delivery-container-grid">
  <div class="addDeliveryInfoInput-grid">


    <h2>ADD DELIVERY INFO</h2>
    <div class="delivery-inputs">
  <input
  type="text"
  id="addDeliveryInfo-destination"
  class="form-control form-control-lg"
  placeholder="Enter address"
  />
  <select name="Warehouse"
  id="addDeliveryInfo-warehouse"
  class="form-control form-control-lg">
  <option value="W1">Warehouse 1</option>
  <option value="W2">Warehouse 2</option>
  <option value="W3">Warehouse 3</option>
</select>
  <input
  type="date"
  id="addDeliveryInfo-date"
  class="form-control form-control-lg"
  placeholder="Last Name"
  />
  </div>
  
  <button
  type="button"
  id="addDeliveryInfo-submitButton"
  class="btn button form-submitButton"
>
  ADD DELIVERY
</button>
</div>


  <div class="myDeliveries-deliveries-table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">WAREHOUSE</th>
            <th scope="col">DESTINATION</th>
            <th scope="col">DATE</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        </table>
        </div>

    </div>
</div>
  `;
  addLoopToMyDeliveries(deliveries)


  //Eventlisteners
  postDeliverySubmitButton();
}

//Loop through deliveries
const addLoopToMyDeliveries = (deliveries) => {
    deliveries.forEach((delivery) => {
        createDeliveryElement(delivery);
        addEventListenerToShowButton(delivery);
      });
    }

    //Create delivery element
const createDeliveryElement = (delivery) => {
const tableContainer = document.querySelector(".table");
  const tBodyContainer = document.createElement("tbody");
  tBodyContainer.classList.add("myDeliveries-delivery-info");
  
  tableContainer.appendChild(tBodyContainer);

  tBodyContainer.innerHTML += `
        <tr>
          <th scope="row">${delivery.id}</th>
          <td>${delivery.fromWarehouse}</td>
          <td>${delivery.destination}</td>
          <td>${delivery.date}</td>
          <td id=display-button-${delivery.id} class="myDeliveries-delete-button">SHOW ORDERS</td>
        </tr>
        `;
    return
};


const addEventListenerToShowButton = (delivery) => {
    $(`#display-button-${delivery.id}`).click(function () {
        displayProductOrder(delivery.id);
    });
};


/*----------------------DISPLAY DELIVERIES------------------------*/


/*-------------------------ADD DELIVERIES-------------------------*/
const postDeliverySubmitButton = () => {
const addDeliveryInfoSubmitButton = document.getElementById('addDeliveryInfo-submitButton');
addDeliveryInfoSubmitButton.addEventListener('click', async() => {
const delivery={
    destination: document.getElementById('addDeliveryInfo-destination').value,
    fromWarehouse: document.getElementById('addDeliveryInfo-warehouse').value,
    date: document.getElementById('addDeliveryInfo-date').value
}

await postDeliveries(delivery);

showDeliveries(container, displayMyDeliveries);
});

};
/*-------------------------ADD DELIVERIES-------------------------*/