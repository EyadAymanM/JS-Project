let jsObj;
var addProductToCart;
let maindiv = document.getElementById("mainDiv");

var cartsContainer = document.querySelector(".carts-items");
var cartsItems = document.querySelector(".carts-items div");
var badge = document.querySelector(".badge");
var cartIcon = document.querySelector(".cart-icon");
// console.log(maindiv);

// category title
let drinksCatName = document.createElement("p");
let chipsSnacksName = document.createElement("p");
let chocolatecookiesName = document.createElement("p");
let FreezersName = document.createElement("p");
drinksCatName.classList.add("catTitle");
chipsSnacksName.classList.add("catTitle");
chocolatecookiesName.classList.add("catTitle");
FreezersName.classList.add("catTitle");

// category data
let drinksCategory = document.createElement("div");
let chipsSnacksCategory = document.createElement("div");
let chocolatecookiesCategory = document.createElement("div");
let FreezersCategory = document.createElement("div");
drinksCategory.classList.add("flex");
chipsSnacksCategory.classList.add("flex");
chocolatecookiesCategory.classList.add("flex");
FreezersCategory.classList.add("flex");

let myReq = new XMLHttpRequest();
myReq.open("GET", "../products.json");
myReq.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    jsObj = JSON.parse(this.responseText);
    for (let i = 0; i < jsObj.product.length; i++) {
      let container = document.createElement("div");
      container.classList.add("container");

      let img = document.createElement("img");
      let description = document.createElement("p");
      let title = document.createElement("p");
      let price = document.createElement("p");
      let categoryName = document.createElement("p");

      img.src = jsObj.product[i].img;
      description.innerHTML = `<span class='spanTitle'>Description:</span> ${jsObj.product[i].description}`;
      title.innerHTML = `<span class='spanTitle'>Product Name:</span> ${jsObj.product[i].title}`;
      price.innerHTML = `<span class='spanTitle'>Price:</span> ${jsObj.product[i].price}`;
      categoryName.innerHTML = `<span class='spanTitle'>Category Name:</span> ${jsObj.product[i].gategory}`;

      var addToCartBtn = document.createElement("button");
      addToCartBtn.className = "addToCart";
      addToCartBtn.innerHTML = "Add to Cart";

      var viewDetailsBtn = document.createElement("button");
      viewDetailsBtn.className = "addToCart";
      viewDetailsBtn.innerHTML = "View Details";

      container.appendChild(img);
      // container.appendChild(categoryName);
      container.appendChild(title);
      container.appendChild(price);
      // container.appendChild(description);
      container.appendChild(addToCartBtn);
      container.appendChild(viewDetailsBtn);

      viewDetailsBtn.addEventListener("click", function () {
        window.location.href = `../products/product.html?id=${jsObj.product[i].id}`;
      });

      if (jsObj.product[i].gategory === "drinks") {
        // container.classList.add("drinks-container");
        drinksCatName.innerHTML = jsObj.product[i].gategory;
        drinksCategory.appendChild(container);
        maindiv.prepend(drinksCatName);
        maindiv.appendChild(drinksCategory);
      }
      if (jsObj.product[i].gategory === "chips&Snacks") {
        // container.classList.add("chips&Snacks-container");
        chipsSnacksName.innerHTML = jsObj.product[i].gategory;
        chipsSnacksCategory.appendChild(container);
        maindiv.appendChild(chipsSnacksName);
        maindiv.appendChild(chipsSnacksCategory);
      }
      if (jsObj.product[i].gategory === " chocolate&cookies") {
        // container.classList.add("chocolate&cookies-container");
        chocolatecookiesName.innerHTML = jsObj.product[i].gategory;
        chocolatecookiesCategory.appendChild(container);
        maindiv.appendChild(chocolatecookiesName);
        maindiv.appendChild(chocolatecookiesCategory);
      }
      if (jsObj.product[i].gategory === " Freezers") {
        // container.classList.add("Freezers-container");
        FreezersName.innerHTML = jsObj.product[i].gategory;
        FreezersCategory.appendChild(container);
        maindiv.appendChild(FreezersName);
        maindiv.appendChild(FreezersCategory);
      }

      addToCartBtn.addEventListener("click", function () {
        addToCart(jsObj.product[i].id);
      });
      // maindiv.appendChild(container);
    }
  }
};
myReq.send();

(function productMenu() {
  addProductToCart = localStorage.getItem("productsCart")
    ? JSON.parse(localStorage.getItem("productsCart"))
    : [];

  if (addProductToCart) {
    addProductToCart.forEach(function (product) {
      cartsItems.innerHTML += `<p>${product.title}</p>`;
    });
    badge.innerHTML = addProductToCart.length;
  }
})();

function addToCart(id) {
  if(!sessionStorage.getItem('user-email')){
    alert('Register to our Store First');
    return
  }
  var chosenItem = jsObj.product.find(function (item) {
    return id === item.id;
  });
  cartsItems.innerHTML += `<p>${chosenItem.title}</p>`;

  addProductToCart.push(chosenItem);
  localStorage.setItem("productsCart", JSON.stringify(addProductToCart));

  badge.innerHTML = addProductToCart.length;
}

function openCart() {
  if (cartsContainer.style.display == "block") {
    cartsContainer.style.display = "none";
  } else {
    cartsContainer.style.display = "block";
  }
}
