async function loadContent() {
  try {
    const response = await fetch('content.json', { cache: 'no-store' });
    const data = await response.json();

    // Header
    document.getElementById('siteTitle').textContent = data.site.title;
    document.getElementById('siteTagline').textContent = data.site.tagline || '';
    const brandLogo = document.getElementById('brandLogo');
    if (data.site.logo) brandLogo.src = data.site.logo;

    // Hero
    document.getElementById('heroTitle').textContent = data.hero.title;
    document.getElementById('heroSubtitle').textContent = data.hero.subtitle;
    const heroImg = document.getElementById('heroImage');
    if (data.hero.image) heroImg.src = data.hero.image;

    // About
    document.getElementById('aboutText').textContent = data.about.text;
    const aboutBullets = document.getElementById('aboutBullets');
    aboutBullets.innerHTML = '';
    data.about.bullets.forEach((b) => {
      const li = document.createElement('li');
      li.textContent = b;
      aboutBullets.appendChild(li);
    });
    const whyUs = document.getElementById('whyUs');
    whyUs.innerHTML = '';
    data.about.whyUs.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      whyUs.appendChild(li);
    });

    // Services
    const servicesGrid = document.getElementById('servicesGrid');
    servicesGrid.innerHTML = '';
    data.services.forEach((svc) => {
      const el = document.createElement('div');
      el.className = 'service-card';
      el.innerHTML = `
        <div class="title">${svc.title}</div>
        <div class="muted">${svc.description}</div>
      `;
      servicesGrid.appendChild(el);
    });

    // Projects Gallery
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    data.projects.forEach((p) => {
      const item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `
        <img src="${p.image}" alt="${p.caption || 'مشروع دهان'}" loading="lazy"/>
        <div class="caption">${p.caption || ''}</div>
      `;
      gallery.appendChild(item);
    });

    // Contact
    document.getElementById('contactBlurb').textContent = data.contact.blurb;
    const itemsWrap = document.getElementById('contactItems');
    itemsWrap.innerHTML = '';
    Object.entries(data.contact.details).forEach(([key, value]) => {
      const div = document.createElement('div');
      div.className = 'contact-item';
      div.innerHTML = `<span class="key">${key}:</span><span>${value}</span>`;
      itemsWrap.appendChild(div);
    });
    const wa = document.getElementById('whatsappLink');
    const phone = document.getElementById('phoneLink');
    if (data.contact.whatsapp) wa.href = `https://wa.me/${data.contact.whatsapp}`;
    if (data.contact.phone) phone.href = `tel:${data.contact.phone}`;

    // Footer
    document.getElementById('footerAddress').textContent = data.footer.address || '';
    document.getElementById('year').textContent = new Date().getFullYear();
  } catch (e) {
    console.error('Failed to load content.json', e);
  }
}

document.addEventListener('DOMContentLoaded', loadContent);

