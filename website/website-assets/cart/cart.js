
var mainContainer = document.getElementById('main');
var cartContainer = document.getElementById("cart-content");
var quantityValue;
function createCartItem(product) {
          //Create main cart content div
          var cartItem = document.createElement("div");
          cartItem.classList.add("cart-content");

          //image container
          var imageContainer = document.createElement("div");
          imageContainer.classList.add("image-container");
          var img = document.createElement("img");
          img.src = product.img;
          img.id = "prodImg";
          imageContainer.appendChild(img);
          cartItem.appendChild(imageContainer);

          //product name
          var productName = document.createElement("div");
          productName.classList.add("name");
          productName.id = "title";
          productName.textContent = product.title;
          cartItem.appendChild(productName);

          // Quantity controls
          var quantityContainer = document.createElement("div");
          quantityContainer.classList.add("quantity");

          var decreaseBtn = document.createElement("div");
          decreaseBtn.classList.add("arrow");
          decreaseBtn.id = "remove";
          decreaseBtn.innerHTML = "&#10094;";
          quantityContainer.appendChild(decreaseBtn);

          quantityValue = document.createElement("span");
          quantityValue.id = "value";
          quantityValue.classList.add("value");
          quantityValue.textContent = product.quantity;
          quantityContainer.appendChild(quantityValue);

          var increaseBtn = document.createElement("div");
          increaseBtn.classList.add("arrow");
          increaseBtn.id = "add";
          increaseBtn.innerHTML = "&#10095;";
          quantityContainer.appendChild(increaseBtn);

          cartItem.appendChild(quantityContainer);

          // Price
          var price = document.createElement("div");
          price.classList.add("price");
          price.id = "price";
          price.textContent = product.price;
          cartItem.appendChild(price);

          var removeBtn = document.createElement("div");
          removeBtn.classList.add("remove-button");
          removeBtn.innerHTML = "&#10005;";
          removeBtn.addEventListener("click", function () {
                    removeItem(product.id);
                    cartItem.remove()
                    updateTotal()
          })
          cartItem.appendChild(removeBtn);

          cartContainer.appendChild(cartItem);

          decreaseBtn.addEventListener("click", function(){
                    decreaseItemHandler(product.id)                    
          });
          increaseBtn.addEventListener("click", function(){
                    increaseItemHandler(product.id)
          });
}

var totalDiv = document.createElement("div");
totalDiv.classList.add("total");
var h2Element = document.createElement('h2');
h2Element.textContent = 'Total: ';
totalDiv.appendChild(h2Element);
mainContainer.appendChild(totalDiv)



var productsInCart = localStorage.getItem("productsCart");
if (productsInCart) {
          var products = JSON.parse(productsInCart);
          products.forEach(function (product) {
                    createCartItem(product);
          });
          updateTotal()
          
}

function removeItem(id) {
          if (productsInCart) {
                    items = JSON.parse(productsInCart)
                    var updatedItems = items.filter(item => item.id !== id);
                    localStorage.setItem('productsCart', JSON.stringify(updatedItems));
                    productsInCart = JSON.stringify(updatedItems);
          }
          updateTotal()
}



function decreaseItemHandler(id){
          var items = JSON.parse(localStorage.getItem("productsCart"));
          var itemToUpdate = items.find(item => item.id === id);
          if (itemToUpdate && itemToUpdate.quantity > 1){
                    itemToUpdate.quantity--;
                    console.log(itemToUpdate.quantity);
                    localStorage.setItem("productsCart", JSON.stringify(items));
                    updateQuantity(id, itemToUpdate.quantity);
          }
          updateTotal()
}
function increaseItemHandler(id){
          var items = JSON.parse(localStorage.getItem("productsCart"));
          var itemToUpdate = items.find(item => item.id === id);
          if (itemToUpdate) {
                    itemToUpdate.quantity++;
                    localStorage.setItem("productsCart", JSON.stringify(items));
                    updateQuantity(id, itemToUpdate.quantity);
          }
          updateTotal()
}

function updateQuantity(id, quantity){
          var quantityElement = cartContainer.querySelector(`[data-id="${id}"] .value`);
          if (quantityElement){
                    console.log(quantityElement);
                    quantityElement.textContent = quantity;
          }
}

function calculateTotal(){
          var total = 0;
          if (productsInCart){
                    var items = JSON.parse(productsInCart);
                    items.forEach(function(item){
                              var itemTotal = item.price * item.quantity
                              total += itemTotal
                    });
          }
          return total;
}

function updateTotal(){
          var total = calculateTotal();
          h2Element.textContent = 'Total: $' + total.toFixed(2);
}
updateTotal()