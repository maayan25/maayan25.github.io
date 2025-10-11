// document.addEventListener("DOMContentLoaded", () => {
//     const tabLinks = document.querySelectorAll(".tab-link");
//     const main = document.getElementById("main-content");
  
//     async function loadTab(tabName, updateHash = true) {
//       try {
//         // Fetch the section HTML
//         const response = await fetch(`sections/${tabName}.html`);
//         if (!response.ok) throw new Error(`Failed to load ${tabName}.html`);
  
//         const html = await response.text();
//         main.innerHTML = html;
  
//         // Update active tab
//         tabLinks.forEach(btn => btn.classList.remove("active"));
//         const btn = document.querySelector(`.tab-link[data-tab="${tabName}"]`);
//         if (btn) btn.classList.add("active");
  
//         // Update hash and scroll
//         if (updateHash) history.replaceState(null, "", `#${tabName}`);
//         window.scrollTo({ top: 0, behavior: "smooth" });
  
//       } catch (err) {
//         console.error(err);
//         main.innerHTML = `<p style="color:red;">Error loading content: ${err.message}</p>`;
//       }
//     }
  
//     // Tab click events
//     tabLinks.forEach(btn => {
//       btn.addEventListener("click", () => loadTab(btn.dataset.tab));
//     });
  
//     // Load initial tab based on URL hash or default to 'about'
//     const initial = window.location.hash.replace("#", "") || "about";
//     loadTab(initial, false);
//   });

//   async function loadTab(tabName, updateHash = true) {
//     console.log("Fetching section:", `sections/${tabName}.html`);
//     try {
//       const response = await fetch(`sections/${tabName}.html`);
//       if (!response.ok) throw new Error(`Failed to load ${tabName}.html`);
//       const html = await response.text();
//       main.innerHTML = html;
//     } catch (err) {
//       console.error(err);
//       main.innerHTML = `<p style="color:red;">Error loading content: ${err.message}</p>`;
//     }
//   }
  
(function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const sections = document.querySelectorAll('main section');
  
    function showTab(tabName) {
      tabLinks.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
  
      const btn = document.querySelector(`[data-tab="${tabName}"]`);
      const sec = document.getElementById(tabName);
      if (btn && sec) {
        btn.classList.add('active');
        sec.classList.add('active');
      }
  
      // update URL hash (optional)
      history.replaceState(null, '', `#${tabName}`);
    }
  
    tabLinks.forEach(button => {
      button.addEventListener('click', () => {
        showTab(button.dataset.tab);
        // new line: reset scroll
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  
    // default tab or hash
    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.replace('#', '');
      const initial = (hash && document.getElementById(hash)) ? hash : 'about';
      showTab(initial);
    });
  })();