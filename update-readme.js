import fs from 'fs';

async function generateMarkdownTable(repos, imagesPath) {
  let count = 0;
  const table = () => {
    return repos?.map((repo) => {
      if (repo.private)
        return;
      
      const langBadges = repo.languages
        ? repo.languages.map(a => {
          const language = encodeURIComponent(a);
          return `<img src="${imagesPath}/${language.toLowerCase()}.svg" alt="Used ${language}" style="max-width: 100%;">`;
        }).join("")
        : '<code>none</code>';

      const techBadges = repo.technologies
        ? repo.technologies.map(a => {
          const technology = encodeURIComponent(a);
          return `<img src="${imagesPath}/${technology.toLowerCase()}.svg" alt="Used ${technology}" style="max-width: 100%;">`;
        }).join("")
        : '<code>none</code>';

      const starsBadge = repo.private ? '<code>none</code>' : `<img src="https://img.shields.io/github/stars/${repo.organization ?? repo.owner}/${repo.name}?style=flat-square" alt="Stars" style="max-width: 100%;">`;
      const forksBadge = repo.private ? '<code>none</code>' : `<img src="https://img.shields.io/github/forks/${repo.organization ?? repo.owner}/${repo.name}?style=flat-square" alt="Forks" style="max-width: 100%;">`;

      return `
<tr>
    <td><strong>${++count}</strong></td>
    <td><a href="${repo.url}">${repo.name}</a></td>
    <td><a href="https://sobhan-srza.github.io/${repo.name}"> Click Me to Show You👀 </a></td>
    <td><code>${repo.description}</code></td>
    <td>${langBadges}</td>
    <td>${techBadges}</td>
    <td>${starsBadge}</td>
    <td>${forksBadge}</td>
</tr>
`;
    }).join("")
  };

  return `
<table>
    <thead>
        <tr>
            <th>🔢</th>
            <th>🗃 Projects</th>
            <th>📡 Links</th>
            <th>📖 Describe</th>
            <th>🌎 Language</th>
            <th>⚙️ Technology</th>
            <th>⭐ Stars</th>
            <th>🖨 Forks</th>
        </tr>
    </thead>
    <tbody>${table()}</tbody>
</table>`
}

async function main() {
  try {

    const repos = JSON.parse(
      await fetch("https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/projects.json")
        .then(async a => await a.text())
    );
    const contact = await fetch("https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/contact.txt")
      .then(async a => await a.text());

    console.log(`check repositorise size: ${repos.length}`);
    const githubWebsitesMarkdownTable = await generateMarkdownTable(repos.filter(a => a.languages.includes("HTML")), "https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/4c697854a80e5e99324c04eb000f7d2cd53737ae/images/");
    fs.writeFileSync('README.md', `
<h3>sobhan-srza.github.io</h3>
<p>All list of website I build.</p>

<hr>

${githubWebsitesMarkdownTable}

<hr>


<div align="center">
    <h1>Contact me in</h1>
  ${contact}

 </div>`);
    console.log("\n");
    console.log(`loaded repositorise size: ${repos.filter(a => a.languages.includes("HTML")).length}`);
    console.log('README.md has successfully created.');
  } catch (error) {
    console.error('get an error:', error);
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
