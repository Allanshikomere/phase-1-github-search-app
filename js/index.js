document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const searchTerm = document.getElementById('search').value;
  
      fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        });
    });
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src='${user.avatar_url}' alt='${user.login}'>
          <a href='${user.html_url}' target='_blank'>${user.login}</a>
        `;
        listItem.addEventListener('click', () => {
          fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(response => response.json())
            .then(repos => {
              displayRepos(repos);
            });
        });
        userList.appendChild(listItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <a href='${repo.html_url}' target='_blank'>${repo.name}</a>
        `;
        reposList.appendChild(listItem);
      });
    }
  });

  function displayRepos (repos) {
    reposList
  }
  