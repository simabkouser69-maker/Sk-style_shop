// ===== SK Style Shop - Main JavaScript =====

// Product Data
const products = [
  { id:1, name:"Elegant Embroidered Lawn Suit - Premium Collection", price:4500, original:7500, discount:40, image:"p1.png", category:"women", rating:4.5, sold:234, flash:true },
  { id:2, name:"Men's Premium Slim Fit Cotton Shirt - Navy Blue", price:2800, original:4200, discount:33, image:"p2.png", category:"men", rating:4.3, sold:189, flash:true },
  { id:3, name:"Designer Leather Crossbody Handbag - Gold Chain", price:5200, original:8000, discount:35, image:"p3.png", category:"bags", rating:4.7, sold:156, flash:true },
  { id:4, name:"Gold Plated Pearl Jewelry Set - Bridal Collection", price:6500, original:12000, discount:46, image:"p4.png", category:"jewelry", rating:4.8, sold:98, flash:true },
  { id:5, name:"Women's Block Heel Sandals - Rose Gold", price:3200, original:5500, discount:42, image:"p5.png", category:"shoes", rating:4.4, sold:312, flash:true },
  { id:6, name:"Men's Classic Analog Watch - Brown Leather", price:3500, original:6000, discount:42, image:"p6.png", category:"accessories", rating:4.6, sold:267, flash:true },
  { id:7, name:"Polarized Cat-Eye Sunglasses - Black & Gold", price:1800, original:3500, discount:49, image:"p7.png", category:"accessories", rating:4.2, sold:445 },
  { id:8, name:"Men's Premium Cotton Kurta - White Embroidered", price:2200, original:3800, discount:42, image:"p8.png", category:"men", rating:4.5, sold:178 },
  { id:9, name:"Silk Chiffon Dupatta - Floral Print Collection", price:1200, original:2000, discount:40, image:"p1.png", category:"women", rating:4.1, sold:521 },
  { id:10, name:"Premium Leather Belt - Men's Formal", price:1500, original:2800, discount:46, image:"p6.png", category:"men", rating:4.3, sold:334 },
  { id:11, name:"Crystal Drop Earrings - Rose Gold Plated", price:950, original:1800, discount:47, image:"p4.png", category:"jewelry", rating:4.6, sold:287 },
  { id:12, name:"Women's Running Sneakers - Lightweight", price:4200, original:6500, discount:35, image:"p5.png", category:"shoes", rating:4.4, sold:198 },
  { id:13, name:"Embroidered Clutch Bag - Evening Collection", price:2800, original:4500, discount:38, image:"p3.png", category:"bags", rating:4.5, sold:145 },
  { id:14, name:"Unstitched Lawn 3PC - Summer Vibes", price:3800, original:5500, discount:31, image:"p1.png", category:"women", rating:4.7, sold:412 },
  { id:15, name:"Men's Casual Polo T-Shirt - Striped", price:1800, original:2800, discount:36, image:"p2.png", category:"men", rating:4.2, sold:567 },
  { id:16, name:"Diamond Cut Bangle Set - Traditional", price:4500, original:8000, discount:44, image:"p4.png", category:"jewelry", rating:4.8, sold:89 },
  { id:17, name:"Canvas Tote Bag - Everyday Essential", price:1600, original:2500, discount:36, image:"p3.png", category:"bags", rating:4.0, sold:623 },
  { id:18, name:"Luxury Chronograph Watch - Rose Gold", price:8500, original:15000, discount:43, image:"p6.png", category:"accessories", rating:4.9, sold:67 },
  { id:19, name:"Women's Kitten Heels - Nude Patent", price:3600, original:5800, discount:38, image:"p5.png", category:"shoes", rating:4.3, sold:234 },
  { id:20, name:"Aviator Sunglasses - Unisex Gold Frame", price:2200, original:4000, discount:45, image:"p7.png", category:"accessories", rating:4.5, sold:389 },
  { id:21, name:"Bridal Red Lehenga - Heavy Embroidery", price:18500, original:30000, discount:38, image:"p1.png", category:"women", rating:4.9, sold:45 },
  { id:22, name:"Men's Formal Blazer - Charcoal Grey", price:7500, original:12000, discount:38, image:"p2.png", category:"men", rating:4.6, sold:123 },
  { id:23, name:"Pearl Anklet Set - Delicate Design", price:750, original:1400, discount:46, image:"p4.png", category:"jewelry", rating:4.1, sold:456 },
  { id:24, name:"Sports Backpack - Waterproof Travel", price:3200, original:5000, discount:36, image:"p3.png", category:"bags", rating:4.4, sold:278 },
  { id:25, name:"Men's Loafers - Premium Suede Brown", price:4800, original:7500, discount:36, image:"p8.png", category:"shoes", rating:4.5, sold:156 }
];

// State
let cart = [];
let wishlist = [];
let displayedProducts = 10;
let currentSlide = 0;
const PRODUCTS_PER_PAGE = 10;

// DOM Elements
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ===== HERO CAROUSEL =====
function initCarousel() {
  const track = $('#heroTrack');
  const slides = $$('.hero-slide');
  const dotsContainer = $('#heroDots');
  const total = slides.length;

  // Create dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(n) {
    currentSlide = n;
    track.style.transform = `translateX(-${n * 100}%)`;
    $$('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === n));
  }

  $('#heroNext').addEventListener('click', () => goToSlide((currentSlide + 1) % total));
  $('#heroPrev').addEventListener('click', () => goToSlide((currentSlide - 1 + total) % total));

  // Auto-slide
  setInterval(() => goToSlide((currentSlide + 1) % total), 5000);
}

// ===== COUNTDOWN TIMER =====
function initCountdown() {
  const end = new Date();
  end.setHours(end.getHours() + 12);
  end.setMinutes(0); end.setSeconds(0);

  function update() {
    const diff = end - new Date();
    if (diff <= 0) { end.setDate(end.getDate() + 1); return; }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    $('#cdHours').textContent = String(h).padStart(2, '0');
    $('#cdMins').textContent = String(m).padStart(2, '0');
    $('#cdSecs').textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}

// ===== RENDER PRODUCTS =====
function createProductCard(p) {
  const isWished = wishlist.includes(p.id);
  const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 ? '½' : '') + '☆'.repeat(5 - Math.ceil(p.rating));
  return `
    <div class="product-card" data-id="${p.id}" data-cat="${p.category}">
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="discount-badge">-${p.discount}%</span>
        <button class="wishlist-btn ${isWished ? 'active' : ''}" onclick="toggleWishlist(${p.id})">
          <i class="fas fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <div class="product-title">${p.name}</div>
        <div class="product-price">
          <span class="price-current">Rs. ${p.price.toLocaleString()}</span>
          <span class="price-original">Rs. ${p.original.toLocaleString()}</span>
        </div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${p.rating})</span>
        </div>
        <div class="product-sold">${p.sold} sold</div>
        <button class="add-cart-btn" onclick="addToCart(${p.id})">
          <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </div>`;
}

function renderProducts(category = 'all') {
  const grid = $('#productsGrid');
  let filtered = category === 'all' ? products : products.filter(p => p.category === category);
  const toShow = filtered.slice(0, displayedProducts);
  grid.innerHTML = toShow.map(createProductCard).join('');

  const btn = $('#loadMoreBtn');
  btn.style.display = displayedProducts >= filtered.length ? 'none' : 'block';

  // Animate in
  $$('.product-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 50);
  });
}

function renderFlashProducts() {
  const container = $('#flashProducts');
  const flashItems = products.filter(p => p.flash);
  container.innerHTML = flashItems.map(createProductCard).join('');
}

// ===== CART =====
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...p, qty: 1 }); }
  updateCart();
  showToast(`${p.name.substring(0, 30)}... added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCart();
}

function updateCart() {
  const badge = $('#cartBadge');
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = totalItems;
  badge.style.display = totalItems ? 'flex' : 'none';

  const container = $('#cartItems');
  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty"><div class="empty-icon">🛒</div><p>Your cart is empty</p></div>';
  } else {
    container.innerHTML = cart.map(i => `
      <div class="cart-item">
        <img src="${i.image}" alt="${i.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${i.name.substring(0, 40)}...</div>
          <div class="cart-item-price">Rs. ${(i.price * i.qty).toLocaleString()} × ${i.qty}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i.id})"><i class="fas fa-trash"></i></button>
      </div>`).join('');
  }
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  $('#cartTotal').textContent = `Rs. ${total.toLocaleString()}`;
}

// ===== WISHLIST =====
function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) { wishlist.splice(idx, 1); showToast('Removed from wishlist'); }
  else { wishlist.push(id); showToast('Added to wishlist ❤️'); }
  renderProducts(currentCategory);
  renderFlashProducts();
}

// ===== TOAST =====
function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== SEARCH =====
function handleSearch() {
  const q = $('#searchInput').value.toLowerCase().trim();
  if (!q) { renderProducts('all'); return; }
  const grid = $('#productsGrid');
  const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
  if (filtered.length) {
    grid.innerHTML = filtered.map(createProductCard).join('');
    $('#loadMoreBtn').style.display = 'none';
  } else {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-muted);">No products found for "' + q + '"</p>';
    $('#loadMoreBtn').style.display = 'none';
  }
}

// ===== CATEGORY FILTER =====
let currentCategory = 'all';
function filterCategory(cat) {
  currentCategory = cat;
  displayedProducts = PRODUCTS_PER_PAGE;
  renderProducts(cat);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initCountdown();
  renderProducts();
  renderFlashProducts();
  updateCart();

  // Load more
  $('#loadMoreBtn').addEventListener('click', () => {
    displayedProducts += PRODUCTS_PER_PAGE;
    renderProducts(currentCategory);
  });

  // Cart toggle
  $('#cartIcon').addEventListener('click', () => {
    $('#cartSidebar').classList.add('active');
    $('#cartOverlay').classList.add('active');
  });
  $('#cartClose').addEventListener('click', closeCart);
  $('#cartOverlay').addEventListener('click', closeCart);

  function closeCart() {
    $('#cartSidebar').classList.remove('active');
    $('#cartOverlay').classList.remove('active');
  }

  // Mobile menu
  $('#mobileMenuBtn').addEventListener('click', () => {
    $('#mainNav').classList.toggle('open');
  });

  // Nav category filter
  $$('.nav li a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      filterCategory(a.dataset.cat);
    });
  });

  // Category cards
  $$('.cat-card').forEach(c => {
    c.addEventListener('click', () => filterCategory(c.dataset.cat));
  });

  // Search
  $('#searchBtn').addEventListener('click', handleSearch);
  $('#searchInput').addEventListener('keypress', e => { if (e.key === 'Enter') handleSearch(); });

  // Newsletter
  $('#newsletterForm').addEventListener('submit', e => {
    e.preventDefault();
    showToast('Thank you for subscribing! 🎉');
    $('#newsletterEmail').value = '';
  });

  // Checkout
  $('#checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) { showToast('Your cart is empty!'); return; }
    showToast('Redirecting to checkout... 🛒');
  });

  // Scroll animation for section titles
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });

  $$('.section-title').forEach(el => observer.observe(el));

  // ===== AUTH MODALS =====
  initAuthModals();
});

// ===== AUTH MODALS SYSTEM =====
function initAuthModals() {
  const overlay = $('#authOverlay');
  const loginModal = $('#loginModal');
  const signupModal = $('#signupModal');

  // Open Login Modal
  const loginBtn = $('#loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', e => {
      e.preventDefault();
      openModal(loginModal);
    });
  }

  // Open Signup Modal
  const signupBtn = $('#signupBtn');
  if (signupBtn) {
    signupBtn.addEventListener('click', e => {
      e.preventDefault();
      openModal(signupModal);
    });
  }

  // Close buttons
  $('#loginClose').addEventListener('click', () => closeModal(loginModal));
  $('#signupClose').addEventListener('click', () => closeModal(signupModal));

  // Overlay click to close
  overlay.addEventListener('click', () => {
    if (loginModal.classList.contains('active')) closeModal(loginModal);
    if (signupModal.classList.contains('active')) closeModal(signupModal);
  });

  // ESC key to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (loginModal.classList.contains('active')) closeModal(loginModal);
      if (signupModal.classList.contains('active')) closeModal(signupModal);
    }
  });

  // Switch between modals
  $('#goToSignup').addEventListener('click', e => {
    e.preventDefault();
    closeModal(loginModal);
    setTimeout(() => openModal(signupModal), 350);
  });

  $('#goToLogin').addEventListener('click', e => {
    e.preventDefault();
    closeModal(signupModal);
    setTimeout(() => openModal(loginModal), 350);
  });

  // Login Tabs
  const tabPassword = $('#tabPassword');
  const tabPhone = $('#tabPhone');
  const passwordForm = $('#passwordForm');
  const phoneForm = $('#phoneForm');

  tabPassword.addEventListener('click', () => {
    tabPassword.classList.add('active');
    tabPhone.classList.remove('active');
    passwordForm.style.display = 'block';
    phoneForm.style.display = 'none';
  });

  tabPhone.addEventListener('click', () => {
    tabPhone.classList.add('active');
    tabPassword.classList.remove('active');
    phoneForm.style.display = 'block';
    passwordForm.style.display = 'none';
  });

  // Toggle Password Visibility
  setupPasswordToggle('toggleLoginPass', 'loginPassword');
  setupPasswordToggle('toggleSignupPass', 'signupPassword');

  // Password Strength Meter
  const signupPass = $('#signupPassword');
  if (signupPass) {
    signupPass.addEventListener('input', () => {
      updatePasswordStrength(signupPass.value);
    });
  }

  // OTP Input Auto-advance
  const otpBoxes = document.querySelectorAll('.otp-box');
  otpBoxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      if (box.value.length === 1 && i < otpBoxes.length - 1) {
        otpBoxes[i + 1].focus();
      }
    });
    box.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !box.value && i > 0) {
        otpBoxes[i - 1].focus();
      }
    });
  });

  // Login Form Submit (Password)
  passwordForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = $('#loginSubmitBtn');
    simulateLoading(btn, 'LOGIN', () => {
      showToast('Welcome back! Login successful ✨');
      closeModal(loginModal);
    });
  });

  // Phone Login - Send OTP
  phoneForm.addEventListener('submit', e => {
    e.preventDefault();
    const otpSection = $('#otpSection');
    const btn = $('#sendOtpBtn');

    if (otpSection.style.display === 'none') {
      simulateLoading(btn, 'SEND OTP', () => {
        otpSection.style.display = 'block';
        btn.querySelector('span').textContent = 'VERIFY OTP';
        btn.querySelector('i').className = 'fas fa-check-circle';
        startOtpTimer();
        showToast('OTP sent to your phone! 📱');
      });
    } else {
      const otpValues = [...otpBoxes].map(b => b.value).join('');
      if (otpValues.length < 4) {
        showToast('Please enter the complete OTP');
        return;
      }
      simulateLoading(btn, 'VERIFY OTP', () => {
        showToast('Phone verified! Login successful ✨');
        closeModal(loginModal);
      });
    }
  });

  // Signup Form Submit
  $('#signupForm').addEventListener('submit', e => {
    e.preventDefault();
    const pass = $('#signupPassword').value;
    const confirm = $('#signupConfirm').value;

    if (pass !== confirm) {
      showToast('Passwords do not match! ❌');
      return;
    }

    if (pass.length < 6) {
      showToast('Password must be at least 6 characters! ❌');
      return;
    }

    const btn = $('#signupSubmitBtn');
    simulateLoading(btn, 'CREATE ACCOUNT', () => {
      showToast('Account created successfully! Welcome to SK Style Shop 🎉');
      closeModal(signupModal);
    });
  });

  // Forgot Password
  $('#forgotPassLink').addEventListener('click', e => {
    e.preventDefault();
    showToast('Password reset link sent to your email 📧');
  });

  // Social buttons
  ['googleLoginBtn', 'facebookLoginBtn', 'googleSignupBtn', 'facebookSignupBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', e => {
        e.preventDefault();
        const provider = id.includes('google') ? 'Google' : 'Facebook';
        showToast(`Connecting to ${provider}...`);
      });
    }
  });
}

function openModal(modal) {
  const overlay = $('#authOverlay');
  overlay.classList.add('active');
  modal.classList.remove('closing');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  const overlay = $('#authOverlay');
  modal.classList.add('closing');
  setTimeout(() => {
    modal.classList.remove('active', 'closing');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }, 300);
}

function setupPasswordToggle(toggleId, inputId) {
  const toggle = document.getElementById(toggleId);
  const input = document.getElementById(inputId);
  if (!toggle || !input) return;

  toggle.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggle.innerHTML = isPassword
      ? '<i class="fas fa-eye"></i>'
      : '<i class="fas fa-eye-slash"></i>';
  });
}

function updatePasswordStrength(password) {
  const fill = $('#strengthFill');
  const text = $('#strengthText');
  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.length >= 10) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // Remove all classes
  fill.className = 'strength-fill';
  text.className = 'strength-text';

  if (password.length === 0) {
    text.textContent = '';
    return;
  }

  if (strength <= 1) {
    fill.classList.add('weak');
    text.classList.add('weak');
    text.textContent = 'Weak';
  } else if (strength === 2) {
    fill.classList.add('fair');
    text.classList.add('fair');
    text.textContent = 'Fair';
  } else if (strength === 3) {
    fill.classList.add('good');
    text.classList.add('good');
    text.textContent = 'Good';
  } else {
    fill.classList.add('strong');
    text.classList.add('strong');
    text.textContent = 'Strong';
  }
}

function simulateLoading(btn, originalText, callback) {
  const span = btn.querySelector('span');
  const icon = btn.querySelector('i');
  btn.classList.add('loading');
  span.textContent = 'Please wait...';
  if (icon) icon.className = '';
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  btn.appendChild(spinner);

  setTimeout(() => {
    btn.classList.remove('loading');
    span.textContent = originalText;
    if (spinner.parentNode) spinner.remove();
    if (icon) icon.className = 'fas fa-arrow-right';
    if (callback) callback();
  }, 1500);
}

function startOtpTimer() {
  let seconds = 30;
  const timerEl = $('#otpTimer');
  const resendLink = $('#resendOtp');
  resendLink.style.pointerEvents = 'none';
  resendLink.style.opacity = '0.5';

  const interval = setInterval(() => {
    seconds--;
    timerEl.textContent = `(${seconds}s)`;
    if (seconds <= 0) {
      clearInterval(interval);
      timerEl.textContent = '';
      resendLink.style.pointerEvents = 'auto';
      resendLink.style.opacity = '1';
    }
  }, 1000);

  resendLink.addEventListener('click', e => {
    e.preventDefault();
    if (seconds <= 0) {
      showToast('OTP resent! 📱');
      startOtpTimer();
    }
  });
}
