const experiences = [
  {
    company: "Nonprofit Organization",
    logo: "/assets/healthyhabitshub-logo.png",
    roles: [
      {
        title: "WordPress + Content Virtual Assistant",
        date: "Oct 2025 – Present",
        bullets: [
          "Developed and optimized WordPress websites using PHP, HTML/CSS, Elementor, child theme, Rank Math, Google Search Console, and Analytics, improving SEO visibility and site performance.",
          "Managed full web operations through cPanel and SFTP/FTP including troubleshooting, plugin management, and content integration.",
          "Created cohesive brand designs in Figma and Affinity ensuring consistent visuals across digital platforms.",
          "Centralized project management and workflow organization in Notion, leading to a more productive team environment."
        ]
      }
    ]
  },
  {
    company: "Dsignable",
    logo: "assets/dsignable_logo.jpeg",
    roles: [
      {
        title: "Full Stack Developer",
        date: "June 2025 – Present",
        bullets: [
          "Built and maintained cross-platform mobile features with React Native and Expo.",
          "Developed backend services with Firebase, handling authentication, data management, and cloud functions.",
          "Integrated Stripe for payments and Mapbox for maps, while conducting QA testing and bug fixes across multiple active projects.",
          "Collaborated asynchronously with international teams using Slack, Notion, GitHub, and Loom for smooth communication and workflow alignment."
        ]
      }
    ]
  },
  {
    company: "Live Church Network",
    logo: "/assets/lcn-logo.webp",
    roles: [
      {
        title: "WordPress Technical Specialist",
        date: "Oct 2025",
        bullets: [
          "Optimized and customized an existing WordPress site, troubleshooting plugins, PHP code, and hosting issues via SFTP/FTP, FileZilla, and GoDaddy.",
          "Enhanced UI/UX consistency and responsiveness across devices through design refinements and testing."
      ]
      }
    ]
  },
  {
    company: "One Earth Organics",
    logo: "assets/oeo_logo.png",
    roles: [
      {
        title: "Web Developer",
        date: "Sept 2025 – October 2025",
        bullets: [
          "Integrated PayMongo payment gateway into WooCommerce, enabling frictionless checkout for customers.",
        ]
      }
    ]
  },
  {
    company: "LyfBiz Solutions",
    logo: "assets/lyfbiz_logo.png",
    roles: [
      {
        title: "Business Systems Engineer",
        date: "Aug 2025 – October 2025",
        bullets: [
          "Built a centralized business management system using Notion to unify client and internal operations.",
          "Created custom automations using Make (Integromat) to reduce manual work and support team communication.",
          "Integrated Slack, Calendly, and Google Drive for collaboration and scheduling."
        ]
      },
      {
        title: "WordPress Developer",
        date: "Mar 2025 – Jul 2025",
        bullets: [
          "Delivered a responsive WordPress website using Elementor, translating Figma designs into a live product.",
          "Configured plugins such as Yoast SEO, and custom CSS to improve accessibility and search ranking.",
          "Led the entire project lifecycle while aligning with stakeholders on project goals and timelines."
        ]
      }
    ]
  },
  {
    company: "Schneider Electric",
    logo: "assets/se_logo.png",
    roles: [
      {
        title: "Applications Engineer (Intern)",
        date: "Feb 2024 – May 2024",
        bullets: [
          "Developed a quiz-based certification system to increase employee training engagement using Vue.js, PHP, HTML/CSS, Bootstrap, and MSSQL.",
          "Built and launched an internal communication platform used to support a key organizational event."
        ]
      }
    ]
  },
  {
    company: "De La Salle University-Dasmariñas",
    logo: "assets/dlsud_logo.jpg",
    roles: [
      {
        title: "Bachelors in Computer Engineering",
        date: "2020 – 2024",
        bullets: [
          "Specialized in Software Engineering, focusing on full-stack development, databases, and systems design."
        ]
      }
    ]
  }
];



const container = document.getElementById("experience-timeline");

experiences.forEach(exp => {
  const item = document.createElement("div");
  item.classList.add("timeline-item");

  const rolesHTML = (exp.roles || []).map(role => `
    <div class="timeline-header">
      <h3 class="timeline-title">${role.title}</h3>
      <span class="keyword pink timeline-date" data-full-date="${role.date}">${role.date}</span>
    </div>
    <div class="timeline-content">
      <ul>
        ${role.bullets.map(bullet => `<li>${bullet}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  item.innerHTML = `
    <div class="timeline-company">
      <img src="${exp.logo}" alt="${exp.company} Logo">
      <span class="timeline-company-name">${exp.company}</span>
    </div>
    ${rolesHTML}
  `;

  container.appendChild(item);
});

  // Simple reveal on scroll for timeline items
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  },{ threshold: 0.15 });

  document.querySelectorAll('.timeline-item').forEach(node => observer.observe(node));
// Date condense / restore helpers
function condenseAllDates() {
  document.querySelectorAll('.timeline-date').forEach(el => {
    const full = el.dataset.fullDate || el.textContent || '';
    const years = (full.match(/\d{4}/g) || []).join(' – ');
    if (years) el.textContent = years; else el.textContent = full;
  });
}

function restoreAllDates() {
  document.querySelectorAll('.timeline-date').forEach(el => {
    const full = el.dataset.fullDate;
    if (full) el.textContent = full;
  });
}

// Add toggle buttons (default to condensed for privacy)
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const controls = document.createElement('div');
  controls.className = 'about-controls';

  const btnDates = document.createElement('button');
  btnDates.textContent = 'Show full dates';
  btnDates.className = 'see-more-btn';

  const btnLogos = document.createElement('button');
  btnLogos.textContent = 'Hide logos';
  btnLogos.className = 'see-more-btn';

  controls.appendChild(btnDates);
  controls.appendChild(btnLogos);

  // insert controls below the about description and left-aligned
  const desc = aboutSection.querySelector('.about-description');
  if (desc && desc.parentNode) desc.parentNode.insertBefore(controls, desc.nextSibling);
  else aboutSection.appendChild(controls);


  let condensed = true;
  // hide logos by default for privacy; button will show them
  let logosHidden = true;

  btnDates.addEventListener('click', () => {
    condensed = !condensed;
    if (condensed) {
      condenseAllDates();
      btnDates.textContent = 'Show full dates';
    } else {
      restoreAllDates();
      btnDates.textContent = 'Show years only';
    }
  });

  btnLogos.addEventListener('click', () => {
    logosHidden = !logosHidden;
    document.querySelectorAll('.timeline-company img').forEach(img => {
      img.style.display = logosHidden ? 'none' : '';
    });
    btnLogos.textContent = logosHidden ? 'Show logos' : 'Hide logos';
  });

  // default: condense dates and hide logos
  condenseAllDates();
  btnDates.textContent = 'Show full dates';
  document.querySelectorAll('.timeline-company img').forEach(img => { img.style.display = 'none'; });
  btnLogos.textContent = 'Show logos';
}
