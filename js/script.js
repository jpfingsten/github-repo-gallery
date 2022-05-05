const overview = document.querySelector(".overview") // overview div where profile info is displayed
const username = "jpfingsten"; // GitHub username
const repoList = document.querySelector(".repo-list") // ul where repos are displayed

// fetch user info from GitHub's REST API
const fetchInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userInfo = await res.json();
/*    console.log(userInfo);*/
    fetchedInfo(userInfo);
}

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
}

// fetch repos
const fetchRepos = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=100`);
    const repoData = await res.json();

    displayRepos(repoData);
}

// loop through repos array and display info about repos
const displayRepos = function (repos) {
    for (const eachRepo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repos.name}</h3>`; //for some reason, this is returning "undefined"
        repoList.append(li);
    }
}