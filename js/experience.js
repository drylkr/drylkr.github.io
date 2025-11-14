const experiences = [
  {
    company: "Australian Nonprofit",
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
      <span class="keyword green timeline-date">${role.date}</span>
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
