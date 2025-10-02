// script.js
const products = [
    {id:1, name:"Espresso", price:5.00},
    {id:2, name:"Cappuccino", price:6.00},
    {id:3, name:"Latte", price:6.50}
];

function loadProducts() {
    const grid = document.getElementById('products-grid') || document.getElementById('featured-products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `<h3>${p.name}</h3><p>$${p.price.toFixed(2)}</p><button class="cta-button">Add to Cart</button>`;
        grid.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', loadProducts);