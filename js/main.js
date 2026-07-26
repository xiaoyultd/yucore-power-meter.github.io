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

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    var answer = btn.nextElementSibling;
    answer.classList.toggle('open', !expanded);
  });
});

// Persistent conversion paths and CTA measurement on every page.
document.addEventListener('DOMContentLoaded', function () {
  if (!document.querySelector('.conversion-dock')) {
    const dock = document.createElement('div');
    dock.className = 'conversion-dock';
    dock.setAttribute('aria-label', 'Quick contact');
    dock.innerHTML =
      '<a class="dock-whatsapp" data-cta="floating-whatsapp" target="_blank" rel="noopener" href="https://wa.me/8615018485957?text=Hi%20Summer%2C%20I%27d%20like%20a%20quote%20for%20industrial%20parts.">WhatsApp</a>' +
      '<a class="dock-quote" data-cta="floating-quote" href="contact.html#quote-form">Get 24h Quote</a>';
    document.body.appendChild(dock);
  }

  document.addEventListener('click', function (event) {
    const cta = event.target.closest('[data-cta]');
    if (!cta) return;
    const detail = {
      event: 'cta_click',
      cta: cta.dataset.cta,
      page: location.pathname,
      destination: cta.getAttribute('href')
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    try {
      const counts = JSON.parse(localStorage.getItem('cta_clicks') || '{}');
      counts[detail.cta] = (counts[detail.cta] || 0) + 1;
      localStorage.setItem('cta_clicks', JSON.stringify(counts));
    } catch (error) {
      // Tracking must never block a buyer from contacting sales.
    }
  });
});

// Contact form: validate, then open a pre-filled email.
const form = document.getElementById('quote-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = form.querySelector('[name="name"]').value;
    const company = form.querySelector('[name="company"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const country = form.querySelector('[name="country"]').value;
    const category = form.querySelector('[name="category"]').value;
    const products = form.querySelector('[name="products"]').value;
    const qty = form.querySelector('[name="qty"]').value;
    const urgency = form.querySelector('[name="urgency"]').value;

    const body = [
      'Name: ' + name,
      'Company: ' + company,
      'Email: ' + email,
      'Phone: ' + phone,
      'Destination Country: ' + country,
      'Category: ' + category,
      'Products / Part Numbers:',
      products,
      'Estimated Quantity: ' + qty,
      'Urgency: ' + urgency
    ].join('\n');

    const subject = 'Quotation Request from ' + name + ' (' + company + ')';
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'quote_form_submit', page: location.pathname });
    const success = document.getElementById('form-success');
    if (success) success.style.display = 'block';
    window.location.href = 'mailto:summer@gzcore.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
}
