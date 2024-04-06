const classesToToggle = ['ytp-gradient-top', 'ytp-chrome-top', 'ytp-chrome-bottom'];

function toggleControls() {
  classesToToggle.forEach(className => {
    const elements = document.querySelectorAll('.' + className);
    elements.forEach(element => {
      if (element.style.display === 'none') {
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    });
  });

  // Save the current state
  chrome.storage.sync.set({ controlsHidden: document.querySelector('.ytp-gradient-top').style.display === 'none' });
}

// Load the saved state and apply it
chrome.storage.sync.get(['controlsHidden'], function(result) {
  if (result.controlsHidden) {
    toggleControls();
  }
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.toggle) {
      toggleControls();
      sendResponse({ status: "Controls toggled" });
    }
  }
);
