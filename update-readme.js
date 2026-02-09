import fs from "fs";

function readme(repositorise) {
  return `
# 🌐 Sobhan-SRZA GitHub Projects

Welcome to my **portfolio of hosted websites**!  
All projects below are available live via [sobhan-srza.github.io](https://sobhan-srza.github.io).

---

## 🚀 Projects List

${repositorise}
| #   | Project                                                                             | Live Demo                                                        | Description                                                                                             | Languages                                                                                                                                                                                                                                                                                                                                                                             | Tech | ⭐ Stars                                                                                              | 🍴 Forks                                                                                              |
| --- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 1   | [jalali-datepicker-widget](https://github.com/Sobhan-SRZA/jalali-datepicker-widget) | [👀 View](https://sobhan-srza.github.io/jalali-datepicker-widget) | Lightweight Jalali (Shamsi/Persian) date picker using HTML, CSS, JS, jQuery, and PersianDate.           | ![HTML](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/html.svg) ![CSS](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/css.svg) ![JS](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/javascript.svg) | none | ![Stars](https://img.shields.io/github/stars/Sobhan-SRZA/jalali-datepicker-widget?style=flat-square) | ![Forks](https://img.shields.io/github/forks/Sobhan-SRZA/jalali-datepicker-widget?style=flat-square) |
| 2   | [image-gallery](https://github.com/Sobhan-SRZA/image-gallery)                       | [👀 View](https://sobhan-srza.github.io/image-gallery)            | گالری تصاویر با قابلیت نمایش تمام‌صفحه و سواپ.                                                           | ![HTML](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/html.svg) ![CSS](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/css.svg) ![JS](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/javascript.svg) | none | ![Stars](https://img.shields.io/github/stars/Sobhan-SRZA/image-gallery?style=flat-square)            | ![Forks](https://img.shields.io/github/forks/Sobhan-SRZA/image-gallery?style=flat-square)            |
| 3   | [hamburger-menu-template](https://github.com/Sobhan-SRZA/hamburger-menu-template)   | [👀 View](https://sobhan-srza.github.io/hamburger-menu-template)  | Responsive hamburger menu template for website headers. Written in Persian and AI-assisted by DeepSeek. | ![HTML](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/html.svg) ![CSS](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/css.svg) ![JS](https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/javascript.svg) | none | ![Stars](https://img.shields.io/github/stars/Sobhan-SRZA/hamburger-menu-template?style=flat-square)  | ![Forks](https://img.shields.io/github/forks/Sobhan-SRZA/hamburger-menu-template?style=flat-square)  |

<!-- Continue similar table for all other projects -->

---

## 📬 Contact Me

I"m open for collaboration or questions! Reach me via:

- **Email:** [sobhan@example.com](mailto:sobhan@example.com)
- **GitHub:** [Sobhan-SRZA](https://github.com/Sobhan-SRZA)
- **Portfolio:** [sobhan-srza.github.io](https://sobhan-srza.github.io)
- **Discord:** \`Sobhan-SRZA#1234\`

---

### ⚡ Tips

- Click the **👀 View** link to see the live hosted version of each project.
- Star ⭐ and fork 🍴 my repositories if you like them!
- All projects are responsive and optimized for modern browsers.

---

> Made with ❤️ by Sobhan-SRZA
    `;
}

async function generateMarkdownTable(repos, imagesPath) {
  const table = [];
  table.push("| #   | Project                                                                             | Live Demo                                                        | Description                                                                                             | Languages                                                                                                                                                                                                                                                                                                                                                                             | Tech | ⭐ Stars                                                                                              | 🍴 Forks                                                                                              |");
  table.push("| --- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |");

  let count = 0;
  repos?.forEach((repo) => {
    const langBadges = repo.languages
      ? repo.languages.map(a => {
        const language = encodeURIComponent(a);
        return `![Used ${language}](${imagesPath}/${language.toLowerCase()}.svg)`
      }).join(" ")
      : "`none`";

    const techBadges = repo.technologies
      ? repo.technologies.map(a => {
        const technology = encodeURIComponent(a);
        return `[!Used ${technology}](${imagesPath}/${technology.toLowerCase()}.svg)`;
      }).join(" ")
      : "`none`";

    const starsBadge = repo.private ? "`none`" : `![Stars](https://img.shields.io/github/stars/${repo.organization ?? repo.owner}/${repo.name}?style=flat-square)`;
    const forksBadge = repo.private ? "`none`" : `![Forks](https://img.shields.io/github/forks/${repo.organization ?? repo.owner}/${repo.name}?style=flat-square)`;

    table.push(`| ${++count} | [${repo.name}](${repo.url}) |[👀 View](https://sobhan-srza.github.io/${repo.name}) | \`${(repo.description_en || repo.description)}\` | ${langBadges} | ${techBadges} | ${starsBadge} | ${forksBadge} |`);
  });

  return table.join("\n");
}

async function main() {
  try {
    const check_projects = async () => {
      const fetched = await fetch("https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/projects.json")

      return await fetched.json()
    }

    const repos = await check_projects();
    const has_page_repos = repos.filter(a => a.languages.includes("HTML"));
    console.log(`check repositorise size: ${repos.length}`);

    const markdownTable = await generateMarkdownTable(has_page_repos, "https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/");
    fs.writeFileSync("README.md", readme(markdownTable));
    console.log("\n");
    console.log(`loaded repositorise size: ${has_page_repos.length}`);
    console.log("README.md has successfully created.");
  }

  catch (error) {
    console.error("get an error:", error);
  }
}

void main();
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
