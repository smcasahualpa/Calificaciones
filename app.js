const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const passwordToggle = document.querySelector('#password-toggle');
const errorMessage = document.querySelector('#login-error');
const loginView = document.querySelector('#login-view');
const homeView = document.querySelector('#home-view');

function setPasswordVisible(visible) {
  passwordInput.type = visible ? 'text' : 'password';
  passwordToggle.setAttribute('aria-pressed', String(visible));
  passwordToggle.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
  passwordToggle.querySelector('.eye-slash').toggleAttribute('hidden', !visible);
}

passwordToggle.addEventListener('click', () => {
  setPasswordVisible(passwordInput.type === 'password');
});

function clearError() {
  errorMessage.textContent = '';
  usernameInput.removeAttribute('aria-invalid');
  passwordInput.removeAttribute('aria-invalid');
}

loginForm.addEventListener('input', clearError);
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const valid = usernameInput.value.trim() === DEMO_STUDENT.username
    && passwordInput.value === DEMO_STUDENT.password;

  if (!valid) {
    errorMessage.textContent = 'Usuario o contraseña incorrectos.';
    usernameInput.setAttribute('aria-invalid', 'true');
    passwordInput.setAttribute('aria-invalid', 'true');
    passwordInput.focus();
    return;
  }

  clearError();
  loginForm.reset();
  setPasswordVisible(false);
  loginView.hidden = true;
  homeView.hidden = false;
  document.body.classList.add('is-authenticated');
  updateDate();
  window.scrollTo(0, 0);
  document.querySelector('#welcome-title').focus();
});

document.querySelector('#logout-button').addEventListener('click', () => {
  document.querySelectorAll('.sidebar-nav details').forEach(menu => { menu.open = false; });
  setMenuOpen(false);
  homeView.hidden = true;
  loginView.hidden = false;
  document.body.classList.remove('is-authenticated');
  clearError();
  usernameInput.focus();
});

function updateDate() {
  const now = new Date();
  const dateOptions = { timeZone: 'America/Guayaquil' };
  const weekday = new Intl.DateTimeFormat('es-EC', { ...dateOptions, weekday: 'long' }).format(now);
  const date = new Intl.DateTimeFormat('es-EC', { ...dateOptions, day: 'numeric', month: 'long', year: 'numeric' }).format(now);
  document.querySelector('#today').textContent = `Hoy es ${weekday[0].toUpperCase() + weekday.slice(1)}, ${date}`;
  document.querySelector('#copyright-year').textContent = new Intl.DateTimeFormat('es-EC', { ...dateOptions, year: 'numeric' }).format(now);
}

const menuToggle = document.querySelector('#menu-toggle');
const sidebarShade = document.querySelector('#sidebar-shade');
const mobileLayout = window.matchMedia('(max-width: 900px)');

function setMenuOpen(open) {
  homeView.classList.toggle('menu-open', open);
  sidebarShade.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  document.querySelector('#sidebar').inert = mobileLayout.matches && !open;
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(!homeView.classList.contains('menu-open'));
  if (homeView.classList.contains('menu-open')) document.querySelector('#home-button').focus();
});
sidebarShade.addEventListener('click', () => { setMenuOpen(false); menuToggle.focus(); });
mobileLayout.addEventListener('change', () => setMenuOpen(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && homeView.classList.contains('menu-open')) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});
setMenuOpen(false);

document.querySelector('#home-button').addEventListener('click', () => {
  setMenuOpen(false);
  window.scrollTo(0, 0);
  document.querySelector('#welcome-title').focus();
});

const portalDialog = document.querySelector('#portal-dialog');
function showDialog(title, content, isCard = false) {
  portalDialog.classList.toggle('portal-dialog--carnet', isCard);
  document.querySelector('#dialog-title').textContent = title;
  const container = document.querySelector('#dialog-content');
  container.replaceChildren();
  if (typeof content === 'string') {
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    container.append(paragraph);
  } else container.append(content);
  portalDialog.showModal();
}
document.querySelector('#dialog-close').addEventListener('click', () => portalDialog.close());
portalDialog.addEventListener('click', (event) => {
  if (event.target !== portalDialog) return;
  const rect = portalDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) portalDialog.close();
});

let recordTrigger;
function setRecordView(trigger) {
  const open = Boolean(trigger);
  const history = trigger?.dataset.section === 'Historial académico';
  if (open) recordTrigger = trigger;
  setMenuOpen(false);
  homeView.classList.toggle('show-record', open);
  homeView.classList.toggle('show-history', history);
  homeView.classList.remove('show-periods', 'show-grades');
  document.querySelector('#grades-content').hidden = true;
  document.querySelector('#periods-content').hidden = true;
  document.querySelector('#record-view').hidden = !open;
  document.querySelector('#personal-content').hidden = !open || history;
  document.querySelector('#history-content').hidden = !open || !history;
  const title = document.querySelector('#record-title');
  title.textContent = history ? 'Reporte / Historial académico / Proceso educativo' : 'Datos personales';
  window.scrollTo(0, 0);
  (open ? title : mobileLayout.matches ? menuToggle : recordTrigger).focus({ preventScroll: true });
}
document.querySelectorAll('[data-record-home]').forEach(button => {
  button.addEventListener('click', () => setRecordView(null));
});
function showPeriods() {
  homeView.classList.remove('show-history', 'show-grades');
  document.querySelector('#grades-content').hidden = true;
  homeView.classList.add('show-periods');
  document.querySelector('#history-content').hidden = true;
  document.querySelector('#periods-content').hidden = false;
  const title = document.querySelector('#record-title');
  title.textContent = 'Grado / Reporte / Historial académico / Período académico';
  window.scrollTo(0, 0);
  title.focus({ preventScroll: true });
}
document.querySelector('#grades-button').addEventListener('click', showPeriods);
document.querySelector('#fifth-grades-button').addEventListener('click', () => {
  homeView.classList.add('show-grades');
  document.querySelector('#periods-content').hidden = true;
  document.querySelector('#grades-content').hidden = false;
  const title = document.querySelector('#record-title');
  title.textContent = 'Grado / Reporte / Historial académico / Calificaciones';
  document.querySelector('.grades-scroll').scrollLeft = 0;
  window.scrollTo(0, 0);
  title.focus({ preventScroll: true });
});
document.querySelector('#grades-back').addEventListener('click', () => {
  showPeriods();
  document.querySelector('#fifth-grades-button').focus({ preventScroll: true });
});
const gradesScroll = document.querySelector('.grades-scroll');
const gradesRange = document.querySelector('#grades-scroll-range');
const reducedScrollMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let gradesScrollFrame = 0;
let gradesScrollTarget = 0;
let gradesScrollTime = 0;

function stopGradesScrollAnimation() {
  cancelAnimationFrame(gradesScrollFrame);
  gradesScrollFrame = 0;
}

function updateGradesScrollbar() {
  gradesRange.max = Math.max(0, gradesScroll.scrollWidth - gradesScroll.clientWidth);
  if (!gradesScrollFrame) gradesRange.value = gradesScroll.scrollLeft;
  gradesRange.style.setProperty('--scroll-thumb', Math.min(100, 100 * gradesScroll.clientWidth / (gradesScroll.scrollWidth || 1)) + '%');
}

function animateGradesScroll(now) {
  const elapsed = Math.min(now - gradesScrollTime, 64);
  gradesScrollTime = now;
  const remaining = gradesScrollTarget - gradesScroll.scrollLeft;
  if (Math.abs(remaining) <= 1) {
    gradesScroll.scrollLeft = gradesScrollTarget;
    gradesScrollFrame = 0;
    updateGradesScrollbar();
    return;
  }
  gradesScroll.scrollLeft += remaining * (1 - Math.exp(-elapsed / 55));
  gradesScrollFrame = requestAnimationFrame(animateGradesScroll);
}

new ResizeObserver(() => {
  stopGradesScrollAnimation();
  updateGradesScrollbar();
}).observe(gradesScroll);
gradesScroll.addEventListener('scroll', updateGradesScrollbar);
gradesRange.addEventListener('input', () => {
  gradesScrollTarget = Number(gradesRange.value);
  if (reducedScrollMotion.matches) {
    stopGradesScrollAnimation();
    gradesScroll.scrollLeft = gradesScrollTarget;
  } else if (!gradesScrollFrame) {
    gradesScrollTime = performance.now();
    gradesScrollFrame = requestAnimationFrame(animateGradesScroll);
  }
});
// El gesto táctil, la rueda y el teclado conservan el desplazamiento nativo.
for (const eventName of ['pointerdown', 'touchstart', 'wheel', 'keydown']) {
  gradesScroll.addEventListener(eventName, () => {
    stopGradesScrollAnimation();
    updateGradesScrollbar();
  }, { passive: true });
}
reducedScrollMotion.addEventListener('change', () => {
  stopGradesScrollAnimation();
  updateGradesScrollbar();
});
document.querySelector('#periods-back').addEventListener('click', () => {
  setRecordView(document.querySelector('[data-section="Historial académico"]'));
  document.querySelector('#grades-button').focus({ preventScroll: true });
});
document.querySelector('#card-button').addEventListener('click', () => {
  const card = document.createElement('img');
  card.src = 'imagenes%20pantalla%20principal/carnet-digital.png';
  card.alt = 'Carnet digital institucional de Samanta Michelle Casahualpa Perez, anverso y reverso';
  card.className = 'digital-card';
  showDialog('Carnet Institucional', card, true);
});
document.querySelectorAll('[data-section]').forEach((button) => {
  button.addEventListener('click', () => {
    setRecordView(button);
  });
});
document.querySelectorAll('[data-service]').forEach((button) => {
  button.addEventListener('click', () => {
    showDialog(button.dataset.service, 'Este servicio institucional no está conectado en la versión de prueba.');
  });
});
