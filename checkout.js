// checkout.js
const totalCost = localStorage.getItem('totalCost');
const totalAmountElement = document.querySelector('.total-amount');
const backButton = document.querySelector('.back');


if (totalCost){
    totalAmountElement.innerHTML =`<strong>Total Amount:$${totalCost}</strong>`;
}else{
    totalAmountElement.innerHTML = `<strong> No items in cart.</strong>`;
}

backButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirect back to the shop
});

displayTotalAmount();
