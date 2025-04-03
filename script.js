// // Theme Management
// class ThemeManager {
//     constructor() {
//         this.themeToggle = document.querySelector('.theme-toggle');
//         this.body = document.body;
//         this.icon = this.themeToggle.querySelector('i');
//         this.init();
//     }

//     init() {
//         const savedTheme = localStorage.getItem('theme');
//         if (savedTheme) {
//             this.body.classList.add(savedTheme);
//             this.updateIcon(savedTheme);
//         }

//         this.themeToggle.addEventListener('click', () => {
//             this.body.classList.toggle('dark-mode');
//             const isDarkMode = this.body.classList.contains('dark-mode');
//             localStorage.setItem('theme', isDarkMode ? 'dark-mode' : '');
//             this.updateIcon(isDarkMode);
//         });
//     }

//     updateIcon(isDarkMode) {
//         this.icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
//     }
// }

// // Cart Management
// class CartManager {
//     constructor() {
//         this.cart = JSON.parse(localStorage.getItem('cart')) || [];
//         this.cartCount = document.querySelector('.cart-count');
//         this.init();
//     }

//     init() {
//         this.updateCartCount();
//         this.setupCartListeners();
//     }

//     setupCartListeners() {
//         document.querySelector('.nav-cart').addEventListener('click', () => {
//             this.toggleCart();
//         });
//     }

//     addToCart(product) {
//         const existingItem = this.cart.find(item => item.id === product.id);
//         if (existingItem) {
//             existingItem.quantity += 1;
//         } else {
//             this.cart.push({ ...product, quantity: 1 });
//         }
//         this.saveCart();
//         this.updateCartCount();
//         this.showNotification('Item added to cart');
//     }

//     removeFromCart(productId) {
//         this.cart = this.cart.filter(item => item.id !== productId);
//         this.saveCart();
//         this.updateCartCount();
//         this.showNotification('Item removed from cart');
//     }

//     updateQuantity(productId, quantity) {
//         const item = this.cart.find(item => item.id === productId);
//         if (item) {
//             item.quantity = Math.max(1, quantity);
//             this.saveCart();
//             this.updateCartCount();
//         }
//     }

//     saveCart() {
//         localStorage.setItem('cart', JSON.stringify(this.cart));
//     }

//     updateCartCount() {
//         const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
//         this.cartCount.textContent = totalItems;
//     }

//     toggleCart() {
//         const cartOverlay = document.querySelector('.cart-overlay');
//         cartOverlay.classList.toggle('active');
//         this.renderCart();
//     }

//     renderCart() {
//         const cartContent = document.querySelector('.cart-content');
//         if (this.cart.length === 0) {
//             cartContent.innerHTML = '<p>Your cart is empty</p>';
//             return;
//         }

//         const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
//         cartContent.innerHTML = `
//             <div class="cart-items">
//                 ${this.cart.map(item => `
//                     <div class="cart-item">
//                         <img src="${item.image}" alt="${item.name}">
//                         <div class="item-details">
//                             <h3>${item.name}</h3>
//                             <p>$${item.price}</p>
//                         </div>
//                         <div class="quantity-controls">
//                             <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
//                             <span>${item.quantity}</span>
//                             <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
//                         </div>
//                         <button class="remove-item" onclick="cartManager.removeFromCart(${item.id})">×</button>
//                     </div>
//                 `).join('')}
//             </div>
//             <div class="cart-total">
//                 <h3>Total: $${total.toFixed(2)}</h3>
//                 <button class="checkout-btn">Proceed to Checkout</button>
//             </div>
//         `;
//     }

//     showNotification(message) {
//         const notification = document.createElement('div');
//         notification.className = 'notification';
//         notification.textContent = message;
//         document.body.appendChild(notification);

//         setTimeout(() => {
//             notification.remove();
//         }, 3000);
//     }
// }

// // Search Management
// class SearchManager {
//     constructor() {
//         this.searchInput = document.querySelector('.search-input');
//         this.searchResults = document.querySelector('.search-results');
//         this.init();
//     }

//     init() {
//         this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
//     }

//     async handleSearch(e) {
//         const query = e.target.value.trim();
//         if (query.length < 2) {
//             this.searchResults.style.display = 'none';
//             return;
//         }

//         try {
//             // Simulated API call - replace with actual API endpoint
//             const results = await this.searchProducts(query);
//             this.displayResults(results);
//         } catch (error) {
//             console.error('Search failed:', error);
//         }
//     }

//     async searchProducts(query) {
//         // Simulated API response - replace with actual API call
//         return [
//             { id: 1, name: 'Product 1', price: 99.99 },
//             { id: 2, name: 'Product 2', price: 149.99 },
//             // Add more mock data
//         ];
//     }

//     displayResults(results) {
//         if (results.length === 0) {
//             this.searchResults.innerHTML = '<p>No results found</p>';
//         } else {
//             this.searchResults.innerHTML = results.map(product => `
//                 <div class="search-result-item">
//                     <h4>${product.name}</h4>
//                     <p>$${product.price}</p>
//                 </div>
//             `).join('');
//         }
//         this.searchResults.style.display = 'block';
//     }

//     debounce(func, wait) {
//         let timeout;
//         return function executedFunction(...args) {
//             const later = () => {
//                 clearTimeout(timeout);
//                 func(...args);
//             };
//             clearTimeout(timeout);
//             timeout = setTimeout(later, wait);
//         };
//     }
// }

// // Initialize all managers
// const themeManager = new ThemeManager();
// const cartManager = new CartManager();
// const searchManager = new SearchManager();

// // Close cart when clicking outside
// document.addEventListener('click', (e) => {
//     const cartOverlay = document.querySelector('.cart-overlay');
//     const cartButton = document.querySelector('.nav-cart');
    
//     if (cartOverlay.classList.contains('active') && 
//         !cartOverlay.contains(e.target) && 
//         !cartButton.contains(e.target)) {
//         cartOverlay.classList.remove('active');
//     }
// }); 