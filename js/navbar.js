document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
        <nav class="navbar navbar-expand-md navbar-dark bg-secondary">
            <div class="container-fluid">
                <!-- Mobile brand -->
                <a class="navbar-brand d-md-none" href="index.html">
                    <div class="brand-name">TezukuriLab</div>
                </a>
                
                <!-- Toggler button -->
                <button class="navbar-toggler" type="button" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <!-- Collapsible content -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav w-100 position-relative">
                        <li class="nav-item">
                            <a class="nav-link nav-story" href="about.html">Our Story</a>
                        </li>
                        <li class="nav-item position-absolute start-50 translate-middle-x d-none d-md-block">
                            <!-- Desktop brand -->
                            <a class="navbar-brand" href="index.html">
                                <div class="brand-name">TezukuriLab</div>
                            </a>
                        </li>
                        <li class="nav-item ms-auto">
                            <a class="nav-link nav-order" href="order.html">Order</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link cart-item" href="checkout.html">
                                <div class="cart-plus-counter">
                                    <img src="images/cart-blue.svg" class="cart" alt="Cart">
                                    <span>0</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    const navContainer = document.getElementById('navbar-container') || document.body;
    if (document.getElementById('navbar-container')) {
        navContainer.innerHTML = navbarHTML;
    } else {
        navContainer.insertAdjacentHTML('afterbegin', navbarHTML);
    }

    const toggleButton = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (toggleButton && navbarCollapse) {
        toggleButton.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                toggleButton.setAttribute('aria-expanded', 'false');
            } else {
                navbarCollapse.classList.add('show');
                toggleButton.setAttribute('aria-expanded', 'true');
            }
        });
        
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });
        
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('show');
                toggleButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
