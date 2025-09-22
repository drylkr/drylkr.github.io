const rootStyles = getComputedStyle(document.documentElement);

function getProjectColors(colorKey) {
  const hoverHex = rootStyles.getPropertyValue(`--project-hover-${colorKey}`).trim();
  const hoverRGB = rootStyles.getPropertyValue(`--project-hover-${colorKey}-rgb`).trim();
  const githubColor = rootStyles.getPropertyValue(`--keyword-${colorKey}-text`).trim();
  return { hoverHex, hoverRGB, githubColor };
}

// Define projects
const projects = [
  {
    title: "SpendHer Hotline",
    description: "A mobile app that connects users with creators via private calls or in-app chat, with subscriptions, wallet funding, and secure payments,",
    githubLink: "",
    projectLink: "https://spendherapp.com",
    colorKey: "purple"
  },
  {
    title: "Finance Tracker",
    description: "A full-stack finance dashboard that helps you track income, expenses, and investments.",
    githubLink: "https://github.com/drylkr/finance-tracker",
    projectLink: "https://finance-tracker-steel-alpha.vercel.app",
    colorKey: "blue"
  },
  {
    title: "Lyfbiz Solutions",
    description: "A responsive WordPress landing page built for Lyfbiz Solutions, a cosmetic marketing and retail solutions agency.",
    githubLink: "",
    projectLink: "https://lyfbizsolutions.com",
    colorKey: "orange"
  },
  {
    title: "GridStats",
    description: "Clean, responsive landing page concept for a Formula 1 analytics hub.",
    githubLink: "https://github.com/drylkr/grid-stats",
    projectLink: "https://grid-stats.vercel.app",
    colorKey: "red"
  },
  {
    title: "Spotify Bot",
    description: "A bot that tracks Spotify playlist and user stats and sends Telegram updates.",
    githubLink: "https://github.com/drylkr/spotifyBot",
    projectLink: "https://github.com/drylkr/spotifyBot",
    colorKey: "green"
  },
];

// Function to generate project cards
function renderProjects() {
  const grid = document.querySelector('.projects-grid');

  projects.forEach(project => {
    const { hoverHex, hoverRGB, githubColor } = getProjectColors(project.colorKey);

    const card = document.createElement('div');
    card.className = "project-card";
    card.style.setProperty('--hover-color', hoverHex);
    card.style.setProperty('--hover-rgb', hoverRGB);
    card.style.setProperty('--hover-github', githubColor);

    // Only include GitHub link if it exists
    const githubIcon = project.githubLink
      ? `<a href="${project.githubLink}" target="_blank" class="project-github">
          <svg class="github-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 
              0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 
              1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.776.42-1.305.763-1.606-2.665-.304-5.466-1.335-5.466-5.932 
              0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 
              0 0 1.008-.322 3.3 1.23a11.52 
              11.52 0 0 1 3.003-.404c1.02.005 2.047.137 
              3.003.404 2.29-1.552 3.297-1.23 
              3.297-1.23.655 1.653.243 2.873.12 
              3.176.77.84 1.236 1.91 1.236 
              3.22 0 4.61-2.804 5.625-5.476 
              5.922.43.37.823 1.1.823 2.215 
              0 1.598-.014 2.888-.014 3.28 
              0 .32.217.694.825.576C20.565 
              21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>`
      : "";

    card.innerHTML = `
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        ${githubIcon}
      </div>
      <p class="project-description">${project.description}</p>
    `;

    card.addEventListener("click", () => {
      window.open(project.projectLink, "_blank");
    });

    const githubLink = card.querySelector(".project-github");
    if (githubLink) {
      githubLink.addEventListener("click", e => e.stopPropagation());
    }

    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderProjects);
