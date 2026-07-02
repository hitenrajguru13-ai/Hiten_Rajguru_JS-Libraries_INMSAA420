// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Scroll progress bar
window.addEventListener("scroll", () => {
  const progress = document.getElementById("scrollProgress");
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progressWidth = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

  if (progress) {
    progress.style.width = progressWidth + "%";
  }
});

// AOS scroll animations
if (window.AOS) {
  AOS.init({
    duration: 800,
    once: true,
    offset: 80,
  });
}

// GSAP hero animations
if (window.gsap) {
  gsap.from(".brand", {
    y: -25,
    opacity: 0,
    duration: 0.8,
  });

  gsap.from(".nav-links li", {
    y: -20,
    opacity: 0,
    duration: 0.7,
    stagger: 0.08,
    delay: 0.2,
  });

  gsap.from(".hero-eyebrow", {
    y: 40,
    opacity: 0,
    duration: 0.9,
    delay: 0.25,
  });

  gsap.from(".hero-title", {
    y: 80,
    opacity: 0,
    duration: 1.1,
    delay: 0.4,
  });

  gsap.from(".hero-text", {
    y: 40,
    opacity: 0,
    duration: 0.9,
    delay: 0.65,
  });

  gsap.from(".hero-actions .btn", {
    y: 25,
    opacity: 0,
    duration: 0.75,
    stagger: 0.12,
    delay: 0.85,
  });

  gsap.from(".stat", {
    y: 45,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    delay: 1.05,
  });
}

// Animated hero counters
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function runCounters() {
  if (countersStarted) return;

  const stats = document.querySelector(".hero-stats");
  if (!stats) return;

  const rect = stats.getBoundingClientRect();

  if (rect.top < window.innerHeight) {
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      let current = 0;
      const increment = Math.max(1, target / 70);

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        if (target === 4200) {
          counter.textContent = Math.floor(current).toLocaleString() + "m";
        } else if (target === 96) {
          counter.textContent = Math.floor(current) + "%";
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 18);
    });
  }
}

window.addEventListener("scroll", runCounters);
window.addEventListener("load", runCounters);

// Glide.js Brar-style gallery carousel
if (window.Glide && document.querySelector(".glide")) {
  new Glide(".glide", {
    type: "carousel",
    perView: 3,
    gap: 42,
    autoplay: 3500,
    hoverpause: true,
    animationDuration: 900,
    breakpoints: {
      1000: {
        perView: 2,
        gap: 28,
      },
      650: {
        perView: 1,
        gap: 20,
      },
    },
  }).mount();
}

// Leaflet interactive map
if (window.L && document.getElementById("trailMap")) {
  const map = L.map("trailMap", {
    scrollWheelZoom: false,
  }).setView([29.3, 82.7], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 14,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const createMarkerIcon = (color) => {
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 6px 18px rgba(0,0,0,.35);"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
  };

  const routes = [
    {
      name: "Kanchen Ridge Traverse",
      position: [27.7, 88.15],
      color: "#c95c28",
      info: "9 days · 3850m · Hard route",
    },
    {
      name: "Marsyandi Valley Loop",
      position: [28.53, 84.02],
      color: "#55765f",
      info: "6 days · 2600m · Moderate route",
    },
    {
      name: "Chandratal Pass",
      position: [32.48, 77.62],
      color: "#d9a719",
      info: "7 days · 4200m · Very hard route",
    },
  ];

  routes.forEach((route) => {
    L.marker(route.position, {
      icon: createMarkerIcon(route.color),
    })
      .addTo(map)
      .bindPopup(`<strong>${route.name}</strong><br>${route.info}`);
  });

  L.polyline(routes.map((route) => route.position), {
    color: "#c95c28",
    weight: 3,
    opacity: 0.75,
    dashArray: "8, 10",
  }).addTo(map);

  setTimeout(() => {
    map.invalidateSize();
  }, 500);
}

// Chart.js route difficulty line chart with fallback
const chartCanvas = document.getElementById("difficultyChart");
const fallbackChart = document.getElementById("fallbackChart");

if (chartCanvas && window.Chart) {
  if (fallbackChart) {
    fallbackChart.style.display = "none";
  }

  new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: ["Start", "Terrain", "Altitude", "Daily Hours", "Final Difficulty"],
      datasets: [
        {
          label: "Kanchen Ridge",
          data: [3, 8, 8.5, 7, 8.5],
          borderColor: "#c95c28",
          backgroundColor: "rgba(201,92,40,.13)",
          borderWidth: 4,
          pointRadius: 6,
          tension: 0.38,
          fill: true,
        },
        {
          label: "Marsyandi Valley",
          data: [2, 4.5, 5.5, 4.5, 5.5],
          borderColor: "#55765f",
          backgroundColor: "rgba(85,118,95,.13)",
          borderWidth: 4,
          pointRadius: 6,
          tension: 0.38,
          fill: true,
        },
        {
          label: "Chandratal Pass",
          data: [4, 7.5, 9.5, 6.5, 9.5],
          borderColor: "#d9a719",
          backgroundColor: "rgba(217,167,25,.13)",
          borderWidth: 4,
          pointRadius: 6,
          tension: 0.38,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Route Difficulty Score out of 10",
          color: "#101820",
          font: {
            size: 24,
            weight: "bold",
          },
        },
        legend: {
          position: "bottom",
          labels: {
            color: "#101820",
            font: {
              weight: "bold",
            },
          },
        },
      },
      scales: {
        y: {
          min: 0,
          max: 10,
          ticks: {
            color: "#101820",
          },
          title: {
            display: true,
            text: "Difficulty out of 10",
            color: "#101820",
          },
          grid: {
            color: "rgba(16,24,32,.1)",
          },
        },
        x: {
          ticks: {
            color: "#101820",
          },
          grid: {
            color: "rgba(16,24,32,.06)",
          },
        },
      },
    },
  });
} else if (fallbackChart) {
  fallbackChart.style.display = "block";
}
