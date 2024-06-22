

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

let productId = getQueryParam("id");
let productcard = document.getElementById("product");
let products = [];
let currentId = productId; 
let response

let xhr = new XMLHttpRequest();
xhr.open("GET", "../products.json");
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
        products = response.product;
        let product = products.find(pro => pro.id == productId);

        if (product) {
            showproduct(product.id);
        } else {
            showproduct(1);
        }
    }
};
xhr.send();

function showproduct(id) {
    let product = products.find(product => product.id == id);
    if (product) {
        productcard.innerHTML = `
            <img src="${product.img}" >
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Price: <span class="bold">${product.price}</span></p>
            <button onclick="addToCart(${product.id})">Add to cart</button>
        `
        console.log(product.id);
    } else {
        productcard.innerHTML = "<p>No product found</p>";
    }
}

function nextproduct() {
    let currentIndex = products.findIndex(product => product.id == currentId);
    currentIndex += 1;
    if (currentIndex >= products.length) {
        currentIndex = 0;
    }
    currentId = products[currentIndex].id;
    showproduct(currentId);
}

function prevproduct() {
    let currentIndex = products.findIndex(product => product.id == currentId);
    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = products.length - 1;
    }
    currentId = products[currentIndex].id;
    showproduct(currentId);

}

document.getElementById("next").addEventListener("click", nextproduct);
document.getElementById("prev").addEventListener("click", prevproduct);


