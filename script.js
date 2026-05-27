// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('show');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('show');
  }

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Dropdown toggle on mobile
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      toggle.closest('.dropdown').classList.toggle('open');
    }
  });
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== DKV FILTER =====
const catBtns = document.querySelectorAll('.cat-btn');
const dkvCards = document.querySelectorAll('.dkv-card');

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    dkvCards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInCard 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== IMAGE UPLOAD =====
function triggerUpload(wrapper) {
  const input = wrapper.querySelector('.file-input');
  if (input) input.click();
}

function previewImage(event, input) {
  const file = event.target.files[0];
  if (!file) return;
  const wrapper = input.closest('.dkv-upload');
  const img = wrapper.querySelector('.preview-img');
  const placeholder = wrapper.querySelector('.upload-placeholder');
  const removeBtn = wrapper.querySelector('.remove-img');
  const reader = new FileReader();
  reader.onload = (e) => {
    img.src = e.target.result;
    img.style.display = 'block';
    placeholder.style.display = 'none';
    removeBtn.style.display = 'flex';
  };
  reader.readAsDataURL(file);
  event.stopPropagation();
}

function removeImage(event, btn) {
  event.stopPropagation();
  const wrapper = btn.closest('.dkv-upload');
  const img = wrapper.querySelector('.preview-img');
  const placeholder = wrapper.querySelector('.upload-placeholder');
  const input = wrapper.querySelector('.file-input');
  img.src = '';
  img.style.display = 'none';
  placeholder.style.display = 'flex';
  btn.style.display = 'none';
  input.value = '';
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.dkv-card, .mapel-card, .kontak-card, .kegiatan-item, .karya-item, .mapel-info-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== PROGRESS BAR ANIMATION =====
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.progress-fill');
      fills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => { fill.style.width = width; }, 200);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.mapel-card').forEach(card => progressObserver.observe(card));

// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== TYPING EFFECT on hero =====
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.style.opacity = '0';
  heroName.style.transform = 'translateY(20px)';
  setTimeout(() => {
    heroName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    heroName.style.opacity = '1';
    heroName.style.transform = 'translateY(0)';
  }, 300);
}
