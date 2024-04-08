function injectCss(tabId) {
  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: ["styles.css"]
  });
}

chrome.commands.onCommand.addListener(function(command) {
  if (command === "toggle_controls") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      injectCss(tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, { message: "TOGGLE", store: true });
    });
  }
});

function isHidden(callback) {
  chrome.storage.sync.get(['controlsHidden'], function(result) {
    callback(result.controlsHidden);
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url.includes("youtube.com/watch")) {
    isHidden((hidden) => {
      if (hidden === true) {
        injectCss(tabId);
      }
    });
  }
});
