
//firebase configuration
//const firebaseConfig = {
  //apiKey: "AIzaSyCZpnwE3D__sXETQjyEt6-hintt5tD_ZbI",
  //authDomain: "blossom-bloom.firebaseapp.com",
  //projectId: "blossom-bloom",
  //storageBucket: "blossom-bloom.appspot.com",
  //messagingSenderId: "380676485684",
  //appId: "1:380676485684:web:052774e56c2a79a56a9061"
//};

//initializing firebase
//firebase.initializeApp(firebaseConfig);
//const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-now');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Load stored cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    storedCart.forEach(item => addItemToCart(item.name, item.price, false));
    updateTotalPrice();

    // Add event listeners to "Buy Now" buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.getAttribute('data-item');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            addItemToCart(itemName, itemPrice, true);
        });
    });

    //document.getElementById('buy').addEventListener('click', () => {
        //purchaseItems();
    //});

    function addItemToCart(itemName, itemPrice, updateStorage) {
        const listItem = document.createElement('li');
        listItem.classList.add('cart-items');
        listItem.innerHTML = `${itemName} - KES ${itemPrice} <button class="remove-item">Remove</button>`;
        listItem.querySelector('.remove-item').addEventListener('click', () => {
            removeItemFromCart(listItem, itemPrice);
        });
        cartItems.appendChild(listItem);
        totalPrice += itemPrice;
        updateTotalPrice();
        if (updateStorage) {
            updateLocalStorage();
        }
    }

    function removeItemFromCart(listItem, itemPrice) {
        cartItems.removeChild(listItem);
        totalPrice -= itemPrice;
        updateTotalPrice();
        updateLocalStorage();
    }

    function updateTotalPrice() {
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function updateLocalStorage() {
        const items = Array.from(cartItems.children).map(item => {
            const [name, price] = item.textContent.split(' - KES ');
            return { name, price: parseFloat(price) };
        });
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    function purchaseItems() {
        const items = Array.from(cartItems.children).map(item => {
            const [name, price] = item.textContent.split(' - KES ');
            return { name, price: parseFloat(price) };
            
});
    

//save to firebase
//const newPurchaseRef = firebase.database().ref('purchases').push();
        //newPurchaseRef.set({
            //items: items,
            //total: totalPrice
        //}).then(() => {
            //alert('Purchase successful!');
            //cartItems.innerHTML = '';
            //totalPrice = 0;
            //updateTotalPrice();
            //localStorage.removeItem('cartItems');
        //}).catch(error => {
            //console.error('Error saving purchase: ', error);
        //});
    }
});
