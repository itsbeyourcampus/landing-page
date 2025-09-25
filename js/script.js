 //Script per la navbar sticky 

  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });



  // Script form CTA con validazione email + redirect personalizzato
const form = document.querySelector(".cta-form");
const emailField = document.getElementById("email");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

form.addEventListener("submit", function (e) {
  // Controllo email
  if (!emailRegex.test(emailField.value)) {
    e.preventDefault(); // blocca solo se non valida
    alert("Inserisci un indirizzo email valido.");
    emailField.focus();
    return;
  }

  // ✅ Se valida → invia a Formspree (grazie all'action)
  // e forza il redirect alla tua pagina "grazie"
  e.preventDefault(); // blocca il redirect di Formspree
  const data = new FormData(form);

  fetch("https://formspree.io/f/mqaykqkv", {
    method: "POST",
    body: data,
    headers: { "Accept": "application/json" }
  }).then(() => {
    window.location.href = "https://itsbeyourcampus.it/grazie/";
  }).catch(() => {
    alert("Errore nell'invio del form, riprova.");
  });
});

    


  




//Particles.js 


  particlesJS("plexus-verde", {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 800 } },
      color: { value: "#34d399" }, // verde
      shape: { type: "circle" },
      opacity: { value: 1 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 140,
        color: "#34d399",
        opacity: 0.8,
        width: 0.5
      },
      move: { enable: true, speed: 0.6 }
    },
    interactivity: { detect_on: "canvas", events: { resize: true } },
    retina_detect: true
  });

  particlesJS("plexus-arancione", {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 800 } },
      color: { value: "#f97316" }, // arancione
      shape: { type: "circle" },
      opacity: { value: 1 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 140,
        color: "#f97316",
        opacity: 0.8,
        width: 0.5
      },
      move: { enable: true, speed: 0.6 }
    },
    interactivity: { detect_on: "canvas", events: { resize: true } },
    retina_detect: true
  });



//Script Statistiche

  function animateValue(el, end, duration) {
    let start = 0, range = end, startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      el.textContent = Math.floor(progress * range);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = end;
      }
    }
    window.requestAnimationFrame(step);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.count');
    const boxes = document.querySelectorAll('.stat-box');

    const io = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target.querySelector('.count');
          const end = +el.getAttribute('data-val');
          animateValue(el, end, 2000);

          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    boxes.forEach(box => io.observe(box));
  });

  window.addEventListener("load", () => {
    window.scrollTo(0, 0);
    history.replaceState(null, null, " ");
  });




// Script Scroll to Top Button
  const scrollBtn = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });


// Script Circle Points
  const points = document.querySelectorAll('.circle-point');
  const centerX = 300;
  const centerY = 300;
  const radius = 230;

  points.forEach((point, index) => {
    const angle = (index / points.length) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
  });



//Script Popup Open Day 

window.addEventListener("load", function() {
const popup = document.getElementById("popup-openday");
const closeBtn = document.querySelector(".popup-close");
let mostrato = false;

function mostraPopup() {
  if (!mostrato) {
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
    mostrato = true;
    window.removeEventListener("scroll", mostraPopup);
  }
}

// Mostra popup al primo scroll
window.addEventListener("scroll", mostraPopup);

// Chiudi popup con la X
closeBtn.addEventListener("click", () => {
  popup.style.visibility = "hidden";
  popup.style.opacity = "0";
});

// Chiudi cliccando fuori
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.visibility = "hidden";
    popup.style.opacity = "0";
  }
});
});


//NAVBAR HAMBURGER E DROPDOWN
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-links");

  // Toggle menu al click dell'hamburger
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open"); 
  });

  // Chiude il menu quando si clicca un link normale
  const navLinks = document.querySelectorAll(".nav-links li a:not(.dropdown > a)");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  });

  // 🔴 Gestione dropdown al click
  const dropdownToggles = document.querySelectorAll(".dropdown > a");
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      e.preventDefault(); // evita che il link scorra la pagina
      const parent = toggle.parentElement;

      // Chiudi eventuali altri dropdown aperti
      document.querySelectorAll(".dropdown.open").forEach(drop => {
        if (drop !== parent) drop.classList.remove("open");
      });

      // Toggle su quello cliccato
      parent.classList.toggle("open");
    });
  });
});

// Aggiunge la classe "scrolled" alla navbar dopo lo scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ===== Redirect form CTA =====
const ctaForm = document.getElementById("cta");

if (ctaForm) {
  ctaForm.addEventListener("submit", () => {
    setTimeout(() => {
      window.location.href = "https://itsbeyourcampus.it/grazie/";
    }, 1000); // 1 secondo per dare tempo a Formspree
  });
}

