function resetCart() {
  localStorage.setItem('cartCount', 0);
  updateCartCount();
}
