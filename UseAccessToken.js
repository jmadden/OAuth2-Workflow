document.addEventListener('DOMContentLoaded', function () {
  let isUpdated = false;

  const updateBearerToken = () => {
    setTimeout(() => {
      let inputField = document.getElementById('APIAuth-token');
      let inputValue = inputField?.value;

      // Check if access_token exists in local storage
      let storedToken = localStorage.getItem('access_token');

      if (!storedToken) {
        console.log('Access token does not exist in local storage.');
        return; // Stop the code execution if access_token does not exist
      }

      const event = new Event('change', { bubbles: true });

      if (inputValue !== storedToken || inputValue === '') {
        let nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        ).set;
        nativeInputValueSetter.call(inputField, storedToken);

        // Dispatch 'input' event to mimic the user input
        const event = new Event('input', { bubbles: true, cancelable: true });
        inputField.dispatchEvent(event);

        console.log('Input field updated with local storage access token');
        isUpdated = true;
      } else if (!isUpdated) {
        inputField.dispatchEvent(event);

        console.log(
          'Input field value is the same as the local storage value.'
        );
      }
    }, 1000);
  };

  // Create a MutationObserver instance
  var observer = new MutationObserver(updateBearerToken);

  // Observe changes in the document's body and its descendants
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
  });

  // Call the function on initial load with a delay, but not on "/token" pages
  if (!window.location.href.endsWith('/token-1')) {
    updateBearerToken();
    window.onpopstate = updateBearerToken;
  }
});
