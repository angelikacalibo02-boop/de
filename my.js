// Sample Products Data (In a real application, this would come from a backend/database)
 const products = [
     {
         id: 1,
         name: 'Ethiopian Yirgacheffe',
         category: 'beans',
         roast: 'light',
         price: 18.00,
         image: '',
         description: 'Bright and floral with notes of lemon and jasmine. A delightful single-origin.',
         origin: 'Ethiopia',
         flavor: 'Citrus, Floral, Bright',
         grind_options: ['Whole Bean', 'Espresso', 'Drip', 'French Press']
     },
     {
         id: 2,
         name: 'Colombia Supremo',
         category: 'beans',
         roast: 'medium',
         price: 16.50,
         image: '',
         description: 'Well-balanced with chocolatey notes and a nutty finish. Smooth and rich.',
         origin: 'Colombia',
         flavor: 'Chocolate, Nutty, Smooth',
         grind_options: ['Whole Bean', 'Espresso', 'Drip']
     },
     {
         id: 3,
         name: 'Dark Roast House Blend',
         category: 'beans',
         roast: 'dark',
         price: 15.00,
         image: '',
         description: 'Bold and smoky with low acidity. Perfect for a strong morning cup.',
         origin: 'Blend',
         flavor: 'Bold, Smoky, Low Acidity',
         grind_options: ['Whole Bean', 'Drip', 'French Press']
     },
     {
         id: 4,
         name: 'French Press Brewer',
         category: 'gear',
         roast: 'N/A', // Not applicable for gear
         price: 35.00,
         image: '',
         description: 'Classic French press for rich, full-bodied coffee.',
         origin: 'N/A',
         flavor: 'N/A',
         grind_options: ['N/A']
     },
     {
         id: 5,
         name: 'Pour-Over Kit',
         category: 'gear',
         roast: 'N/A',
         price: 45.00,
         image: '',
         description: 'Complete kit for making delicious pour-over coffee.',
         origin: 'N/A',
         flavor: 'N/A',
         grind_options: ['N/A']
     },
     {
         id: 6,
         name: 'Bean & Brew Mug',
         category: 'merchandise',
         roast: 'N/A',
         price: 12.00,
         image: '',
         description: 'Ceramic mug with our signature logo. Perfect for your daily brew.',
         origin: 'N/A',
         flavor: 'N/A',
         grind_options: ['N/A']
     },
     {
         id: 7,
         name: 'Espresso Machine',
         category: 'gear',
         roast: 'N/A',
         price: 299.00,
         image: '',
         description: 'Compact and powerful espresso machine for home use.',
         origin: 'N/A',
         flavor: 'N/A',
         grind_options: ['N/A']
     },
     {
         id: 8,
         name: 'Guatemala Antigua',
         category: 'beans',
         roast: 'medium',
         price: 17.50,
         image: '',
         description: 'Rich, chocolatey, and smoky with a hint of spice.',
         origin: 'Guatemala',
         flavor: 'Chocolate, Spice, Smoky',
         grind_options: ['Whole Bean', 'Espresso', 'Drip']
     }
 ];
 // --- Cart Management ---
 let cart = JSON.parse(localStorage.getItem('cart')) || [];
 function updateCartCount() {
     const count = cart.reduce((sum, item) => sum + item.quantity, 0);
     document.querySelectorAll('#cart-count').forEach(el => {
         el.textContent = count;
     });
 }
 function addToCart(productId, quantity = 1, grind = 'Whole Bean') {
     const product = products.find(p => p.id === productId);
     if (!product) {
         console.error('Product not found:', productId);
         return;
     }
     // Check if item already exists in cart with the same grind option
     const existingItemIndex = cart.findIndex(item => item.id === productId && item.grind === grind);
     if (existingItemIndex > -1) {
         cart[existingItemIndex].quantity += quantity;
     } else {
         cart.push({ ...product, quantity: quantity, grind: grind });
     }
     localStorage.setItem('cart', JSON.stringify(cart));
     updateCartCount();
     alert(`${product.name} (Grind: ${grind}) added to cart! Total in cart: ${cart.find(item => item.id === productId && item.grind === grind).quantity}`);
 }
 function removeFromCart(productId, grindOption) {
     cart = cart.filter(item => !(item.id === productId && item.grind === grindOption));
     localStorage.setItem('cart', JSON.stringify(cart));
     updateCartCount();
     if (document.getElementById('cart-items-container')) {
         loadCart(); // Reload cart if on cart page
     }
 }
 function updateCartQuantity(productId, grindOption, newQuantity) {
     const itemIndex = cart.findIndex(item => item.id === productId && item.grind === grindOption);
     if (itemIndex > -1) {
         if (newQuantity <= 0) {
             removeFromCart(productId, grindOption);
         } else {
             cart[itemIndex].quantity = newQuantity;
         }
     }
     localStorage.setItem('cart', JSON.stringify(cart));
     updateCartCount();
     if (document.getElementById('cart-items-container')) {
         loadCart(); //
     }
    }