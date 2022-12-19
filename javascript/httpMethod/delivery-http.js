/*------------------------------GET------------------------------*/
async function getDeliveries() {
  const setting = {
    method: "GET",
  };
  const deliveries = await makeRequest(BASE_URL + "/delivery", setting);
  return deliveries;
}

async function getDeliveriesById(deliveryId) {
  const setting = {
    method: "GET",
  };
  return await makeRequest(BASE_URL + "/delivery/" + deliveryId, setting);
}

/*------------------------------GET------------------------------*/

/*------------------------------POST------------------------------*/
async function postDeliveries(delivery) {
  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(delivery),
  };
  return await makeRequest(BASE_URL + "/delivery/add", settings);
}
/*------------------------------POST------------------------------*/
