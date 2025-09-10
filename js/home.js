let lastScrollTop = 0;

// Configuration object for easy tweaking
const config = {
    text: {
        fadeDistance: 0.5 // Fade over 50% of viewport height
    },
    dayNightTransition: {
        startPercent: 30,
        range: 30 // Transition over 30% range
    },
    navbar: {
        showThreshold: 50,
        darkModePercent: 30
    },
    transitions: {
        duration: '0.3s',
        easing: 'ease-in-out'
    }
};

// Cache DOM elements (some may be dynamically loaded)
const elements = {
    nightImage: document.querySelector('.night'),
    dayImage: document.querySelector('.day'),
    text: document.querySelector('.header-text'),
    navbar: null // Will be set when navbar loads
};

// Function to get navbar element (handles dynamic loading)
function getNavbar() {
    if (!elements.navbar) {
        elements.navbar = document.querySelector('.navbar');
    }
    return elements.navbar;
}

// Utility functions
function calculateScrollPercent() {
    return (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
}

function applyTransition(element, duration = config.transitions.duration, easing = config.transitions.easing) {
    element.style.transition = `opacity ${duration} ${easing}`;
}

function setElementVisibility(element, opacity, isVisible) {
    element.style.opacity = opacity;
    element.style.visibility = isVisible ? 'visible' : 'hidden';
}

function toggleClass(element, className, condition) {
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

// Feature handlers
function handleTextFade(scrollY) {
    const textOpacity = Math.max(0, 1 - (scrollY / (window.innerHeight * config.text.fadeDistance)));
    setElementVisibility(elements.text, textOpacity, textOpacity > 0);
}

function handleDayNightTransition(scrollPercent) {
    const { nightImage, dayImage } = elements;
    const { startPercent, range } = config.dayNightTransition;
    
    if (scrollPercent > startPercent) {
        // Show night image and calculate opacities
        toggleClass(nightImage, 'hidden', false);
        toggleClass(nightImage, 'visible', true);
        
        const progress = Math.min(1, (scrollPercent - startPercent) / range);
        const nightOpacity = progress;
        const dayOpacity = Math.max(0, 1 - progress);
        
        // Apply transitions
        applyTransition(nightImage);
        applyTransition(dayImage);
        
        // Set opacities
        nightImage.style.opacity = nightOpacity;
        dayImage.style.opacity = dayOpacity;
        
        // Hide day image when nearly invisible
        toggleClass(dayImage, 'hidden', dayOpacity < 0.1);
    } else {
        // Reset to day mode
        toggleClass(nightImage, 'hidden', true);
        toggleClass(nightImage, 'visible', false);
        toggleClass(dayImage, 'hidden', false);
        
        dayImage.style.opacity = 1;
        nightImage.style.opacity = 0;
    }
}

function handleNavbar(scrollY, scrollPercent) {
    const navbar = getNavbar();
    if (!navbar) return; // Exit if navbar not loaded yet
    
    const { showThreshold, darkModePercent } = config.navbar;
    
    // Show/hide navbar based on scroll position
    toggleClass(navbar, 'visible', scrollY > showThreshold);
    
    // Toggle dark mode based on scroll percentage
    if (scrollPercent > darkModePercent) {
        navbar.classList.remove('navbar-light-bg');
        navbar.classList.add('dark-mode');
    } else {
        navbar.classList.add('navbar-light-bg');
        navbar.classList.remove('dark-mode');
    }
}

// Main scroll handler
function handleScroll() {
    const scrollY = window.scrollY;
    const scrollPercent = calculateScrollPercent();
    const scrollingDown = scrollY > lastScrollTop;
    
    // Update tracking variable
    lastScrollTop = scrollY;
    
    // Handle all scroll-based features
    handleTextFade(scrollY);
    handleDayNightTransition(scrollPercent);
    handleNavbar(scrollY, scrollPercent);
}

// Add single scroll event listener
window.addEventListener('scroll', handleScroll);

// Optional: Throttle scroll events for better performance
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Use throttled version for better performance (uncomment if needed)
// window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps
