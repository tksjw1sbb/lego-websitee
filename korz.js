window.onload = function() {
    renderCart();
};

function renderCart() {
    var container = document.getElementById("cart-container");
    var totalElement = document.getElementById("cart-total");
    var cartText = localStorage.getItem("cart");
    var cart = [];

    if (cartText !== null) {
        cart = JSON.parse(cartText);
    }


    container.innerHTML = "";
    var total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p class='empty-cart'>Корзина пуста</p>";
        totalElement.innerHTML = "Итого: 0 ₽";
        return; 
    }

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        total = total + (item.price * item.quantity);

        var itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        var img = document.createElement("img");
        img.src = item.image;
        img.className = "cart-item-img";

        var infoDiv = document.createElement("div");
        infoDiv.className = "cart-item-info";

        var title = document.createElement("h3");
        title.className = "cart-item-title";
        title.innerHTML = item.name; 
        var priceP = document.createElement("p");
        priceP.className = "cart-item-price";
        priceP.innerHTML = "Цена: " + item.price + " ₽";

        infoDiv.appendChild(title);
        infoDiv.appendChild(priceP);

        var actionsDiv = document.createElement("div");
        actionsDiv.className = "cart-item-actions";


        var btnMinus = document.createElement("button");
        btnMinus.innerHTML = "-";
        btnMinus.className = "qty-btn";

        btnMinus.onclick = (function(index) {
            return function() { changeQuantity(index, -1); };
        })(i);


        var qtySpan = document.createElement("span");
        qtySpan.className = "qty-display";
        qtySpan.innerHTML = item.quantity;

     
        var btnPlus = document.createElement("button");
        btnPlus.innerHTML = "+";
        btnPlus.className = "qty-btn";
        btnPlus.onclick = (function(index) {
            return function() { changeQuantity(index, 1); };
        })(i);


        var btnRemove = document.createElement("button");
        btnRemove.innerHTML = "Удалить";
        btnRemove.className = "remove-btn";
        btnRemove.onclick = (function(index) {
            return function() { removeItem(index); };
        })(i);


        actionsDiv.appendChild(btnMinus);
        actionsDiv.appendChild(qtySpan);
        actionsDiv.appendChild(btnPlus);
        actionsDiv.appendChild(btnRemove);

        itemDiv.appendChild(img);
        itemDiv.appendChild(infoDiv);
        itemDiv.appendChild(actionsDiv);

        container.appendChild(itemDiv);
    }

    totalElement.innerHTML = "ИТОГО: " + total + " ₽ "  +
        "<a href='oform.html' class='checkout-btn'>Оформить заказ</a>";   
}

function changeQuantity(index, change) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart[index].quantity = cart[index].quantity + change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeItem(index) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

