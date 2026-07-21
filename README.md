# Personal Portfolio Website

This is my personal portfolio website, created to introduce myself, showcase my technical and creative skills, and present the projects I am building while studying programming and information technology in Japan.

## Live Website

[View My Portfolio](https://s1oadkl.github.io/Portfolio-Website/)

## About the Website

The website is a responsive, multi-page portfolio built with HTML, CSS, and JavaScript. It includes both English and Japanese language support and is designed to make my profile, skills, learning projects, and contact information easy to explore.

## Main Features

- Responsive design for desktop, tablet, and mobile devices
- English and Japanese language switcher
- Sticky navigation header
- Home, About, Skills, Projects, and Contact pages
- Skill progress bars with technology icons
- Project categories for Web, Python, Tools, Design, and Other work
- Links to GitHub projects and social media profiles
- Contact form powered by Formspree
- Form validation and submission status messages
- Spam-protection field in the contact form
- Floating back-to-top button
- Accessible labels and navigation attributes
- Organized comments in HTML, CSS, and JavaScript files for easier future editing
- Published with GitHub Pages

## Pages

### Home

Introduces my portfolio, current role, learning goals, and important sections of the website.

### About

Includes information about my education, background, and the technologies and tools I am currently learning.

### Skills

Displays my current skills and learning progress in:

- HTML
- CSS
- JavaScript
- Python
- Linux
- Microsoft Office
- Video editing
- Adobe Photoshop
- Adobe Illustrator
- Figma

### Learning Projects

Organizes my practice projects into the following categories:

- Web
- Python
- Computer tools
- Design
- Other creative work

### Contact

Includes my contact information, social links, and a working contact form for internships, collaborations, freelance work, and other opportunities.

## Projects Included

### Portfolio Website

A responsive bilingual portfolio website built to present my profile, skills, education, contact information, and learning projects.

**Technologies:**

- HTML
- CSS
- JavaScript
- Formspree
- GitHub Pages

### Café Website

A multi-page café website created to practise responsive layouts and basic web design.

[View Café Website Repository](https://github.com/s1oadkl/Cafe-Website)

### Python Calculator

A beginner Python project created to practise user input, variables, conditions, functions, validation, and calculation logic.

[View Python Calculator Repository](https://github.com/s1oadkl/Python_Calculator)

### Student Grade System

A Python program that validates student marks and calculates the total, average, grade, and pass or fail result.

[View Student Grade System Repository](https://github.com/s1oadkl/student-grade-system)

### Design Projects

Practice projects created using Photoshop, Illustrator, and Figma.

[View Design Projects Repository](https://github.com/s1oadkl/Design-Projects)

### Linux Command Practice

A learning project for practising basic Linux commands, file operations, and terminal usage.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Formspree
- Git
- GitHub
- GitHub Pages
- Google Fonts

## Fonts

The website uses:

- **Inter** for English text
- **Noto Sans JP** for Japanese text

## Project Structure

```text
Portfolio-Website/
├── index.html
├── about.html
├── skills.html
├── projects.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── script.js
│   └── translations.js
├── images/
├── README.md
└── other project files
```

## Language System

Text that supports translation uses `data-i18n` attributes in the HTML files.

Example:

```html
<h1 data-i18n="home.title">Modern web design and programming.</h1>
```

The English and Japanese translations are stored in:

```text
js/translations.js
```

When adding new translated text:

1. Add a unique `data-i18n` key to the HTML element.
2. Add the same key to the English translation object.
3. Add the same key to the Japanese translation object.

## Contact Form

The contact form uses Formspree to send messages directly from the website.

The Formspree endpoint is located in `contact.html`:

```html
<form
  id="contact-form"
  action="https://formspree.io/f/xbdnkywj"
  method="POST"
>
```

The form includes:

- Name
- Email
- Subject
- Message
- Spam protection
- Sending, success, and error messages

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/s1oadkl/Portfolio-Website.git
```

2. Open the project folder:

```bash
cd Portfolio-Website
```

3. Open `index.html` in a web browser.

You can also use the **Live Server** extension in Visual Studio Code for easier testing.

No additional installation is required.

## Updating the Website

After editing the website, open the project folder in Visual Studio Code and run:

```bash
git status
git add .
git commit -m "Update portfolio website"
git pull --rebase origin main
git push origin main
```

GitHub Pages will automatically publish the latest version after the changes are pushed.

## Maintenance Notes

- Edit visible bilingual text in `js/translations.js`.
- Keep every translation key available in both English and Japanese.
- Update skill percentages in both `skills.html` and the matching `.fill-*` class in `css/styles.css`.
- Add new project translation keys when adding a new project card.
- Replace placeholder social-media URLs in `contact.html` with the correct profile links.
- Keep `script.js` connected because it controls language switching, the contact form, and the back-to-top button.
- Comments have been added throughout the main files to make future editing easier.

## Future Improvements

- Add more Python and Linux projects
- Add screenshots or preview images for each project
- Add a downloadable résumé
- Improve project filtering
- Add more JavaScript interactions
- Add certificates and achievements
- Improve accessibility testing
- Continue improving mobile responsiveness

## Author

**Kumar Shrestha**

IT vocational school student and aspiring programmer based in Nagoya, Japan.

## License

This project is created for personal, educational, and portfolio purposes.
