document.addEventListener('DOMContentLoaded', function () {
  // Function to handle the additional logic after a delay
  function additionalLogicAfterDelay() {
    setTimeout(function () {
      // Your additional logic after a delay of 2 seconds goes here
      console.log('Additional logic executed after 2 seconds.');

      function extractAccessToken() {
        const divsWithClass = document.querySelectorAll(
          'div[class*=rm-PlaygroundResponse]'
        );

        for (const divElement of divsWithClass) {
          const accessTokenElement = divElement.querySelector(
            '.CodeMirror-code span.cm-string'
          );
          let rawtoken = accessTokenElement.textContent.trim();
          console.log('raw token', rawtoken);
          if (
            accessTokenElement &&
            accessTokenElement.previousElementSibling.textContent
              .trim()
              .includes('access_token')
          ) {
            return accessTokenElement.textContent.trim();
          }
        }
        return null;
      }

      // Function to save the access_token value into local storage
      function saveAccessTokenToLocalStorage(accessToken) {
        // Check if the string starts and ends with double quotes
        let token;
        if (accessToken.startsWith('"') && accessToken.endsWith('"')) {
          // Remove double quotes using slice
          token = accessToken.slice(1, -1);
          console.log(token);
        } else {
          // Do something else if the string doesn't have quotes at both ends
          console.log('String does not have quotes at both ends.');
        }
        if (accessToken) {
          const storedAccessToken = localStorage.getItem('access_token');
          if (!storedAccessToken || storedAccessToken !== accessToken) {
            localStorage.setItem('access_token', token);
            console.log('Access token saved in local storage:');
          }
        }
      }

      // Retrieve access_token value from the HTML structure
      const accessToken = extractAccessToken();
      // Save access_token into local storage
      saveAccessTokenToLocalStorage(accessToken);
    }, 1000);
  }

  // Function to add event listener to the "Try It" button
  function addTryItButtonClickEvent() {
    setTimeout(function () {
      // Find the div elements containing the class attribute containing 'rm-PlaygroundRequest'
      const divsWithClass = document.querySelectorAll(
        'div[class*=rm-PlaygroundRequest]'
      );

      // Convert the NodeList to an array for iteration
      const divArray = Array.from(divsWithClass);

      // Iterate through each div element with the specified class attribute
      divArray.forEach(divElement => {
        // Find the footer tag inside the current div element
        const footerInDiv = divElement.querySelector('footer');

        if (footerInDiv) {
          // Find the Try It button inside the footer tag
          const tryItButton = footerInDiv.querySelector(
            'button[class*=rm-TryIt]'
          );

          // Check if the button contains the text 'Try It!'
          if (tryItButton && tryItButton.textContent.trim() === 'Try It!') {
            // Add event listener to the "Try It" button only on the /token page
            tryItButton.addEventListener('click', function (event) {
              event.preventDefault();
              // Check if the current URL ends with '/token'
              if (window.location.pathname.endsWith('/token-1')) {
                // Execute the additional logic after a delay on the /token page
                additionalLogicAfterDelay();
              }
            });
          }
        }
      });
    }, 1000);
  }

  // Function to monitor URL changes using window.onpopstate
  window.onpopstate = function () {
    // Re-add the event listener when the URL changes
    addTryItButtonClickEvent();
  };

  // Function to observe DOM mutations using MutationObserver
  const observer = new MutationObserver(function (mutationsList) {
    // Re-add the event listener on DOM mutations
    addTryItButtonClickEvent();
  });

  // Start observing mutations in the document
  observer.observe(document.body, { attributes: true, subtree: true });

  // Add the initial event listener on page load
  addTryItButtonClickEvent();
});
