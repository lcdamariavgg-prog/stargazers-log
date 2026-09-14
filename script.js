const repositoryList = document.querySelector("#repository-list");

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  })
  .then((repositories) => {
    repositories.forEach((repository) => {
      const item = document.createElement("li");
      item.className = "repository";

      item.innerHTML = `
        <a href="${repository.url}" target="_blank" rel="noreferrer">
          ${repository.name}
        </a>
        <p>${repository.description}</p>
        <small>${repository.language} · ${repository.stars.toLocaleString()} stars</small>
      `;

      repositoryList.append(item);
    });
  })
  .catch((error) => {
    repositoryList.innerHTML = `<li>Could not load repositories: ${error.message}</li>`;
  });
