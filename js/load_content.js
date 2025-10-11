document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-link");
  const main = document.getElementById("main-content");

  async function loadTab(tab, pushState = true) {
    try {
      const res = await fetch(`sections/${tab}.html`);
      if (!res.ok) throw new Error(`${tab}.html not found`);
      const text = await res.text();
      main.innerHTML = `<div class="tab-content">${text}</div>`;

      // Update active button style
      buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));

      // Update the URL hash (so refresh remembers)
      if (pushState) history.pushState({ tab }, "", `#${tab}`);
    } catch (err) {
      main.innerHTML = `<p style="color:red">${err.message}</p>`;
    }
    // Re-initialize Twitter embeds if they exist
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
}
  }
  // async function loadTab(tab, pushState = true) {
  //   const res = await fetch(`sections/${tab}.html`);
  //   const text = await res.text();
  //   main.innerHTML = `<div class="tab-content">${text}</div>`;
  //   buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));
  //   if (pushState) history.pushState({ tab }, "", `#${tab}`);
  
  //   // Re-initialize Twitter embeds if needed
  //   if (window.twttr && window.twttr.widgets) {
  //     window.twttr.widgets.load();
  //   }
  // }

  // Button click handler
  buttons.forEach(b => b.addEventListener("click", () => loadTab(b.dataset.tab)));

  // Load tab from hash if it exists, otherwise default to 'about'
  const initialTab = location.hash.replace("#", "") || "about";
  loadTab(initialTab, false);

  // Handle browser back/forward navigation
  window.addEventListener("popstate", e => {
    const tab = e.state?.tab || "about";
    loadTab(tab, false);
  });
});
