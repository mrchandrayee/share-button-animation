(() => {
  const stage = document.querySelector('#shareStage');
  const splay = document.querySelector('#splay');
  const share = document.querySelector('#shareButton');
  const status = document.querySelector('#status');
  const items = [...document.querySelectorAll('.ch')];
  const url = window.location.href;
  let opened = false;
  let busy = false;
  let resetTimer;

  // Read the registered --r property as resolved pixels.
  const radius = parseFloat(getComputedStyle(items[0]).getPropertyValue('--r'));
  if (Number.isFinite(radius) && radius > 0) {
    splay.style.setProperty('--r', `${radius}px`);
  }

  function setStatus(value) {
    status.textContent = value;
  }

  function openMenu() {
    opened = true;
    splay.classList.add('open');
    share.classList.add('open');
    share.classList.remove('done');
    share.setAttribute('aria-expanded', 'true');
    setStatus('Pick a channel');
  }

  function closeMenu() {
    opened = false;
    splay.classList.remove('open');
    share.classList.remove('open');
    share.setAttribute('aria-expanded', 'false');
    setStatus('');
  }

  function reset() {
    clearTimeout(resetTimer);
    busy = false;
    items.forEach(item => {
      item.classList.remove('copied');
      item.style.removeProperty('--fx');
      item.style.removeProperty('--fy');
    });
    share.classList.remove('done');
    openMenu();
  }

  function setFloodOrigin(el, event) {
    const bounds = el.getBoundingClientRect();
    el.style.setProperty('--fx',
      `${(event.clientX - bounds.left) / bounds.width * 100}%`);
    el.style.setProperty('--fy',
      `${(event.clientY - bounds.top) / bounds.height * 100}%`);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand('copy');
      field.remove();
      ok ? resolve() : reject(new Error('Clipboard access unavailable'));
    });
  }

  async function chooseChannel(el, event) {
    if (busy) return;
    const channel = el.dataset.ch;
    setFloodOrigin(el, event);
    busy = true;
    el.classList.add('copied');

    if (channel === 'link') {
      setStatus('Copying…');
      try {
        // Clipboard write is invoked directly from this click gesture.
        await copyText(url);
        setStatus('Link copied');
        share.classList.remove('open');
        share.classList.add('done');
        share.setAttribute('aria-expanded', 'false');
        splay.classList.remove('open');
        opened = false;
        resetTimer = setTimeout(() => {
          busy = false;
          items.forEach(item => item.classList.remove('copied'));
        }, 1400);
      } catch {
        setStatus('Copy unavailable — use browser copy');
        busy = false;
      }
      return;
    }

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent('Take a look')}&body=${encodeURIComponent(url)}`,
      x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
    };
    setStatus(`Opening ${channel === 'x' ? 'X' : channel}…`);
    const destination = shareUrls[channel];
    if (destination) {
      if (channel === 'email') window.location.href = destination;
      else window.open(destination, '_blank', 'noopener,noreferrer');
    }
    setTimeout(() => {
      el.classList.remove('copied');
      setFloodOrigin(el, {clientX:el.getBoundingClientRect().left+19,clientY:el.getBoundingClientRect().top+19});
      busy = false;
      setStatus('Pick a channel');
    }, 800);
  }

  share.addEventListener('click', () => {
    if (share.classList.contains('done')) {
      reset();
      return;
    }
    opened ? closeMenu() : openMenu();
  });

  items.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      chooseChannel(item, event);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && opened) closeMenu();
  });

  // A tap on the backdrop closes the radial channel menu.
  stage.addEventListener('click', event => {
    if (opened && event.target === stage) closeMenu();
  });
})();