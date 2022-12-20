/*----------------------DISPLAY DELIVERIES------------------------*/
const displayMyDeliveries = (container, deliveries, productOrders) => {
  container.innerHTML = "";

  container.innerHTML += `
  <div class="delivery-container">
  <div class="delivery-container-grid">
  <div>
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



<div class="addDeliveryInfoInput-grid">
<h3>ASSIGN VAN TO DELIVERY</h3>
<div class="delivery-inputs">

<select name="Van ID"
id="addVanDeliveryInfo-vanId"
class="form-control form-control-lg">

</select>

<select name="Delivery ID"
id="addVanDeliveryInfo-deliveryId"
class="form-control form-control-lg">

</select>
</div>

<button
type="button"
id="assignVanToDelivery-submitButton"
class="btn button form-submitButton"
>
ADD VAN TO DELIVERY
</button>
</div>
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
  addEventListenerToAssignVanToDeliveryButton()
  deliveries.forEach((delivery) => {
      assignVanToDeliveryDeliveryId(delivery);
    });
    assignVanToDeliveryVanId();

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

/*----------------------DISPLAY VANS------------------------*/
const displayMyVans = async (container, deliveries) => {
  container.innerHTML = "";

  container.innerHTML += `
  <div class="myDeliveries-deliveries-table">
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">WAREHOUSE</th>
        <th scope="col">DESTINATION</th>
        <th scope="col">DATE</th>
        <th scope="col">#</th>
        <th scope="col">BRAND</th>
        <th scope="col">MODEL</th>
        <th scope="col">CAPACITY</th>
        <th scope="col">TOTAL WEIGHT</th>
        <th scope="col">TOTAL PRICE</th>
      </tr>
    </thead>
    </table>
    </div>
</div>
  `;
 

  deliveries.forEach((delivery) => {
    if(delivery.van !== null){
      createVanElement(delivery);
    }else return
    });

};

const createVanElement = (delivery) => {
  console.log(delivery)
  const tableContainer = document.querySelector(".table");
  const tBodyContainer = document.createElement("tbody");
  tBodyContainer.classList.add("myDeliveries-delivery-info");
  
  tableContainer.appendChild(tBodyContainer);

  tBodyContainer.innerHTML += `
        <tr id="van-table" >
          <th scope="row">${delivery.id}</th>
          <td>${delivery.fromWarehouse}</td>
          <td>${delivery.destination}</td>
          <td>${delivery.date}</td>
          <td>${delivery.van.id}</td>
          <td>${delivery.van.brand}</td>
          <td>${delivery.van.model}</td>
          <td>${delivery.van.capacity}g</td>
          <td>${delivery.totalWeight}g</td>
          <td>${delivery.totalPrice},-</td>
        </tr>
        `;


    return
};
/*----------------------DISPLAY VANS------------------------*/

/*----------------------ASSIGN VAN TO DELIVERY------------------------*/
const assignVanToDeliveryVanId = async () => {
  const vans = await getVans();
 
  const deliveryIdDropdown = document.getElementById("addVanDeliveryInfo-vanId");
  vans.forEach((van) => {
    deliveryIdDropdown.innerHTML += `
    <option value="${van.id}">${van.id}-${van.brand} ${van.model}-${van.capacity}</option>
    `;
  });
 

};

const assignVanToDeliveryDeliveryId = async (delivery) => {
  const deliveryIdDropdown = document.getElementById("addVanDeliveryInfo-deliveryId");
    deliveryIdDropdown.innerHTML += `
        <option value="${delivery.id}">${delivery.id}-${delivery.destination}-${delivery.totalWeight}</option>
        `;
};

const addEventListenerToAssignVanToDeliveryButton = () => {
  const assignVanToDeliveryButton = document.getElementById("assignVanToDelivery-submitButton");
  assignVanToDeliveryButton.addEventListener("click", async () => {
    
    let vanId = document.getElementById("addVanDeliveryInfo-vanId").value;
    let deliveryId = document.getElementById("addVanDeliveryInfo-deliveryId").value;

      const response = await postDeliveryToVan(vanId, deliveryId);
  
  showDeliveries(container, displayMyDeliveries);
  }
)}
/*----------------------ASSIGN VAN TO DELIVERY------------------------*/