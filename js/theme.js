const themeToggle = document.querySelector('#themeToggle');
const html = document.querySelector('html');

// for theme acc. to system
function theme() {
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		localStorage.setItem('color-theme', 'dark');
	} else {
		localStorage.setItem('color-theme', 'light');
	}
	if (localStorage.getItem('color-theme') === 'dark') {
		html.classList.add('dark');
		themeToggle.src = './images/icon-sun.svg';
	} else if (localStorage.getItem('color-theme') === 'light') {
		html.classList.remove('dark');
		themeToggle.src = './images/icon-moon.svg';
	}
}
theme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
	const newColorScheme = event.matches ? 'dark' : 'light';
	theme();
});

// for toggling Dark/Light theme

themeToggle.addEventListener('click', () => {
	if (html.classList.contains('dark')) {
		html.classList.remove('dark');
		themeToggle.src = './images/icon-moon.svg';
	} else {
		html.classList.add('dark');
		themeToggle.src = './images/icon-sun.svg';
	}
});
