/* ==========================================================================
   NabokinAuto — shared UI (header, footer, nav, modals, toasts, forms)
   ========================================================================== */
const Icons = {
  phone:'<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
  mail:'<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  whatsapp:'<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',
  pin:'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  car:'<path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/>',
  calc:'<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
  news:'<path d="M15 18h-5"/><path d="M18 14h-8"/><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="10" y="6" rx="1"/>',
  review:'<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/>',
  building:'<path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>',
  arrowRight:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUpRight:'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon:'<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  file:'<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/>',
  star:'<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>'
};
function icon(name, size=18, cls=""){
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}" aria-hidden="true">${Icons[name]||""}</svg>`;
}

const NAV_ITEMS = [
  { href:"index.html", label:"Главная" },
  { href:"cars.html", label:"Каталог" },
  { href:"calculator.html", label:"Калькулятор" },
  { href:"news.html", label:"Новости" },
  { href:"reviews.html", label:"Отзывы" },
  { href:"contacts.html", label:"Контакты" }
];

function currentPage(){
  const p = location.pathname.split("/").pop() || "index.html";
  return p === "" ? "index.html" : p;
}

function renderHeader(){
  const s = NabokinStore.get().settings;
  const page = currentPage();
  const links = NAV_ITEMS.map(n => `<a href="${n.href}" class="${n.href===page?'is-active':''}">${n.label}</a>`).join("");
  const el = document.getElementById("site-header");
  if(!el) return;
  el.innerHTML = `
  <div class="site-header-inner">
    <a class="brand" href="index.html">
      <img src="${s.logo}" alt="Логотип ${s.siteName}" onerror="this.style.display='none'">
      <span><strong>${s.siteName}</strong><small>${s.tagline}</small></span>
    </a>
    <nav class="nav-links" aria-label="Навигация по сайту">${links}</nav>
    <div class="header-tools">
      <a href="${s.phoneHref}" class="call-chip">${icon('phone',15)}<span>${s.phone}</span></a>
      <button type="button" class="gauge-toggle" role="switch" aria-checked="false" data-theme-toggle aria-label="Переключить тему">
        <span class="knob">${icon('sun',13)}</span>
      </button>
      <button type="button" class="burger" id="burgerBtn" aria-label="Открыть меню"><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="mobile-nav" id="mobileNav">
    <div class="mobile-nav-panel">
      ${NAV_ITEMS.map(n=>`<a href="${n.href}">${n.label}</a>`).join("")}
      <a href="${s.phoneHref}" class="call-chip">${icon('phone',15)}<span>${s.phone}</span></a>
    </div>
  </div>`;

  document.getElementById("burgerBtn").addEventListener("click", ()=>{
    document.getElementById("burgerBtn").classList.toggle("is-open");
    document.getElementById("mobileNav").classList.toggle("is-open");
  });
  document.getElementById("mobileNav").addEventListener("click", (e)=>{
    if(e.target.id === "mobileNav" || e.target.closest("a")){
      document.getElementById("burgerBtn").classList.remove("is-open");
      document.getElementById("mobileNav").classList.remove("is-open");
    }
  });
  document.querySelectorAll("[data-theme-toggle]").forEach(btn=>{
    btn.querySelector(".knob").innerHTML = NabokinTheme.get()==="light" ? icon('moon',13) : icon('sun',13);
    btn.addEventListener("click", ()=>{
      NabokinTheme.toggle();
      btn.querySelector(".knob").innerHTML = NabokinTheme.get()==="light" ? icon('moon',13) : icon('sun',13);
    });
  });
}

function renderFooter(){
  const s = NabokinStore.get().settings;
  const el = document.getElementById("site-footer");
  if(!el) return;
  el.innerHTML = `
  <div class="wrap footer-grid">
    <div>
      <div class="footer-kicker">${icon('building',17)} О компании ${s.siteName}</div>
      <p>${s.about}</p>
      <ul>
        <li>Подбор и покупка авто в Японии, Корее и Китае</li>
        <li>Полное сопровождение сделки: проверка, торги, логистика</li>
        <li>Юридическое оформление и таможенные процедуры</li>
        <li>Быстрый подбор автомобилей по России</li>
      </ul>
    </div>
    <div>
      <div class="footer-kicker">${icon('file',16)} Юридическая информация</div>
      <ul>
        <li>Компания: ${s.legal.company}</li>
        <li>ИНН: ${s.legal.inn}</li>
        <li>ОГРНИП: ${s.legal.ogrn}</li>
      </ul>
    </div>
    <div class="footer-contacts">
      <div class="footer-kicker">Контакты</div>
      <ul>
        <li>${icon('phone',16)}<a href="${s.phoneHref}">${s.phone}</a></li>
        <li>${icon('mail',16)}<a href="mailto:${s.email}">${s.email}</a></li>
        <li>${icon('whatsapp',16)}<a href="${s.whatsappHref}" target="_blank" rel="noopener">${s.whatsapp}</a></li>
        <li>${icon('pin',16)}<span>${s.city}</span></li>
      </ul>
      <button class="btn btn-primary btn-sm" style="margin-top:16px" data-open-modal="contact">Написать нам</button>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© ${new Date().getFullYear()} ${s.siteName}</span>
    <span>Сайт носит информационный характер и не является публичной офертой</span>
  </div>`;
}

/* ---------------- modals ---------------- */
const MODAL_DEFS = {
  order: {
    title: "Заказать авто",
    note: "Расскажите, что вы ищете — менеджер подберёт варианты и пришлёт расчёт.",
    fields: [
      { name:"name", label:"Ваше имя", required:true },
      { name:"phone", label:"Телефон", required:true, type:"tel" },
      { name:"car", label:"Марка / модель (если уже знаете)" },
      { name:"budget", label:"Бюджет, ₽" },
      { name:"message", label:"Комментарий", type:"textarea" }
    ]
  },
  consultation: {
    title: "Получить консультацию",
    note: "Оставьте контакты — перезвоним и ответим на все вопросы.",
    fields: [
      { name:"name", label:"Ваше имя", required:true },
      { name:"phone", label:"Телефон", required:true, type:"tel" },
      { name:"message", label:"Что хотите узнать?", type:"textarea" }
    ]
  },
  question: {
    title: "Задать вопрос",
    note: "Ответим в течение рабочего дня.",
    fields: [
      { name:"name", label:"Ваше имя", required:true },
      { name:"contact", label:"Телефон или e-mail", required:true },
      { name:"message", label:"Вопрос", type:"textarea", required:true }
    ]
  },
  contact: {
    title: "Написать нам",
    note: "Сообщение придёт напрямую в нашу CRM.",
    fields: [
      { name:"name", label:"Ваше имя", required:true },
      { name:"contact", label:"Телефон или e-mail", required:true },
      { name:"message", label:"Сообщение", type:"textarea", required:true }
    ]
  }
};

function buildModals(){
  let host = document.getElementById("modal-host");
  if(!host){ host = document.createElement("div"); host.id = "modal-host"; document.body.appendChild(host); }
  host.innerHTML = Object.entries(MODAL_DEFS).map(([key, def])=>{
    const fields = def.fields.map(f=>{
      const input = f.type === "textarea"
        ? `<textarea name="${f.name}" ${f.required?"required":""}></textarea>`
        : `<input type="${f.type||'text'}" name="${f.name}" ${f.required?"required":""}>`;
      return `<div class="field"><label>${f.label}</label>${input}</div>`;
    }).join("");
    return `
    <div class="modal-scrim" id="modal-${key}" data-modal="${key}">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title-${key}">
        <div class="modal-head">
          <h3 id="modal-title-${key}">${def.title}</h3>
          <button class="modal-close" data-close-modal aria-label="Закрыть">${icon('x',20)}</button>
        </div>
        <p class="modal-note">${def.note}</p>
        <form data-form-type="${key}">
          ${fields}
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center">Отправить</button>
        </form>
      </div>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-open-modal]").forEach(btn=>{
    btn.addEventListener("click", ()=> openModal(btn.getAttribute("data-open-modal")));
  });
  document.querySelectorAll(".modal-scrim").forEach(scrim=>{
    scrim.addEventListener("click", (e)=>{ if(e.target === scrim) closeModal(scrim.dataset.modal); });
    scrim.querySelector("[data-close-modal]").addEventListener("click", ()=> closeModal(scrim.dataset.modal));
    scrim.querySelector("form").addEventListener("submit", (e)=>{
      e.preventDefault();
      const form = e.target;
      const type = form.dataset.formType;
      const data = Object.fromEntries(new FormData(form).entries());
      NabokinStore.addMessage({ type, ...data });
      closeModal(type);
      form.reset();
      toast("Сообщение отправлено — мы скоро свяжемся с вами.");
    });
  });
}
function openModal(key){ document.getElementById("modal-"+key)?.classList.add("is-open"); document.body.style.overflow="hidden"; }
function closeModal(key){ document.getElementById("modal-"+key)?.classList.remove("is-open"); document.body.style.overflow=""; }

function toast(msg){
  let stack = document.querySelector(".toast-stack");
  if(!stack){ stack = document.createElement("div"); stack.className = "toast-stack"; document.body.appendChild(stack); }
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  stack.appendChild(t);
  setTimeout(()=>{ t.style.opacity="0"; t.style.transition="opacity .3s"; setTimeout(()=>t.remove(),300); }, 3800);
}

function initShell(){
  renderHeader();
  renderFooter();
  buildModals();
}
document.addEventListener("DOMContentLoaded", initShell);
