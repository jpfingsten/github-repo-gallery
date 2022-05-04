const overview = document.querySelector(".overview") // overview div where profile info is displayed
const username = "jpfingsten"; // my GitHub username

// fetch user info from GitHub's REST API
const fetchInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const userInfo = await res.json();
/*    console.log(userInfo);*/
    fetchedInfo(userInfo);
}

fetchInfo();

// display fetched info in overview div
const fetchedInfo = function (userInfo) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
        <img alt = "user avatar" src = ${userInfo.avatar_url} />
    </figure >
    <div>
        <p><strong>Name:</strong> ${userInfo.name}</p>
        <p><strong>Bio:</strong> ${userInfo.bio}</p>
        <p><strong>Location:</strong> ${userInfo.location}</p>
        <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
    </div>`;
    overview.append(div);
}