import fs from 'fs';

async function generateMarkdownTable(repos, imagesPath) {
  let count = 0;
  const table = () => {
    return repos?.map((repo) => {
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
    const repos = JSON.parse(fs.readFileSync("./projects.json"));
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
  <a href="https://srza.ir" target="_blank">
   <img align="left" src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/social.png" alt="Sobhan-SRZA social" width=400px>
  </a>

  <a href="https://t.me/d_opa_mine" target="_blank">
   <img alt="Telegram"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/telegram-ch.svg"
    height="30" />
  </a>

  <a href="https://t.me/Sobhan_SRZA" target="_blank">
   <img alt="Telegram"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/telegram-ac.svg"
    height="30" />
  </a>

  <a href="https://www.instagram.com/mr.sinre?igsh=cWk1aHdhaGRnOGg%3D&utm_source=qr" target="_blank">
   <img alt="Instagram"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/instagram.svg"
    height="30" />
  </a>

  <a href="https://www.twitch.tv/sobhan_srza" target="_blank">
   <img alt="Twitch"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/twitch.svg"
    height="30" />
  </a>

  <a href="https://www.youtube.com/@mr_sinre?app=desktop&sub_confirmation=1" target="_blank">
   <img alt="YouTube"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/youtube.svg"
    height="30" />
  </a>
  
  <a href="https://github.com/Sobhan-SRZA" target="_blank">
   <img alt="Github"
    src="https://raw.githubusercontent.com/Sobhan-SRZA/Sobhan-SRZA/refs/heads/main/images/github.svg"
    height="30" />
  </a>
  
  <p align="left">
   <a href="https://discord.gg/xh2S2h67UW" target="_blank">
    <img src="https://discord.com/api/guilds/1054814674979409940/widget.png?style=banner2" alt="pc-development.png">
   </a>
  </p>

  <p align="right">
   <a href="https://discord.gg/54zDNTAymF" target="_blank">
    <img src="https://discord.com/api/guilds/1181764925874507836/widget.png?style=banner2" alt="pc-club.png">
   </a>
  </p>

  <div align="center">
   <a href="https://discord.com/users/865630940361785345" target="_blank">
    <img alt="My Discord Account" src="https://discord.c99.nl/widget/theme-1/865630940361785345.png" />
   </a>
    <a href="https://discord.com/users/986314682547716117" target="_blank" align="right">
    <img alt="Team Discord Account" src="https://discord.c99.nl/widget/theme-1/986314682547716117.png" />
   </a>
  </div>

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
