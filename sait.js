// Ждем полной загрузки страницы (Практическая 10)
window.onload = function() {
    // Находим все кнопки добавления по классу (Практическая 10)
    var buttons = document.getElementsByClassName("add-to-cart");

    // Используем обычный цикл for (Практическая 8), а не forEach
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            // Получаем данные из data-атрибутов HTML
            var id = this.getAttribute("data-id");
            var name = this.getAttribute("data-name");
            var price = parseInt(this.getAttribute("data-price")); // parseInt из Практической 8
            var image = this.getAttribute("data-image");

            addToCart(id, name, price, image);
        });
    }
};

// Функция добавления товара (Практическая 8)
function addToCart(id, name, price, image) {
    var cartText = localStorage.getItem("cart");
    var cart = [];

    // Если корзина не пустая, преобразуем строку обратно в массив
    if (cartText !== null) {
        cart = JSON.parse(cartText);
    }

    var found = false;

    // Ищем товар в корзине с помощью цикла for (Практическая 8)
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === id) {
            cart[i].quantity = cart[i].quantity + 1;
            found = true;
            break; // Прерываем цикл, если нашли (Практическая 9)
        }
    }

    // Если товар не найден, создаем новый объект и добавляем в массив (Практическая 8)
    if (found === false) {
        var newItem = {
            id: id,
            name: name,
            price: price,
            image: image,
            quantity: 1
        };
        cart.push(newItem); // Метод push из Практической 8
    }

    // Сохраняем массив обратно в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Товар " + name + " добавлен в корзину!"); // alert из Практической 7
}