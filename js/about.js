// Keep original hero scroll animation
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

  // Update progress bar
  updateProgressBar();
});

// Progress bar functionality
function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    progressBar.style.width = scrolled + "%";
  }
}

// Intersection Observer for timeline animations
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  // Create intersection observer for timeline animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Apply initial styles and observe timeline items
  timelineItems.forEach((item, index) => {
    // Set initial state for animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
    
    // Start observing
    observer.observe(item);
  });

  // Initialize progress bar
  updateProgressBar();
});

// Smooth scrolling for internal links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  // Recalculate any positioning if needed
  updateProgressBar();
});
