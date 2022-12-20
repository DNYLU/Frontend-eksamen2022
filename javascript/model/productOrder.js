/*----------------------DISPLAY PRODUCT ORDER------------------------*/
const displayProductOrder = async (deliveryId) => { //Called in delivery.js
const productOrders = await getProductOrdersByDeliveryId(deliveryId);
container.innerHTML = "";
  container.innerHTML += `
  <div class="myDeliveries-deliveries-table">
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">PRODUCT</th>
        <th scope="col">QUANTITY</th>
        <th scope="col">DESTINATION</th>
        <th scope="col">WAREHOUSE</th>
        <th scope="col">DATE</th>
        <th scope="col">TOTAL WEIGHT</th>
        <th scope="col">TOTAL PRICE</th>
      </tr>
    </thead>
    </table>
    </div>
</div>
  `;
productOrders.forEach((productOrder) => {
  createProductOrderElement(productOrder);
});
};

const createProductOrderElement = (productOrder) => {
  const tableContainer = document.querySelector(".table");
  const tBodyContainer = document.createElement("tbody");
  tBodyContainer.classList.add("myDeliveries-delivery-info");
  tableContainer.appendChild(tBodyContainer);

  let totalPrice = productOrder.product.price * productOrder.quantity;
  let totalWeight = productOrder.product.weight * productOrder.quantity;

  tBodyContainer.innerHTML += `
  <tr>
    <th scope="row">${productOrder.id}</th>
    <td>${productOrder.product.name}</td>
    <td>${productOrder.quantity}</td>
    <td>${productOrder.delivery.destination}</td>
    <td>${productOrder.delivery.fromWarehouse}</td>
    <td>${productOrder.delivery.date}</td>
    <td>${totalWeight}g</td>
    <td>${totalPrice},-</td>
  </tr>
  `;
return
};

//Form for adding product order
const displayProductOrderForm = (productContainer) => {
  productContainer.innerHTML += `
<div class="productOrder-form">

<h4>PRODUCT ORDERS</h4>
<div class="delivery-inputs">
<input
type="number"
id="addDeliveryInfo-productId"
class="form-control form-control-lg"
placeholder="Product ID"
/>
<input
type="number"
id="addDeliveryInfo-quantity"
class="form-control form-control-lg"
placeholder="Quantity"
/>

<select name="DeliveryId"
id="addDeliveryInfo-id"
class="form-control form-control-lg">
</select>

<button
type="button"
id="calculateProductOrderButton"
class="button"
>
CALCULATE
</button>
</div>

<div id="delivery-stats">

</div>

<button
type="button"
id="addProductOrderButton-submitButton"
class="btn button form-submitButton"
>
ADD DELIVERY
</button>
</div>
</div>
`;
  createDeliveryIdElement();
  addEventListenerToProductElement();
  calculateProductOrderButton();
};

const createDeliveryIdElement = async () => {
  const getAllDeliveries = await getDeliveries();
  const deliveryIdDropdown = document.getElementById("addDeliveryInfo-id");
  getAllDeliveries.forEach((delivery) => {
    deliveryIdDropdown.innerHTML += `
        <option value="${delivery.id}">${delivery.id}-${delivery.destination}</option>
        `;
  });
};
/*----------------------DISPLAY PRODUCT ORDER------------------------*/

/*----------------------POST PRODUCT ORDER------------------------*/

const addEventListenerToProductElement = () => {
  const productOrderFormButton = document.getElementById(
    "addProductOrderButton-submitButton"
  );

  productOrderFormButton.addEventListener("click", async() => {
    const productOrder ={
        deliveryId: document.getElementById("addDeliveryInfo-id").value,
        productId: document.getElementById("addDeliveryInfo-productId").value,
        quantity: document.getElementById("addDeliveryInfo-quantity").value,
    }

    await postProductOrder(productOrder);
    alert("Product Order added");
    location.reload();
  });
};
/*----------------------POST PRODUCT ORDER------------------------*/

//?jQuery har jeg ikke kunne få til at fungere her. Idet har jeg desværre brugt en "cheap" løsning til opgaven
const calculateProductOrderButton = () =>{ 
    document.getElementById("calculateProductOrderButton").addEventListener("click", async () => {
       const product = await getProductById(document.getElementById("addDeliveryInfo-productId").value);
        const deliveryStats = document.getElementById("delivery-stats");
        let quantity = document.getElementById("addDeliveryInfo-quantity").value;
        console.log(product)
        let totalPrice = quantity * product.price;
        let totalWeight = quantity * product.weight;
      
        deliveryStats.innerHTML=`
        <h3>Total Price: ${totalPrice},-</h3>
        <h3>Total Weight: ${totalWeight}g</h3>
        `;
    })
}