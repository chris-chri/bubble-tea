let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProduct = [
    {
        "id": 5,
        "name": "Milk Chocolate",
        "price": 1.45,
        "image": "choco1.png"
    },
    {
        "id": 6,
        "name": "Dark Chocolate",
        "price": 1.45,
        "image": "choco2.png"
    },
    {
        "id": 7,
        "name": "White Chocolate",
        "price": 1.45,
        "image": "choco3.png"
    },
    {
        "id": 8,
        "name": "Oreo Chocolate",
        "price": 1.45,
        "image": "choco4.png"
    }
];

let carts = JSON.parse(localStorage.getItem('chocolateCarts')) || [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProduct.length > 0) {
        listProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('chocolate');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="prince">$${product.price}</div>
            <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity += 1;
    }
    localStorage.setItem('chocolateCarts', JSON.stringify(carts));
    addCartToHTML();
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalCost = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('chocolate');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProduct.findIndex((value) => value.id == cart.product_id);
            let info = listProduct[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">${info.name}</div>
            <div class="totalPrice">$${info.price * cart.quantity}</div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${cart.quantity}</span>
                <span class="plus">></span>
            </div>`;
            listCartHTML.appendChild(newCart);
            totalCost += info.price * cart.quantity;
        });
    }
    iconCartSpan.innerText = totalQuantity;
    localStorage.setItem('chocolateTotalCost', totalCost.toFixed(2));
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantity(product_id, type);
    }
});

const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity += 1;
                break;
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    localStorage.setItem('chocolateCarts', JSON.stringify(carts));
    addCartToHTML();
};

const initApp = () => {
    addDataToHTML();
    addCartToHTML();
};

initApp();
