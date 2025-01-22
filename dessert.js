document.addEventListener('DOMContentLoaded', () => {
    const listProductHTML = document.querySelector('.listProduct');


    const listProduct = [
        {
            "id": 12,
            "name": "Orange Cake",
            "price": 9.45,
            "image": "cake1.png"
        },
        {
            "id": 16,
            "name": "Strawberry Cake",
            "price": 10.45,
            "image": "cake2.png"
        },
        {
            "id": 20,
            "name": "Plan Cake",
            "price": 11.45,
            "image": "cake3.png"
        },
        {
            "id": 24,
            "name": "Cake",
            "price": 12.45,
            "image": "cake4.png"
        }


    ];



    const addDataToHTML = () => {
        listProductHTML.innerHTML = '';
        if(listProduct.length > 0){
            listProduct.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.classList.add('cake');
                newProduct.dataset.id = product.id;
                newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
};
    addDataToHTML();

});
