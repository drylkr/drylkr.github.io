// Using a single pink theme for keyword/project accents — colorKey is unused.

// Projects list (latest -> oldest). GridStats is commented out.
const projects = [
	// {
	// 	title: "meditate.com.au",
	// 	description: "Australia's calm, trustworthy, research-informed guide to meditation and mindfulness.",
	// 	githubLink: "",
	// 	projectLink: "https://meditate.com.au",
	// 	colorKey: "blue",
	// 	status: "Work in progress",
	// },
	{
		title: "Sync My Ride",
		description: "Mobile app for organizing car meets with real-time navigation, 'follow the leader', and crew management.",
		githubLink: "",
		projectLink: "https://syncmyrideapp.com",
		colorKey: "blue",
		status: "Work in progress",
	},
	{
		title: "Australian Public Interest Alliance Inc. (APIA)",
		description: "Independent not-for-profit coordinating public-interest initiatives in Australia for public benefit.",
		githubLink: "",
		projectLink: "https://apia.org.au",
		colorKey: "red",
	},
	{
		title: "SpendHer Hotline",
		description: "A mobile app that connects users with creators via private calls or in-app chat, with subscriptions and secure payments.",
		githubLink: "",
		projectLink: "https://spendherapp.com",
		colorKey: "purple",
	},
	{
		title: "MyTassel",
		description: "Graduation platform for announcements, event sharing, and registries.",
		githubLink: "",
		projectLink: "https://mytassel.com",
		colorKey: "green",
		status: "Work in progress",
	},
	// {
	// 	title: "Lyfbiz Solutions",
	// 	description: "A responsive WordPress landing page built for Lyfbiz Solutions.",
	// 	githubLink: "",
	// 	projectLink: "https://lyfbizsolutions.com",
	// 	colorKey: "orange",
	// },
	{
		title: "Finance Tracker",
		description: "A full-stack finance dashboard that helps you track income, expenses, and investments.",
		githubLink: "https://github.com/drylkr/finance-tracker",
		projectLink: "https://finance-tracker-steel-alpha.vercel.app",
		colorKey: "yellow",
	},
	// GridStats (temporarily hidden)
	// {
	//   title: "GridStats",
	//   description: "Clean, responsive landing page concept for a Formula 1 analytics hub.",
	//   githubLink: "https://github.com/drylkr/grid-stats",
	//   projectLink: "https://grid-stats.vercel.app",
	//   colorKey: "red"
	// },
	{
		title: "Spotify Bot",
		description: "A bot that tracks Spotify playlist and user stats and sends Telegram updates.",
		githubLink: "https://github.com/drylkr/spotifyBot",
		projectLink: "https://github.com/drylkr/spotifyBot",
		colorKey: "green",
		tech: ["Node.js", "Telegram API"]
	}
];

function renderProjects() {
	const grid = document.querySelector('.projects-grid');
	if (!grid) return;

	const section = grid.closest('section');
	const mode = section && section.dataset && section.dataset.mode ? section.dataset.mode : 'all';
	const limit = section && section.dataset && section.dataset.limit ? parseInt(section.dataset.limit, 10) : 3;

	let projectsToRender;
	const highlightList = section && section.dataset && section.dataset.highlight ? section.dataset.highlight.split(',').map(s => s.trim()).filter(Boolean) : null;

	if (highlightList && highlightList.length) {
		projectsToRender = highlightList.map(title => projects.find(p => p.title.toLowerCase() === title.toLowerCase())).filter(Boolean);
	} else {
		projectsToRender = mode === 'highlight' ? projects.slice(0, limit) : projects;
	}

	// clear existing
	grid.innerHTML = '';

	projectsToRender.forEach(project => {
		const card = document.createElement('div');
		card.className = 'project-card';

		// inner wrapper for tilt transform
		const inner = document.createElement('div');
		inner.className = 'project-inner';

		const githubIcon = project.githubLink
			? `<a href="${project.githubLink}" target="_blank" class="project-github">` +
				`<svg class="github-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">` +
				`<path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.776.42-1.305.763-1.606-2.665-.304-5.466-1.335-5.466-5.932 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.137 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.236 1.91 1.236 3.22 0 4.61-2.804 5.625-5.476 5.922.43.37.823 1.1.823 2.215 0 1.598-.014 2.888-.014 3.28 0 .32.217.694.825.576C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>`
			: '';

		inner.innerHTML = `
			<div class="project-header">
				<div>
					<h3 class="project-title">${project.title}</h3>
					${project.status ? `<span class="project-status">${project.status}</span>` : ''}
				</div>
				${githubIcon}
			</div>
			<p class="project-description">${project.description}</p>
		`;

		card.appendChild(inner);

		// click opens project link in a new tab (no modal)
		card.addEventListener('click', (e) => {
			// prefer projectLink, fall back to githubLink
			const url = project.projectLink || project.githubLink;
			if (!url) return;
			window.open(url, '_blank', 'noopener');
		});

		const githubLink = card.querySelector('.project-github');
		if (githubLink) githubLink.addEventListener('click', e => e.stopPropagation());

		// remove tilt: rely on subtle hover polish in CSS
		card.addEventListener('mouseleave', () => { inner.style.transform = ''; });

		grid.appendChild(card);
	});

	// If the number of rendered cards is odd, make the last one span two columns.
	const total = grid.children.length;
	if (total % 2 === 1) {
		grid.children[total - 1].classList.add('span-2');
	}
}

document.addEventListener('DOMContentLoaded', renderProjects);
// `openProjectModal` removed — project cards now open links directly in a new tab.
