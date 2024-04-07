chrome.commands.onCommand.addListener(function(command) {
  if (command === "toggle_controls") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { toggle: true, store: true });
    });
  }
});

function setStyles(tabId) {
  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: ["styles.css"]
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url.includes("youtube.com/watch")) {
    setStyles(tabId);
  }
});
