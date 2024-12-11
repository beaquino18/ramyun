
document.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const imagePaneSection = document.querySelector('.image-pane');
  const scrollThreshold = window.innerHeight * 0.3;
  const scrollDirection = window.scrollY > (window.lastScrollY || 0) ? 'down' : 'up';
  
  // Store last scroll position
  window.lastScrollY = window.scrollY;

  // When scrolling down past threshold
  if (scrollDirection === 'down' && window.scrollY > scrollThreshold) {
    hero.classList.add('scrolled');
    
    // Smooth scroll to image-pane
    if (!window.isTransitioning) {
      window.isTransitioning = true;
      imagePaneSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Reset transition flag after animation
      setTimeout(() => {
        window.isTransitioning = false;
      }, 1000);
    }
  }

  // Only allow scroll up when fully scrolled down
  if (scrollDirection === 'up' && window.scrollY < scrollThreshold) {
    hero.classList.remove('scrolled');
    hero.style.display = 'flex';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const timelineScroll = document.querySelector('.timeline').parentElement;
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const updateScrollImage = () => {
    const activeItem = Array.from(timelineItems).find(item => {
      const rect = item.getBoundingClientRect();
      return rect.top <= window.innerHeight/2 && rect.bottom >= window.innerHeight/2;
    });
    
    if (activeItem) {
      const rect = activeItem.getBoundingClientRect();
      document.documentElement.style.setProperty(
        '--scroll-image-top', 
        `${rect.top + rect.height/2}px`
      );
    }
  };

  window.addEventListener('scroll', updateScrollImage);
  updateScrollImage();
});

