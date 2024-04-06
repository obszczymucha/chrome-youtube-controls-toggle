const classesToToggle = '.ytp-gradient-top, .ytp-chrome-top, .ytp-chrome-bottom';
const IS_SHOWN = "is-shown";

function setStyle(remove) {
  const elements = document.querySelectorAll(classesToToggle);
  elements.forEach(element => {
    const isShown = element.classList.contains(IS_SHOWN);

    if (remove === true) {
      element.classList.remove(IS_SHOWN);
    } else if (!remove && !isShown) {
      element.classList.add(IS_SHOWN);
    }
  });
}

function show(store) {
  console.log("Showing YouTube controls.")
  setStyle(false);

  if (!store) return;
  chrome.storage.sync.set({ controlsHidden: false });
}

function hide(store) {
  console.log("Hiding YouTube controls.")
  setStyle(true);

  if (!store) return;
  chrome.storage.sync.set({ controlsHidden: true });
}

// Load the saved state and apply it
function isHidden(callback) {
  chrome.storage.sync.get(['controlsHidden'], function(result) {
    callback(result.controlsHidden);
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(
  function(request, _sender, sendResponse) {
    if (request.toggle) {
      isHidden((hidden) => {
        const set = hidden === true && hide || show;
        const toggle = hidden === true && show || hide;
        const f = request.store && toggle || set;
        f(request.store);
        sendResponse({ status: "Controls toggled" });
        return;
      });

      return true;
    };

    if (request.hide) {
      console.log("Trying to hide" + request.origin || ".");
      hide();
      sendResponse({ status: "Hello" });
      return;
    }
  }
);
