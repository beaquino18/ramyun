
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

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const nightImage = document.querySelector('.night');
    const dayImage = document.querySelector('.day');
    const text = document.getElementById('text');
    
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const scrollingDown = window.scrollY > lastScrollTop;
    lastScrollTop = window.scrollY;
    
    // Text fade out logic
    const textOpacity = 1 - (window.scrollY / (window.innerHeight * 0.5));
    if (textOpacity > 0) {
        text.style.opacity = textOpacity;
        text.style.visibility = 'visible';
    } else {
        text.style.opacity = 0;
        text.style.visibility = 'hidden';
    }
    
    // Start transition earlier at 60%
    if (scrollPercent > 30) {
        nightImage.classList.remove('hidden');
        nightImage.classList.add('visible');
        
        // Calculate opacity over a larger range (60% to 90%)
        const nightOpacity = Math.min(1, (scrollPercent - 30) / 30);
        const dayOpacity = Math.max(0, 1 - ((scrollPercent - 30) / 30));
        
        // Apply smoother transitions
        nightImage.style.transition = 'opacity 0.3s ease-in-out';
        dayImage.style.transition = 'opacity 0.3s ease-in-out';
        
        nightImage.style.opacity = nightOpacity;
        dayImage.style.opacity = dayOpacity;
        
        if (dayOpacity < 0.1) {
            dayImage.classList.add('hidden');
        } else {
            dayImage.classList.remove('hidden');
        }
    } else {
        // Reset when scrolling back up
        nightImage.classList.add('hidden');
        nightImage.classList.remove('visible');
        dayImage.classList.remove('hidden');
        dayImage.style.opacity = 1;
        nightImage.style.opacity = 0;
    }
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

// // Show customize bento when customize button is clicked. Hide ramen section.
// document.querySelector('.customize-bento').addEventListener('click', function() {
//     const customizeSection = document.querySelector('.customize-order-bento');
//     const ramenSection = document.querySelector('.ramen');
//     const customizeButton = document.querySelector('.customize-bento');
    
//     customizeSection.classList.add('show');
//     ramenSection.classList.add('hidden');
//     customizeButton.disabled = true;
// });

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
document.querySelector('.close-bento').addEventListener('click', function() {
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
