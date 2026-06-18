
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("orderForm");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            let phone = document.getElementById("num").value.trim();
            let email = document.getElementById("email").value.trim();
            let address = document.getElementById("address").value.trim();

            if (phone === "" ||  email === "" || address === "") {
                alert("Заполните все поля перед оформлением заказа!");
                return;
            }

            // Проверка номера телефона
            let digits = phone.replace(/\D/g, "");

            if (digits.length < 11) {
                alert("Введите корректный номер телефона!");
                return;
            }

            // Проверка email
            if (!email.includes("@") || !email.includes(".")) {
                alert("Введите корректный email!");
                return;
            }

            try {
                const response = await fetch(
                    "https://formspree.io/f/meewwadg",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            phone: phone,
                            email: email,
                            address: address
                        })
                    }
                );

                if (response.ok) {
                    alert("Ваш заказ успешно оформлен!");

                    document.getElementById("num").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("address").value = "";
                } else {
                    alert("Ошибка отправки заказа.");
                }

            } catch (error) {
                console.error(error);
                alert("Ошибка соединения с сервером.");
            }
        });
    }

    // Маска телефона
    const phoneInput = document.getElementById("num");

    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            let numbers = this.value.replace(/\D/g, "");

            if (numbers.startsWith("8")) {
                numbers = "7" + numbers.slice(1);
            }

            if (!numbers.startsWith("7")) {
                numbers = "7" + numbers;
            }

            numbers = numbers.substring(0, 11);

            let result = "+7";

            if (numbers.length > 1) {
                result += " (" + numbers.substring(1, 4);
            }

            if (numbers.length >= 4) {
                result += ")";
            }

            if (numbers.length > 4) {
                result += " " + numbers.substring(4, 7);
            }

            if (numbers.length > 7) {
                result += "-" + numbers.substring(7, 9);
            }

            if (numbers.length > 9) {
                result += "-" + numbers.substring(9, 11);
            }

            this.value = result;
        });
    }

});