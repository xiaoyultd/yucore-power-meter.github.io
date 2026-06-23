function toggleNav() {
  const nav = document.getElementById('main-nav');
  nav.classList.toggle('open');
}

// Mark active nav link based on current page
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href && href !== 'contact.html' && href.startsWith(page.split('?')[0])) {
      a.classList.add('active');
    } else if (page === '' || page === 'index.html') {
      if (href === 'index.html') a.classList.add('active');
    }
  });
})();

// Products page: filter buttons
document.addEventListener('DOMContentLoaded', function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');
  if (!filterBtns.length) return;

  // Apply URL param filter on load
  const params = new URLSearchParams(location.search);
  const initialCat = params.get('cat') || 'all';
  activateFilter(initialCat);

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      activateFilter(btn.dataset.cat);
    });
  });

  function activateFilter(cat) {
    filterBtns.forEach(function (b) {
      b.classList.toggle('active', b.dataset.cat === cat);
    });
    cards.forEach(function (card) {
      const cardCat = card.dataset.cat;
      card.style.display = (cat === 'all' || cardCat === cat) ? '' : 'none';
    });
  }
});

// Contact form: mailto fallback
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const company = form.querySelector('[name="company"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const category = form.querySelector('[name="category"]').value;
    const products = form.querySelector('[name="products"]').value;
    const qty = form.querySelector('[name="qty"]').value;
    const urgency = form.querySelector('[name="urgency"]').value;

    const body = [
      'Name: ' + name,
      'Company: ' + company,
      'Email: ' + email,
      'Phone: ' + phone,
      'Category: ' + category,
      'Products / Part Numbers:',
      products,
      'Estimated Quantity: ' + qty,
      'Urgency: ' + urgency
    ].join('\n');

    const subject = 'Quotation Request from ' + name + ' (' + company + ')';
    window.location.href = 'mailto:summer@yucore.ltd?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}
