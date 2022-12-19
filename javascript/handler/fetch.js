const BASE_URL = "http://localhost:8080/api";

// This is the base container for the page
const container = document.querySelector(".container");

// This makes the request to the server
const makeRequest = async (url, settings) => {
  const response = await fetch(url, settings);
  const data = await response.json();
  return data;
};

//HOMEPAGE for now
document.getElementById("homepage-img").addEventListener("click", () => {
  console.log("Homepage clicked");
  showProducts(container, displayProducts);
});