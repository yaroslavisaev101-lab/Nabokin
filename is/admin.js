(function(){
  const SESSION_KEY = "nabokin_admin_session";

  function fileToDataUrl(file){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader();
      reader.onload = ()=> resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  function getPath(obj, path){ return path.split(".").reduce((o,k)=> (o||{})[k], obj); }
  function setPath(obj, path, value){
    const parts = path.split(".");
    let cur = obj;
    while(parts.length > 1){ const k = parts.shift(); cur[k] = cur[k] || {}; cur = cur[k]; }
    cur[parts[0]] = value;
  }

  function showApp(){
    document.getElementById("loginShell").style.display = "none";
    document.getElementById("adminShell").classList.add("is-visible");
    initDashboard();
  }
  function showLogin(msg){
    document.getElementById("adminShell").classList.remove("is-visible");
    document.getElementById("loginShell").style.display = "flex";
    if(msg) document.getElementById("loginError").textContent = msg;
  }

  document.getElementById("loginForm").addEventListener("submit", (e)=>{
    e.preventDefault();
    const pwd = new FormData(e.target).get("password");
    if(NabokinStore.checkPassword(pwd)){
      sessionStorage.setItem(SESSION_KEY, "1");
      document.getElementById("loginError").textContent = "";
      showApp();
    } else {
      document.getElementById("loginError").textContent = "Неверный пароль. Попробуйте ещё раз.";
    }
  });

  document.getElementById("logoutBtn").addEventListener("click", ()=>{
    sessionStorage.removeItem(SESSION_KEY);
    showLogin();
  });

  if(sessionStorage.getItem(SESSION_KEY) === "1"){ showApp(); } else { showLogin(); }

  const themeBtn = document.getElementById("adminThemeToggle");
  const themeKnob = document.getElementById("adminThemeKnob");
  function syncThemeKnob(){ themeKnob.innerHTML = NabokinTheme.get()==="light" ? icon('moon',13) : icon('sun',13); themeBtn.setAttribute("aria-checked", NabokinTheme.get()==="light"); }
  syncThemeKnob();
  themeBtn.addEventListener("click", ()=>{ NabokinTheme.toggle(); syncThemeKnob(); });

  /* ---------------- dashboard ---------------- */
  function initDashboard(){
    wireTabs();
    renderMessages();
    renderNewsAdmin();
    renderReviewsAdmin();
    fillTextsForm();
    wireNewsForm();
    wireLogoUpload();
    wirePasswordForm();
    wireReset();
  }

  function wireTabs(){
    document.querySelectorAll("#adminTabs button").forEach(btn=>{
      btn.addEventListener("click", ()=>{
        document.querySelectorAll("#adminTabs button").forEach(b=>b.classList.remove("is-active"));
        document.querySelectorAll(".admin-panel").forEach(p=>p.classList.remove("is-active"));
        btn.classList.add("is-active");
        document.querySelector(`.admin-panel[data-panel="${btn.dataset.tab}"]`).classList.add("is-active");
      });
    });
  }

  const TYPE_LABELS = { order:"Заказать авто", consultation:"Консультация", question:"Вопрос", contact:"Написать нам", calculator:"Калькулятор" };

  function renderMessages(){
    const db = NabokinStore.get();
    const host = document.getElementById("msgList");
    const unread = db.messages.filter(m=>!m.read).length;
    const badge = document.getElementById("msgCount");
    badge.style.display = unread ? "inline-block" : "none";
    badge.textContent = unread;

    if(db.messages.length === 0){
      host.innerHTML = `<div class="empty-state">${icon('review',30)}<h3>Сообщений пока нет</h3><p>Здесь появятся заявки с сайта.</p></div>`;
      return;
    }
    host.innerHTML = db.messages.map(m=>{
      const fields = Object.entries(m).filter(([k])=> !["id","type","date","read"].includes(k) && m[k]);
      return `
      <div class="msg-row ${m.read?'':'is-unread'}" data-id="${m.id}">
        <div style="flex:1">
          <span class="msg-type">${TYPE_LABELS[m.type]||m.type}</span>
          <div class="msg-meta">${new Date(m.date).toLocaleString('ru-RU')}</div>
          <div class="msg-text">${fields.map(([k,v])=>`<div><strong>${k}:</strong> ${String(v).replace(/</g,'&lt;')}</div>`).join("")}</div>
        </div>
        <div class="msg-actions">
          <button data-read="${m.id}" title="Отметить прочитанным">${icon('review',15)}</button>
          <button data-del="${m.id}" title="Удалить">${icon('x',15)}</button>
        </div>
      </div>`;
    }).join("");

    host.querySelectorAll("[data-read]").forEach(b=> b.addEventListener("click", ()=>{ NabokinStore.markMessageRead(b.dataset.read); renderMessages(); }));
    host.querySelectorAll("[data-del]").forEach(b=> b.addEventListener("click", ()=>{ NabokinStore.deleteMessage(b.dataset.del); renderMessages(); }));
  }

  function wireNewsForm(){
    const form = document.getElementById("newsForm");
    const fileInput = form.querySelector('input[type="file"]');
    const drop = form.querySelector(".file-drop");
    fileInput.addEventListener("change", ()=>{
      drop.firstChild.textContent = fileInput.files[0] ? fileInput.files[0].name : "Нажмите, чтобы выбрать фото с устройства";
    });
    form.addEventListener("submit", async (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      let image = "";
      if(fileInput.files[0]){
        try{ image = await fileToDataUrl(fileInput.files[0]); }
        catch(err){ toast("Не удалось загрузить фото"); }
      }
      NabokinStore.addNews({ title:data.title, excerpt:data.excerpt, image });
      form.reset();
      drop.firstChild.textContent = "Нажмите, чтобы выбрать фото с устройства";
      renderNewsAdmin();
      toast("Новость опубликована.");
    });
  }

  function renderNewsAdmin(){
    const news = NabokinStore.get().news;
    const host = document.getElementById("newsAdminList");
    if(news.length === 0){
      host.innerHTML = `<div class="empty-state">${icon('news',30)}<h3>Новостей нет</h3><p>Добавьте первую новость выше.</p></div>`;
      return;
    }
    host.innerHTML = news.map(n=>`
      <div class="news-item">
        ${n.image ? `<img src="${n.image}" alt="">` : `<div class="thumb-empty">${icon('news',22)}</div>`}
        <div class="info"><strong>${n.title}</strong><span>${new Date(n.date).toLocaleDateString('ru-RU')}</span></div>
        <button class="btn btn-danger btn-sm" data-del-news="${n.id}">Удалить</button>
      </div>`).join("");
    host.querySelectorAll("[data-del-news]").forEach(b=> b.addEventListener("click", ()=>{
      if(confirm("Удалить эту новость?")){ NabokinStore.deleteNews(b.dataset.delNews); renderNewsAdmin(); }
    }));
  }

  function renderReviewsAdmin(){
    const reviews = NabokinStore.get().reviews;
    const host = document.getElementById("reviewsAdminList");
    if(reviews.length === 0){
      host.innerHTML = `<div class="empty-state">${icon('review',30)}<h3>Отзывов нет</h3></div>`;
      return;
    }
    host.innerHTML = reviews.map(r=>`
      <div class="news-item">
        <div class="thumb-empty">${r.rating}★</div>
        <div class="info"><strong>${r.name}</strong><span>${r.text.slice(0,90)}${r.text.length>90?'…':''}</span></div>
        <button class="btn btn-danger btn-sm" data-del-review="${r.id}">Удалить</button>
      </div>`).join("");
    host.querySelectorAll("[data-del-review]").forEach(b=> b.addEventListener("click", ()=>{
      if(confirm("Удалить этот отзыв?")){ NabokinStore.deleteReview(b.dataset.delReview); renderReviewsAdmin(); }
    }));
  }

  function fillTextsForm(){
    const s = NabokinStore.get().settings;
    const form = document.getElementById("textsForm");
    form.querySelectorAll("[name]").forEach(input=>{
      const v = getPath(s, input.name);
      if(v !== undefined) input.value = v;
    });
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      NabokinStore.update(db=>{
        form.querySelectorAll("[name]").forEach(input=> setPath(db.settings, input.name, input.value));
      });
      const note = document.getElementById("textsSaveNote");
      note.classList.add("is-shown");
      setTimeout(()=> note.classList.remove("is-shown"), 2200);
      toast("Изменения сохранены — обновите страницы сайта, чтобы увидеть их.");
    });
  }

  function wireLogoUpload(){
    const input = document.getElementById("logoInput");
    input.addEventListener("change", async ()=>{
      if(!input.files[0]) return;
      try{
        const dataUrl = await fileToDataUrl(input.files[0]);
        NabokinStore.update(db=> db.settings.logo = dataUrl);
        document.getElementById("logoPreview").src = dataUrl;
        document.getElementById("logoPreview").style.opacity = "1";
        toast("Логотип обновлён.");
      }catch(err){ toast("Не удалось загрузить логотип."); }
    });
  }

  function wirePasswordForm(){
    const form = document.getElementById("passForm");
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const errEl = document.getElementById("passError");
      if(!NabokinStore.checkPassword(data.current)){ errEl.textContent = "Текущий пароль указан неверно."; return; }
      if(data.next !== data.confirm){ errEl.textContent = "Новый пароль и подтверждение не совпадают."; return; }
      NabokinStore.setPassword(data.next);
      errEl.textContent = "";
      form.reset();
      toast("Пароль обновлён.");
    });
  }

  function wireReset(){
    document.getElementById("resetBtn").addEventListener("click", ()=>{
      if(confirm("Точно сбросить все данные сайта? Это действие необратимо.")){
        NabokinStore.resetAll();
        toast("Данные сброшены.");
        setTimeout(()=> location.reload(), 700);
      }
    });
  }
})();
