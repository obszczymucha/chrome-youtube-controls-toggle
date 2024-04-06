//chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, _tab) => {
//chrome.tabs.sendMessage(_tabId, { hello: true });
//});

chrome.commands.onCommand.addListener(function(command) {
  if (command === "toggle_controls") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { toggle: true, store: true });
    });
  }
});

//chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//if (changeInfo.status === 'loading' && tab.url && tab.url.includes('youtube.com/watch')) {
//chrome.tabs.sendMessage(tabId, { hide: true, origin: "onUpdated" });
//}
//});

chrome.webNavigation.onCommitted.addListener(details => {
  setStyles(details.tabId);
  chrome.tabs.sendMessage(details.tabId, { toggle: true });
});

function setStyles(tabId) {
  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: ["styles.css"]
  });
}
chrome.webNavigation.onCompleted.addListener(details => {
  setStyles(details.tabId);
  chrome.tabs.sendMessage(details.tabId, { toggle: true });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url.includes('youtube.com')) {
    setStyles(tabId);
  }
});
