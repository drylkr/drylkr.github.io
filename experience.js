const experiences = [
  {
    company: "Dsignable",
    logo: "assets/dsignable_logo.jpeg",
    roles: [
      {
        title: "Full Stack Developer",
        date: "June 2025 – Present",
        bullets: [
          "Built and maintained cross-platform mobile features with React Native, Figma, and Expo, delivering seamless user experiences across devices.",
          "Designed and managed backend services with Firebase Firestore, including authentication, database structure, and serverless functions to support scalable growth.",
          "Facilitated async collaboration across international team members using Slack, Notion, GitHub, and Loom for smooth communication and documentation."
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
        date: "Sept 2025 – Present",
        bullets: [
          "Integrated PayMongo payment gateway into WooCommerce, enabling secure and frictionless checkout for customers.",
          "Developed a dynamic shipping calculator to provide real-time cost estimates, improving conversion rates and reducing cart abandonment."
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
        date: "Aug 2025 – Present",
        bullets: [
          "Developed a centralized business system using Notion to unify operations, streamline workflows, and improve internal visibility.",
          "Redesigned and optimized database structures for client management, process tracking, and executive reporting dashboards.",
          "Automated repetitive tasks via Make (formerly Integromat), integrating Slack, Calendly, and Google Drive to reduce manual work and boost team productivity."
        ]
      },
      {
        title: "WordPress Developer",
        date: "Mar 2025 – Jul 2025",
        bullets: [
          "Delivered a responsive WordPress website using Elementor, translating Figma designs into a polished live product.",
          "Configured plugins, SEO tools, and custom CSS to improve site performance, search ranking, and brand consistency.",
          "Collaborated with internal teams and stakeholders to scope and align future development initiatives."
        ]
      }
    ]
  },
  {
    company: "Schneider Electric",
    logo: "assets/se_logo.png",
    roles: [
      {
        title: "Applications Engineer Intern",
        date: "Feb 2024 – May 2024",
        bullets: [
          "Built a quiz-based certification system and internal messaging web app alongside fellow interns, improving employee training engagement.",
          "Developed role-based login views with Vue.js, PHP, and Bootstrap, ensuring secure and personalized access to internal tools."
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
