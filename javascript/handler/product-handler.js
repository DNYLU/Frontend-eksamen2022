async function showProducts(container, display){
    const products = await getProducts();
    display(container, products);
}

async function showProductByName(container, display, name){
    const products = await getProductByName(name);
    console.log(products)
    display(container, products);
}