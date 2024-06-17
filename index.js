document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    const products = [
        { id: 1, name: 'Product 1', price: 10.00 },
        { id: 2, name: 'Product 2', price: 20.00 },
        { id: 3, name: 'Product 3', price: 30.00 },
        { id: 4, name: 'Product 4', price: 40.00 },
        { id: 5, name: 'Product 5', price: 50.00 },
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayProducts() {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    function displayCart() {
        cartList.innerHTML = '';
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartList.appendChild(cartItemDiv);
        });
        updateTotal();
    }

    function addToCart(id) {
        const product = products.find(p => p.id === id);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
    }

    // Initialize app
    displayProducts();
    displayCart();

    // Expose functions to global scope
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
});