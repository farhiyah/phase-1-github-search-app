document.addEventListener("DOMContentLoaded", () => {

    function createUserCard(profile) {
        const resultList = document.querySelector("#user-list")
        const userCard = document.createElement('card')
        userCard.addEventListener("click", ()=>{fetchRepos(profile)})
        const username = document.createElement('h1')
        username.innerText = profile.login
        const avatar = document.createElement('img')
        avatar.className = "style"
        avatar.src = profile.avatar_url
        const link = document.createElement('href')
        link.textContent = profile.url
        userCard.append(username, avatar, link)
        resultList.append(userCard)
    }

    function createRepoCard (repo) {
        const repoList = document.querySelector("#repos-list")
        const repoCard = document.createElement("card")
        const name = document.createElement("h3")
        name.innerText = repo.name
        const link = document.createElement("a")
        link.innerHTML = repo.url
        repoCard.append(name, link)
        repoList.append(repoCard)
    }


// The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
    function searchUser() {
        const form = document.querySelector("#github-form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const user = e.target[0].value
            fetchFilteredUsers(user)
        })
    }

// Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)
        function fetchFilteredUsers(user) {
            fetch(`https://api.github.com/search/users?q=${user}`, {
                headers:{
                Accept: 'application/vnd.github.v3.text-match+json'}
            })
                .then(resp => resp.json())
                .then(data => {
                    data.items.forEach(profile => createUserCard(profile))
                })
        }

// Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.
    function fetchRepos(user) {
        console.log(user)
        fetch(user.repos_url, {
            Accept: 'application/vnd.github.v3.text-match+json'
        })
            .then(resp => resp.json())
// Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
            .then(data => {
                console.log(data)
                addRepos(data)
            })
    }

    function addRepos(data)  { 
    data.forEach(repo => {console.log(repo)
        createRepoCard(repo)
    })
}



    searchUser()


})
    