chrome.action.onClicked.addListener((tab) => {
    // Specify the URL of your settings page
    let optionsPageUrl = chrome.runtime.getURL('options.html');

    // Check if the options page is already open. If so, focus it; if not, open it.
    chrome.tabs.query({}, function(tabs) {
        let found = false;
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].url === optionsPageUrl) {
                found = true;
                chrome.tabs.update(tabs[i].id, {active: true});
                break;
            }
        }
        if (!found) {
            chrome.tabs.create({url: optionsPageUrl});
        }
    });
});
