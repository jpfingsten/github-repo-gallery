const overview = document.querySelector(".overview"); // overview div where profile info is displayed
const username = "jpfingsten"; // GitHub username
const repoList = document.querySelector(".repo-list"); // ul where repos are displayed
const repos = document.querySelector(".repos"); // section wrapping ul in which repos are displayed
const repoData = document.querySelector(".repo-data"); // where individual repo data will appear
const backButton = document.querySelector(".view-repos"); // the "back to repo gallery" button
const filterInput = document.querySelector(".filter-repos"); // search box

// fetch user info from GitHub's REST API
const fetchInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userInfo = await res.json();
    fetchedInfo(userInfo);
};

fetchInfo();

// display fetched user info in overview div
const fetchedInfo = function (info) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
        <img alt = "user avatar" src = ${info.avatar_url} />
    </figure >
    <div>
        <p><strong>Name:</strong> ${info.name}</p>
        <p><strong>Bio:</strong> ${info.bio}</p>
        <p><strong>Location:</strong> ${info.location}</p>
        <p><strong>Number of public repos:</strong> ${info.public_repos}</p>
    </div>`;
    overview.append(div);

    fetchRepos();
};

// fetch repos
const fetchRepos = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=100`);
    const repoData = await res.json();
    filterInput.classList.remove("hide");

    displayRepos(repoData);
};

// loop through repos array and display info about repos
const displayRepos = function (repos) {
    for (const eachRepo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${eachRepo.name}</h3>`;
        repoList.append(li);
    }
};

// add click event for repos
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//get clicked repo's info from GitHub
const getRepoInfo = async function (repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    const languages = [];
    for (let language in languageData) {
        languages.push(`${language}`);
    };

    displayRepoInfo(repoInfo, languages);
};

//display clicked repo's info
const displayRepoInfo = async function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p><b>Description:</b> ${repoInfo.description}</p>
    <p><b>Default Branch:</b> ${repoInfo.default_branch}</p>
    <p><b>Languages:</b> ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    backButton.classList.remove("hide");
};

//add click event to back button
backButton.addEventListener("click", function (e) {
    repos.classList.remove("hide");
    repoData.classList.add("hide");
    this.classList.add("hide");
});

//add input event to search box
filterInput.addEventListener("input", function (e) {
    const inputText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchTerm = inputText.toLowerCase();
    for (const eachRepo of repos) {
        const repoName = eachRepo.innerText;
        if (repoName.includes(searchTerm)) {
            eachRepo.classList.remove("hide");
        } else {
            eachRepo.classList.add("hide");
        };
    };
})