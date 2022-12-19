/*------------------------------GET------------------------------*/
async function getProducts() {
    const setting = {
      method: "GET",
    };
    const products = await makeRequest(BASE_URL + "/product", setting);
    return products;
  }
  
  
  async function getProductById(productId) {
    const setting = {
      method: "GET",
    };
    return await makeRequest(BASE_URL + "/product/" + productId, setting);
  }

  async function getProductByName(name){
    const setting = {
        method: "GET",
        };
    return await makeRequest(BASE_URL + "/product/name/" + name, setting);
  }
  
  /*------------------------------GET------------------------------*/
  
  /*------------------------------POST------------------------------*/
  async function postProduct(product) {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    return (addedProduct = await makeRequest(BASE_URL + "/product/add", settings));
  }
  /*------------------------------POST------------------------------*/
  
  /*------------------------------DELETE------------------------------*/
  async function deleteProductById(productId) {
    const setting = {
      method: "DELETE",
    };
    return await makeRequest(BASE_URL + "/product/delete/" + productId, setting);
  }
  /*------------------------------DELETE------------------------------*/
  
  /*------------------------------PATCH------------------------------*/
  async function patchProduct(product, productId) {
    const settings = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    return await makeRequest(BASE_URL + "/product/update/" + productId, settings);
  }
  /*------------------------------PATCH------------------------------*/