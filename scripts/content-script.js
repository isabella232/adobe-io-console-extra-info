console.debug("Adobe I/O Extra Info Chrome extension loaded.");

const extensionScript = document.createElement('script');
extensionScript.src = chrome.runtime.getURL('scripts/show-project-creator-script.js');
document.head.prepend(extensionScript);