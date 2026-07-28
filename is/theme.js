(function(){
  const THEME_KEY = "nabokin_theme";
  function getTheme(){
    return localStorage.getItem(THEME_KEY) ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }
  function apply(theme){
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll("[data-theme-toggle]").forEach(btn=>{
      btn.setAttribute("aria-checked", theme === "light" ? "true" : "false");
    });
  }
  apply(getTheme());
  window.NabokinTheme = {
    toggle(){ apply(getTheme() === "dark" ? "light" : "dark"); },
    get: getTheme
  };
})();
