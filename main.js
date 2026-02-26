// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.remove('open');
}

// Product page: image gallery
function changeImg(btn, src) {
  document.getElementById('mainImg').src = src;
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

// Contact form: simulate submission
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Submitting...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('formCard').style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
  }, 800);
}

function resetForm() {
  document.getElementById('inquiryForm').reset();
  document.getElementById('formCard').style.display = 'block';
  document.getElementById('successMsg').style.display = 'none';
  const btn = document.getElementById('submitBtn');
  if (btn) { btn.textContent = '✈️ Submit Inquiry'; btn.disabled = false; }
}
