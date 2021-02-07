const navburger = document.querySelector('.navbar-burger');
const navMenu = document.querySelector('.navbar-menu')


navburger.addEventListener('click', () => {
    navMenu.classList.toggle('is-active')
});

const cartItems = document.querySelectorAll('.cart-items');
cartItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            e.target.parentElement.parentElement.remove()
        }
        updateCartTotal();
    })

});



const addToCartClicked = (event) => {
    let button = event.target
    let shopItem = button.parentElement.parentElement.parentElement
    let title = shopItem.querySelector('.item-name').innerText
    let price = shopItem.querySelector('.item-price').innerText
    let imageSrc = shopItem.querySelector('img')
    let src = imageSrc.getAttribute('src')
        // console.log(title, price, src)
    updateCartItems(title, price, src)
}

const updateCartItems = (title, price, src) => {
    const cartItems = document.querySelector(".cart-items")
    console.log(cartItems)
    let cartRoww = document.createElement('div')
    let cartItemNames = cartItems.querySelectorAll('.cart-item-title')

    for (let itemCart of cartItemNames) {
        if (itemCart.innerText === title) {
            alert('Item Already in Cart')
            return
        }
    }

    cartRoww.innerHTML = `
    <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${src}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>
    `

    const quantityChanged = (event) => {
        let input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
    };

    cartItems.append(cartRoww)

    let quantityInputs = document.querySelectorAll(".cart-quantity-input");
    quantityInputs.forEach((input) => {
        input.addEventListener("change", quantityChanged);
    });



    updateCartTotal()

}


const purchase = (event) => {
    let purchase = event.target
    const cartItems = document.querySelector(".cart-items");
    alert('Thanks for your purchase')
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}
const purchaseClicked = document.querySelector(".btn-purchase");
purchaseClicked.addEventListener("click", purchase);



let addToCart = document.querySelectorAll(".add-to-cart");
addToCart.forEach((button) => {
    button.addEventListener("click", addToCartClicked);
});

const cartTotal = document.querySelector('.cart-total-price');
const updateCartTotal = () => {
    let cartItemsContainer = document.querySelector('.cart-items')
    let cartRows = cartItemsContainer.querySelectorAll('.cart-row')
    let Total = 0
    cartRows.forEach((row) => {
        let cartPrice = row.querySelector('.cart-price');
        let cartQuantity = row.querySelector('.cart-quantity-input');
        let actualPrice = parseFloat(cartPrice.textContent.replace('$', ""));
        let actualQuantity = cartQuantity.value;
        Total += actualPrice * actualQuantity;
        return Total;
    });
    cartTotal.innerText = "$" + Math.round(Total * 100) / 100;
};