let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProduct = [
    {
        "id": 1,
        "name": "Vanilla Bubble Tea",
        "price": 6.79,
        "image": "boba1.png"
    },
    {
        "id": 2,
        "name": "Strawberry Bubble Tea",
        "price": 6.79,
        "image": "boba2.png"
    },
    {
        "id": 3,
        "name": "Chocolate Bubble Tea",
        "price": 6.79,
        "image": "boba3.png"
    },
    {
        "id": 4,
        "name": "Creamy Bubble Tea",
        "price": 6.79,
        "image": "boba4.png"
    }
];

let carts = JSON.parse(localStorage.getItem('bubbleTeaCarts')) || [];

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
            newProduct.classList.add('bobaDrink');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `<img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
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
    console.log(`Adding product with ID: ${product_id}`); 
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    
    if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
        console.log('Product added to cart:', carts);
    } else {
        
        carts[positionThisProductInCart].quantity += 1;
        console.log('Product quantity updated:', carts);
    }

    localStorage.setItem('bubbleTeaCarts', JSON.stringify(carts)); 
    addCartToHTML(); 
};
/// THIS PART OF THE CODE MAN DID NOT WORK AGAIN I USED CHATGBT TO DEBUGG THE WHOLE THING I THEN ASED WHY IT WAS NOT WORKINF AND IT WAS ISSUES WHICH USING [] WHEN ASSINING THE LIST 
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalCost = 0;

    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('bobaDrink');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProduct.findIndex((value) => value.id == cart.product_id);
            let info = listProduct[positionProduct];

        
            if (info) {
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
            } else {
                console.error(`Product with ID ${cart.product_id} not found in listProduct.`);
            }
        });
    }
    iconCartSpan.innerText = totalQuantity;
    localStorage.setItem('bubbleTeaTotalCost', totalCost.toFixed(2)); // Save total cost to localStorage
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id; // Correct parent element to retrieve product_id
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
    localStorage.setItem('bubbleTeaCarts', JSON.stringify(carts)); // Save updated cart to localStorage
    addCartToHTML(); 
};

const initApp = () => {
    addDataToHTML();
    addCartToHTML(); 
};

initApp();