chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url) {
    const url = new URL(tab.url);

    if (url.hostname.includes("google") && url.pathname === "/search") {
      chrome.storage.sync.get(["aiFilterEnabled"], (settings) => {
        if (settings.aiFilterEnabled) {
          const query = url.searchParams.get("q") || "";
          if (!query.includes("-ai")) {
            const newQuery = query + " -ai";
            url.searchParams.set("q", newQuery);
            const updatedUrl = url.toString();
            if (tab.url !== updatedUrl) {
              chrome.tabs.update(tabId, { url: updatedUrl });
            }
          }
        }
      });
    }
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: "popup.html" });
});
