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

async function getVans() {
  const setting = {
    method: "GET",
  };
  const vans = await makeRequest(BASE_URL + "/van", setting);
  return vans;
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

async function postDeliveryToVan(vanId, deliveryId) {
const settings = {
  method: "POST",
}
return await makeRequest(BASE_URL + "/delivery/add/vanId/" + vanId + "/deliveryId/" + deliveryId, settings);
}
/*------------------------------POST------------------------------*/
