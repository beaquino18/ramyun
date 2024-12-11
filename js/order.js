
let shop1 = document.getElementById('shop1');
let shop2 = document.getElementById('shop2');
let shop3 = document.getElementById('shop3');
let shop4 = document.getElementById('shop4');
let text = document.getElementById('text');
const orderSection = document.getElementById('order');

window.addEventListener('scroll', function() {
    var value = window.scrollY;

  shop1.style.top = value * 0.5 + 'px';
  shop2.style.left = value * 0.5 + 'px';
  shop3.style.left = -value * 0.5 + 'px';
  shop4.style.top = -value * 0.5 + 'px';
  text.style.top = value * 1 + 'px';
});

// Parallax effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.pageYOffset;
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const orderSection = document.getElementById('order');
    const orderSectionTop = orderSection.offsetTop;
    
    // Show navbar after scrolling 50px
    if (scrollPosition > 50) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
    
    // Dark mode toggle
    if (scrollPercent > 30) {
        navbar.classList.add('dark-mode');
    } else {
        navbar.classList.remove('dark-mode');
    }

    
    if (scrollPosition >= orderSectionTop) {
        navbar.classList.add('order-section');
    } else {
        navbar.classList.remove('order-section');
    }
});

// Show customize ramen when customize button is clicked. Hide bento section.
document.querySelector('.customize-ramen').addEventListener('click', function() {
    const customizeSection = document.querySelector('.customize-order-ramen');
    const bentoSection = document.querySelector('.bento');
    const customizeButton = document.querySelector('.customize-ramen');
    
    customizeSection.classList.add('show');
    bentoSection.classList.add('hidden');
    customizeButton.disabled = true;
});

// Show customize bento when customize button is clicked. Hide ramen section.
document.querySelector('.customize-bento').addEventListener('click', function() {
    const customizeSection = document.querySelector('.customize-order-bento');
    const ramenSection = document.querySelector('.ramen');
    const customizeButton = document.querySelector('.customize-bento');
    
    customizeSection.classList.add('show');
    ramenSection.classList.add('hidden');
    customizeButton.disabled = true;
});

// Close button function for ramen customization
document.querySelector('.close').addEventListener('click', function() {
    const customizeSection = document.querySelector('.customize-order-ramen');
    const bentoSection = document.querySelector('.bento');
    const customizeButton = document.querySelector('.customize-ramen');
    
    customizeSection.classList.remove('show');
    bentoSection.classList.remove('hidden');
    customizeButton.disabled = false;
});

// Close button function for bento customization
document.querySelector('.bento-box .close').addEventListener('click', function() {
    const customizeSection = document.querySelector('.customize-order-bento');
    const ramenSection = document.querySelector('.ramen');
    const customizeButton = document.querySelector('.customize-bento');
    
    customizeSection.classList.remove('show');
    ramenSection.classList.remove('hidden');
    customizeButton.disabled = false;
});


// Helper function to handle single choice options
function handleSingleChoice(button) {
    const parent = button.closest('.option-choices');
    parent.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// Helper function to handle multiple choice options
function handleMultipleChoice(button) {
    button.classList.toggle('active');
}

// Main event listener
document.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const parent = button.closest('.option-choices');
        // Check if this is in the add-ons section
        const isAddOns = button.closest('[data-option-type="add-ons"]');
        
        if (isAddOns) {
            handleMultipleChoice(button);
        } else {
            handleSingleChoice(button);
        }
    });
});

// add-to-cart button functionality. When clicked, the customize-order-ramen section
// will be hidden and the bento section will be shown.
document.querySelector('.add-to-cart').addEventListener('click', function() {
    const customizeSection = document.querySelector('.customize-order-ramen');
    const bentoSection = document.querySelector('.bento');
    const customizeButton = document.querySelector('.customize-ramen');
    
    customizeSection.classList.remove('show');
    bentoSection.classList.remove('hidden');
    customizeButton.disabled = false;
});

// add-to-cart button for customize bento
document.querySelector('.bento-box .add-to-cart').addEventListener('click', function() {
    const customizeSection = document.querySelector('.customize-order-bento');
    const ramenSection = document.querySelector('.ramen');
    const customizeButton = document.querySelector('.customize-bento');
    
    customizeSection.classList.remove('show');
    ramenSection.classList.remove('hidden');
    customizeButton.disabled = false;
});

// Add this at the top of order.js
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-item span');

// Update the add-to-cart event listener for ramen
document.querySelector('.add-to-cart').addEventListener('click', function() {
    const customizeSection = document.querySelector('.customize-order-ramen');
    const bentoSection = document.querySelector('.bento');
    const customizeButton = document.querySelector('.customize-ramen');
    
    // Increment cart count and update display
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    customizeSection.classList.remove('show');
    bentoSection.classList.remove('hidden');
    customizeButton.disabled = false;
});

// Update the add-to-cart event listener for bento
document.querySelector('.bento-box .add-to-cart').addEventListener('click', function() {
    const customizeSection = document.querySelector('.customize-order-bento');
    const ramenSection = document.querySelector('.ramen');
    const customizeButton = document.querySelector('.customize-bento');
    
    // Increment cart count and update display
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    customizeSection.classList.remove('show');
    ramenSection.classList.remove('hidden');
    customizeButton.disabled = false;
});

// Update add-to-cart counter in the navbar
// js/order.js
// Add this to your existing order.js file
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Get current cart count
        let cartCount = parseInt(localStorage.getItem('cartCount') || 0);
        // Increment cart count
        cartCount++;
        // Save to localStorage
        localStorage.setItem('cartCount', cartCount);
        // Update display
        updateCartCount();
    });
});

