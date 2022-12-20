async function showDeliveries(container, display){
    const deliveries = await getDeliveries();
    display(container, deliveries);
}

async function showVans(container, display){
  const vans = await getVans();
  display(container, vans);
}


document.getElementById("navbar-addDeliveryInfo-button").addEventListener("click", () => {
  console.log("Add delivery info clicked");
  showDeliveries(container, displayMyDeliveries);
});

document.getElementById("navbar-addVanInfo-button").addEventListener("click", () => {
  console.log("Add vans info clicked");
  showDeliveries(container, displayMyVans);
});