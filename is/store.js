/* ==========================================================================
   NabokinAuto — data store
   Everything the admin panel edits lives in one localStorage record.
   NOTE: this is client-side storage (per browser), see README for the
   limitation and how to upgrade to a real backend later.
   ========================================================================== */
(function(){
  const KEY = "nabokin_db_v1";

  const DEFAULTS = {
    settings: {
      passwordHash: null, // set on first run below
      siteName: "NabokinAuto",
      tagline: "Авто из Азии под заказ",
      logo: "images/nabokin-logo.png",
      phone: "8 800 444-49-43",
      phoneHref: "tel:88004444943",
      email: "autoteam@internet.ru",
      whatsapp: "+7 934 100-52-03",
      whatsappHref: "https://wa.me/79341005203",
      city: "г. Владивосток",
      address: "г. Владивосток, ул. Приморская, 12, офис 4",
      hoursText: "Пн–Сб, 9:00–20:00 (Владивосток)",
      hero: {
        eyebrow: "Japan / Korea / China",
        title: "Автомобили из Азии под заказ",
        lead: "NabokinAuto — надёжный подбор, проверка и доставка автомобилей из Японии, Кореи и Китая под ключ."
      },
      about: "Импорт автомобилей из Японии, Кореи и Китая под ключ. Подбор, проверка, торги и логистика.",
      legal: { company: "ИП Набокин В. А.", inn: "254003851318", ogrn: "325253600039821" }
    },
    news: [],
    reviews: [
      { id: "r1", name: "Дмитрий", rating: 5, date: "2026-05-14", text: "Заказывал кроссовер из Кореи — привезли на месяц раньше, чем в других компаниях обещали просто подбор." },
      { id: "r2", name: "Алина", rating: 5, date: "2026-06-02", text: "Понравилось, что перед покупкой прислали полный отчёт по состоянию и торгам, без сюрпризов на таможне." }
    ],
    messages: []
  };

  function loadRaw(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return null;
      return JSON.parse(raw);
    }catch(e){ return null; }
  }

  function saveRaw(db){
    localStorage.setItem(KEY, JSON.stringify(db));
  }

  function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

  // simple non-cryptographic hash — good enough to gate casual access only
  function hash(str){
    let h = 0;
    for(let i=0;i<str.length;i++){ h = (Math.imul(31,h) + str.charCodeAt(i))|0; }
    return "h" + h.toString(36);
  }

  function ensureInit(){
    let db = loadRaw();
    if(!db){
      db = JSON.parse(JSON.stringify(DEFAULTS));
      db.settings.passwordHash = hash("nabokin2026");
      saveRaw(db);
    }
    // merge in any new default keys added after the user's first visit
    let changed = false;
    for(const k of Object.keys(DEFAULTS)){
      if(!(k in db)){ db[k] = DEFAULTS[k]; changed = true; }
    }
    if(!db.settings) { db.settings = DEFAULTS.settings; changed = true; }
    for(const k of Object.keys(DEFAULTS.settings)){
      if(!(k in db.settings)){ db.settings[k] = DEFAULTS.settings[k]; changed = true; }
    }
    if(changed) saveRaw(db);
    return db;
  }

  const Store = {
    KEY, uid, hash,
    get(){ return ensureInit(); },
    set(db){ saveRaw(db); },
    update(fn){ const db = ensureInit(); fn(db); saveRaw(db); return db; },

    checkPassword(pwd){ const db = ensureInit(); return db.settings.passwordHash === hash(pwd); },
    setPassword(pwd){ this.update(db => { db.settings.passwordHash = hash(pwd); }); },

    addMessage(msg){
      this.update(db => {
        db.messages.unshift(Object.assign({ id: uid(), date: new Date().toISOString(), read: false }, msg));
      });
    },
    markMessageRead(id){ this.update(db => { const m = db.messages.find(x=>x.id===id); if(m) m.read = true; }); },
    deleteMessage(id){ this.update(db => { db.messages = db.messages.filter(x=>x.id!==id); }); },

    addNews(item){ this.update(db => { db.news.unshift(Object.assign({ id: uid(), date: new Date().toISOString() }, item)); }); },
    updateNews(id, patch){ this.update(db => { const n = db.news.find(x=>x.id===id); if(n) Object.assign(n, patch); }); },
    deleteNews(id){ this.update(db => { db.news = db.news.filter(x=>x.id!==id); }); },

    deleteReview(id){ this.update(db => { db.reviews = db.reviews.filter(x=>x.id!==id); }); },
    addReview(item){ this.update(db => { db.reviews.unshift(Object.assign({ id: uid(), date: new Date().toISOString() }, item)); }); },

    resetAll(){ localStorage.removeItem(KEY); ensureInit(); }
  };

  window.NabokinStore = Store;
  ensureInit();
})();
