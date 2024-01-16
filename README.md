# Outline of logic

## SaveAccessToken.js

This code works at the /token API endpoint.

- It adds an event listener to the **Try IT** button.
- When button is clicked the code waits a second for the access token to be generate.
- After waiting the code searches the page for the access token and then saves it to local storage.
- Code will update local storage every time the **Try IT** button is clicked and the access token changes.
