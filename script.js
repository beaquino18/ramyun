let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const nightImage = document.querySelector('.night');
    const dayImage = document.querySelector('.day');
    
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const scrollingDown = window.scrollY > lastScrollTop;
    lastScrollTop = window.scrollY;
    
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


window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.pageYOffset;
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
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
});
