document.addEventListener("DOMContentLoaded", () => {
  document.title = chrome.i18n.getMessage("extensionName");
  document.querySelector("h1").textContent = chrome.i18n.getMessage("extensionName");
  document.querySelector(".instructions").textContent = chrome.i18n.getMessage("instructions");

  const aiFilterToggle = document.getElementById("aiFilterToggle");
  document.getElementById("labelAiFilterToggle").textContent = chrome.i18n.getMessage("enableAiFilter");
  document.querySelector(".tooltip-text").textContent = chrome.i18n.getMessage("aiFilterTooltip");

  chrome.storage.sync.get(["aiFilterEnabled"], (settings) => {
    aiFilterToggle.checked = settings.aiFilterEnabled || false;
  });

  aiFilterToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ aiFilterEnabled: aiFilterToggle.checked });
  });
});
