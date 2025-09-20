// Wishlist Functionality
const wishlist = document.getElementById('wishlist-items');
const totalPriceDisplay = document.getElementById('total-price');
const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
const clearWishlistButton = document.getElementById('clear-wishlist-btn');

let totalPrice = 0;

addToWishlistButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.parentElement;
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseInt(productElement.getAttribute('data-price'));

        // Create wishlist item and display it
        const li = document.createElement('li');
        li.textContent = `${productName} - $${productPrice}`;
        wishlist.appendChild(li);

        // Update total price
        totalPrice += productPrice;
        totalPriceDisplay.textContent = `Total Price: $${totalPrice}`;

        // Save to localStorage
        saveToWishlist(productName, productPrice);
    });
});

// Save and Load Wishlist
function saveToWishlist(product, price) {
    let wishlistArray = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistArray.push({ product, price });
    localStorage.setItem('wishlist', JSON.stringify(wishlistArray));
}

function loadWishlist() {
    const wishlistArray = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistArray.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.product} - $${item.price}`;
        wishlist.appendChild(li);

        totalPrice += item.price;
    });

    totalPriceDisplay.textContent = `Total Price: $${totalPrice}`;
}

loadWishlist();

// Clear Wishlist
function clearWishlist() {
    localStorage.removeItem('wishlist');
    wishlist.innerHTML = '';
    totalPrice = 0;
    totalPriceDisplay.textContent = `Total Price: $${totalPrice}`;
}

// Switch sections
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Get the necessary elements for category and price filtering
const categorySelect = document.getElementById('category');
const priceSelect = document.getElementById('price');
const products = document.querySelectorAll('.product');

// Function to filter and sort products
function updateProductDisplay() {
    const selectedCategory = categorySelect.value;
    const selectedPriceOrder = priceSelect.value;

    // Filter products based on category
    let filteredProducts = Array.from(products).filter(product => {
        const productCategory = product.getAttribute('data-category');
        return selectedCategory === 'all' || productCategory === selectedCategory;
    });

    // Sort products based on price
    if (selectedPriceOrder === 'low-to-high') {
        filteredProducts.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            return priceA - priceB;
        });
    } else if (selectedPriceOrder === 'high-to-low') {
        filteredProducts.sort((a, b) => {
            const priceA = parseInt(a.getAttribute('data-price'));
            const priceB = parseInt(b.getAttribute('data-price'));
            return priceB - priceA;
        });
    }

    // Update the displayed products
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; // Clear the current grid

    filteredProducts.forEach(product => {
        productGrid.appendChild(product); // Add the filtered and sorted products back
    });
}

// Add event listeners to category and price dropdowns
categorySelect.addEventListener('change', updateProductDisplay);
priceSelect.addEventListener('change', updateProductDisplay);

// Initial call to display all products
updateProductDisplay();
