document.addEventListener('DOMContentLoaded', function () {
  let isUpdated = false;

  function updateInputWithLocalStorageToken() {
    var inputField = document.getElementById('APIAuth-token');
    var inputValue = inputField.value;

    // Check if access_token exists in local storage
    var storedToken = localStorage.getItem('access_token');

    if (!storedToken) {
      console.log('Access token does not exist in local storage.');
      return; // Stop the code execution if access_token does not exist
    }

    if (inputValue !== storedToken || inputValue === '') {
      // Update the input field value with the access_token from local storage
      inputField.value = storedToken;

      inputField.addEventListener('input');

      console.log('Input field updated with local storage value:', storedToken);
      isUpdated = true;
      // You may want to update the local storage here if needed
      const event = new Event('input', { bubbles: true, cancelable: true });
      inputField.dispatchEvent(event);
    } else if (!isUpdated) {
      console.log('Input field value is the same as the local storage value.');
    }
  }

  function checkAndUpdateOnMutation(mutationsList, observer) {
    for (var mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        if (!window.location.href.endsWith('/token')) {
          isUpdated = false;
          setTimeout(updateInputWithLocalStorageToken, 1000); // Delay of 1 second
        }
      }
    }
  }

  // Create a MutationObserver instance
  var observer = new MutationObserver(checkAndUpdateOnMutation);

  // Observe changes in the document's body and its descendants
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
  });

  // Call the function on initial load with a delay, but not on "/token" pages
  if (!window.location.href.endsWith('/token-1')) {
    setTimeout(updateInputWithLocalStorageToken, 1000); // Delay of 1 second
  }
});
