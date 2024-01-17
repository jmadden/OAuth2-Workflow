document.addEventListener('DOMContentLoaded', function () {
  // Function to handle the additional logic after a delay
  const waitForResponse = () => {
    setTimeout(function () {
      // Your additional logic after a delay of 2 seconds goes here

      function extractAccessToken() {
        const divsWithClass = document.querySelectorAll(
          'div[class*=rm-PlaygroundResponse]'
        );

        for (const divElement of divsWithClass) {
          const accessTokenElement = divElement.querySelector(
            '.CodeMirror-code span.cm-string'
          );
          let rawtoken = accessTokenElement.textContent.trim();

          if (
            accessTokenElement &&
            accessTokenElement.previousElementSibling.textContent
              .trim()
              .includes('access_token')
          ) {
            return accessTokenElement.textContent.trim().slice(1, -1);
          }
        }
        return null;
      }

      // Function to save the access_token value into local storage
      const saveAccessTokenToLocalStorage = accessToken => {
        if (accessToken) {
          const storedAccessToken = localStorage.getItem('access_token');
          if (!storedAccessToken || storedAccessToken !== accessToken) {
            localStorage.setItem('access_token', accessToken);
          }
        }
      };

      // Retrieve access_token value from the HTML structure
      const accessToken = extractAccessToken();
      // Save access_token into local storage
      saveAccessTokenToLocalStorage(accessToken);
    }, 1000);
  };

  // Function to add event listener to the "Try It" button
  const addTryItButtonClickEvent = () => {
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
              if (window.location.pathname.endsWith('/token')) {
                // Execute the additional logic after a delay on the /token page
                waitForResponse();
              }
            });
          }
        }
      });
    }, 1000);
  };

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
