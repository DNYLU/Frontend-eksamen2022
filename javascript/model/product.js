showProducts(container, displayProducts); //Temporary homepage
function displayProducts(container, products) {
    console.log(products)
  container.innerHTML = "";

  const productContainer = document.createElement("div");
  productContainer.classList.add("product-container");
  const productContainerGrid = document.createElement("div");
  productContainerGrid.classList.add("product-container-grid");

  //SEARCH BAR
  container.appendChild(productContainer);
  productContainer.innerHTML = `
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
  container.appendChild(productContainerGrid);

  products.forEach((product) => {
    productContainerGrid.appendChild(createProductElement(product));
  });

  //Eventlisteners
  addEventListenerToSubmitProductButton();
  addEventListenerToSearchProductButton();
}

//Create product element
const createProductElement = (product) => {
  const productElement = document.createElement("div");
  productElement.classList.add("product-element");
  productElement.innerHTML = `
    <div class="product-element-info">
    <h2>${product.name}</h2>
    <p class="product-price">
      ${product.price}<small class="product-info-tags">,-</small>
    </p>
    <p class="product-price">
      ${product.weight}<small class="product-info-tags">g</small>
    </p>
  </div>
  <img class="navBarImage" src="images/product.png" alt="image"" />
    `;
  return productElement;
};

/*------------------------------EVENTLISTENERS------------------------------*/
//Submit product button
const addEventListenerToSubmitProductButton = () => {
  const addProductButton = document.getElementById(
    "createProduct-submitButton"
  );
  addProductButton.addEventListener("click", async() => {
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
    const searchProductButton = document.getElementById("product-searchbar-button");
    searchProductButton.addEventListener("click", async() => {
        const name = document.getElementById("product-searchbar-input").value;
        await showProductByName(container, displayProducts, name);
       
    });
};

/*------------------------------EVENTLISTENERS------------------------------*/
