async function showDeliveries(container, display){
    const deliveries = await getDeliveries();
    const productOrders = await getProductOrders();
    display(container, deliveries);
}

document.getElementById("navbar-addDeliveryInfo-button").addEventListener("click", () => {
  console.log("Add delivery info clicked");
  showDeliveries(container, displayMyDeliveries);
});