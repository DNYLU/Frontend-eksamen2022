showProducts(container, displayProducts); //Temporary homepage

function displayProducts(container, products) {
  console.log(products);
  container.innerHTML = "";

  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");
  container.appendChild(productContainer);

  const productContainerSearchGrid = document.createElement("div");
  productContainerSearchGrid.classList.add("product-container-search-grid");
  const productContainerGrid = document.createElement("div");
  productContainerGrid.classList.add("product-container-grid");

  //SEARCH BAR
  productContainer.appendChild(productContainerSearchGrid);
  productContainerSearchGrid.innerHTML += `
    <div class="product-operations">
    <div class="input-group">
          <input
            type="search"
            id="product-searchbar-input"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <button type="button" id="product-searchbar-button" class="btn btn-outline-primary">search</button>
        </div>
              <button class="button product-addButton" id="addProductButton" data-toggle="modal" data-target="#addProductModal">Add product</button>
              </div>
        `;

    //PRODUCTS
    productContainerSearchGrid.appendChild(productContainerGrid);
  
 
 
  displayProductOrderForm(productContainer); //Product order form
  //Eventlisteners
  addEventListenerToSubmitProductButton();
  addEventListenerToSearchProductButton();
  addLoopToProducts(products);
}

//Loop through products
const addLoopToProducts = (products) => {
  products.forEach((product) => {
    createProductElement(product);
    addEventListenerToDeleteProductButton(product);
    addEventListenerToUpdateProductButton(product);
  });
};


//Create product element
const  createProductElement = (product) => {
  const productContainerGrid = document.querySelector(".product-container-grid");
  
  const productElement = document.createElement("div");
  productElement.classList.add("product-element-grid");
  productContainerGrid.appendChild(productElement);

  productElement.innerHTML = `
  <div class="product-element" id="product-id-${product.id}">
    <div class="product-element-info">
    <h2>${product.name}</h2>
    <p class="product-price">
      ${product.price}<small class="product-info-tags">,-</small>
    </p>
    <p class="product-price">
      ${product.weight}<small class="product-info-tags">g</small>
    </p>
    <p class="product-price">
    <small class="product-info-tags">ID: ${product.id}</small>
  </p>
  </div>
  <img class="navBarImage" src="images/product.png" alt="image"" />

    <button class="button product-updateButton product-element-buttons" id="update-button-${product.id}">Edit</button>
    <button class="button product-deleteButton product-element-buttons" id=delete-button-${product.id} >Delete</button>
 
  </div>
    `;
  return productElement;
};

/*------------------------------EVENTLISTENERS------------------------------*/

//Delete product button
const addEventListenerToDeleteProductButton = (product) => {
  $(`#delete-button-${product.id}`).click(async function () {
     await deleteProductById(product.id);
     showProducts(container, displayProducts); 
});
};

//Update product button
const addEventListenerToUpdateProductButton = (product) => {
  $(`#update-button-${product.id}`).click(async function () {
     console.log("update button clicked");
     console.log(product.id)
     const updateForm = document.getElementById(`product-id-${product.id}`);

      updateForm.innerHTML = `
      <div class="product-element-info">
      <input
      type="text"
      id="updateProduct-name"
      class="form-control form-control-lg"
      placeholder="${product.name}"
      />
      <input
      type="number"
      id="updateProduct-price"
      class="form-control form-control-lg"
      placeholder="${product.price},-"
      />
      <input
      type="number"
      id="updateProduct-weight"
      class="form-control form-control-lg"
      placeholder="${product.weight}g"
      />
      <p class="product-price">
      <small class="product-info-tags">ID: ${product.id}</small>
    </p>
    </div>
    <img class="navBarImage" src="images/product.png" alt="image"" />
  
      <button class="button product-updatesubmit-button product-element-buttons" id="update-submit-button-${product.id}">CONFIRM</button>
      <button class="button product-cancel product-element-buttons" id=cancel-button-${product.id} >CANCEL</button>
   
      <div class="product-element-info" id="product-element-info-${product.id}">
      `;

      $(`#update-submit-button-${product.id}`).click(async function () {
        const updatedProduct = {
          name: document.getElementById("updateProduct-name").value,
          price: document.getElementById("updateProduct-price").value,
          weight: document.getElementById("updateProduct-weight").value,
        };
        await patchProduct(updatedProduct, product.id);
        location.reload();
        
      });
      $(`#cancel-button-${product.id}`).click( function () {
        location.reload();
      });
});
};



//Submit product button
const addEventListenerToSubmitProductButton = () => {
  const addProductButton = document.getElementById(
    "createProduct-submitButton"
  );
  addProductButton.addEventListener("click", async () => {
    const product = {
      name: document.getElementById("createProductInput-name").value,
      price: document.getElementById("createProductInput-price").value,
      weight: document.getElementById("createProductInput-weight").value,
    };
    console.log(product);
    console.log(product.name);
    console.log(product.price);
    console.log(product.weight);

    if (product.name === "" || product.price === "" || product.weight === "") {
      alert("Please fill in all fields");
      return;
    }

    await postProduct(product); //Await is needed to make sure the product is posted before the page is reloaded
    location.reload();
  });
};

//Search product button
const addEventListenerToSearchProductButton = () => {
  const searchProductButton = document.getElementById(
    "product-searchbar-button"
  );
  searchProductButton.addEventListener("click", async () => {
    const name = document.getElementById("product-searchbar-input").value;
    await showProductByName(container, displayProducts, name);
  });
};

/*------------------------------EVENTLISTENERS------------------------------*/
