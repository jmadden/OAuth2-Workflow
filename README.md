# Outline of logic

## SaveAccessToken.js

This code works at the /token API endpoint.

- It adds an event listener to the **Try IT** button.
- When button is clicked the code waits a second for the access token to be generate.
- After waiting the code searches the page for the access token and then saves it to local storage.
- Code will update local storage every time the **Try IT** button is clicked and the access token changes.

Example endpoint: https://jim-group-sandbox.readme.io/reference/token-1

## UseAccessToken.js

This code retrieves the access token from local storage and uses it for subsequent API calls from all other API endpoints. (excluding the /token endpoint).

- Waits for page elements to load.
- Add the access token from local storage into OAuth2 Bearer token part of the page.
- Adding this should update the request generate with the access token. - **CURRENTLY BROKEN**

Example endpoing: https://jim-group-sandbox.readme.io/reference/listconnectionpaths
