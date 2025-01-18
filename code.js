let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let listProduct = [
    {

        "id":1,
        "name":"Vanilla Bubble Tea",
        "price": 6.79,
        "image": "boba1.png" 
    }, 
    {
            
        "id":2,
        "name":"Strawberry Bubble Tea",
        "price": 6.79,
        "image": "boba2.png" 
    },
    {  
            
        "id":3,
        "name":"Chocolate Bubble Tea",
        "price": 6.79,
        "image": "boba3.png" 
    },        
    {
                
        "id":4,
        "name":"Creamy Bubble Tea",
        "price": 6.79,
        "image": "boba4.png" 
    }


];
let carts = JSON.parse(localStorage.getItem('carts'))|| [];
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')

});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
});

const addDataToHTML = () =>{
    listProductHTML.innerHTML ='';
    if (listProduct.length > 0){
        listProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('bobaDrink');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML= `<img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <button class="addCart">
        Add To Cart
        </button>`;
        listProductHTML.appendChild(newProduct);
    })
    }
}
listProductHTML.addEventListener('click',(event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});
const addToCart = (product_id) =>{
    let positionThisProductInCart =  carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
        console.log(carts);
    }else if (positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity:1
        });
    }else{
    carts[positionThisProductInCart].quantity += 1;
    }
    localStorage.setItem('carts',JSON.stringify(carts));
    addCartToHTML();
    
}

const addCartToHTML = () => {
    listCartHTML.innerHTML =  '';
    let totalQuantity = 0;
    let totalCost = 0;
    if(carts.length > 0){
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('bobaDrink');
            newCart.dataset.id = cart.product_id
            let positionProduct = listProduct.findIndex((value) => value.id == cart.product_id);
            let info = listProduct[positionProduct];
            newCart.innerHTML = `
        
<div class="image">
    <img src="${info.image}" alt="" ">
</div>
<div class="name">
${info.name}
    
</div>
<div class="totalPrice">
    $${info.price * cart.quantity}
</div>
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

localStorage.setItem('totalCost',totalCost.toFixed(2));
};

// THIS WHOLE THING I HADE TO COPY AND PASTE FROM CHATGBT SINCE IT WAS NOT WORKING IT LITERALLY LOOKS THE SAME ONE I JUST TYPED OUT  SMH  :(.
// Correct closing of the function

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id; // Correct parent element to retrieve product_id
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantity(product_id, type); // Move changeQuantity call inside the if block
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
    localStorage.setItem('carts', JSON.stringify(carts)); // Save cart data to localStorage
    addCartToHTML(); // Update the cart display
};


// THE CHATGBT STOPS 


const initApp = () =>{
        addDataToHTML();
        addCartToHTML();

    };

    initApp();