let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const nightImage = document.querySelector('.night');
    const dayImage = document.querySelector('.day');
    
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const scrollingDown = window.scrollY > lastScrollTop;
    lastScrollTop = window.scrollY;
    
    if (scrollPercent > 30) {
        // Scrolling down
        nightImage.classList.remove('hidden');
        nightImage.classList.add('visible');
        dayImage.classList.add('hidden');
        
        // Fade out night image after 70% scroll
        if (scrollPercent > 70) {
            const opacity = Math.max(0.3, 1 - ((scrollPercent - 70) / 20));
            nightImage.style.opacity = opacity;
        } else {
            nightImage.style.opacity = 1;
        }
    } else {
        // Scrolling up
        nightImage.style.opacity = 1;
        nightImage.classList.add('hidden');
        nightImage.classList.remove('visible');
        dayImage.classList.remove('hidden');
    }
});
