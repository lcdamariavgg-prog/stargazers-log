// Find the list element where repositories will be rendered.
const repositoryList = document.querySelector("#repository-list");

// Request the sample repository data from the JSON file.
fetch("events.json")
  // Handle the HTTP response returned by the request.
  .then((response) => {
    // Stop processing when the server reports a failed request.
    if (!response.ok) {
      // Create an error that includes the HTTP status code.
      throw new Error(`Request failed: ${response.status}`);
    }

    // Convert the response body from JSON text into JavaScript data.
    return response.json();
  })
  // Render the parsed repository data.
  .then((repositories) => {
    // Process every repository in the returned array.
    repositories.forEach((repository) => {
      // Create a list item for the current repository.
      const item = document.createElement("li");
      // Apply the CSS class used to style repository entries.
      item.className = "repository";

      // Build the visible repository markup.
      item.innerHTML = `
        <!-- Link to the repository on GitHub. -->
        <a href="${repository.url}" target="_blank" rel="noreferrer" aria-label="${repository.name} (opens in new tab)">
          <!-- Display the repository owner and name. -->
          ${repository.name}
        </a>
        <!-- Display the repository description. -->
        <p>${repository.description}</p>
        <!-- Display the language and formatted star count. -->
        <small>${repository.language} · ${repository.stars.toLocaleString()} stars</small>
      `;

      // Add the completed repository item to the page.
      repositoryList.append(item);
    });
  })
  // Display a readable message when loading or rendering fails.
  .catch((error) => {
    // Replace the loading message with the error details.
    repositoryList.innerHTML = `<li>Could not load repositories: ${error.message}</li>`;
  });
