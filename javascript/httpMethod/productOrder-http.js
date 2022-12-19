/*------------------------------GET------------------------------*/
async function getProductOrders() {
  const setting = {
    method: "GET",
  };
  const productOrders = await makeRequest(BASE_URL + "/productOrder", setting);
  return productOrders;
}

async function getProductOrdersByDeliveryId(deliveryId) {
  const setting = {
    method: "GET",
  };
  return await makeRequest(BASE_URL + "/productOrder/" + deliveryId, setting);
}
/*------------------------------GET------------------------------*/

/*------------------------------POST------------------------------*/
async function postProductOrder(productOrder) {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productOrder),
  };
  return (addedProductOrder = await makeRequest(
    BASE_URL + "/productOrder/add",
    settings
  ));
}
/*------------------------------POST------------------------------*/
