document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('settingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var formattingStyle = document.querySelector('input[name="formattingStyle"]:checked').value;
    chrome.storage.sync.set({formattingStyle}, function() {
        // Optionally, provide feedback that settings were saved
        window.close(); // Closes the popup after saving
    });
});

function restoreOptions() {
    // Use a default value if no setting is found
    const defaultFormattingStyle = 'tags'; // Assuming 'tags' is the default choice

    chrome.storage.sync.get({formattingStyle: defaultFormattingStyle}, function(items) {
        document.querySelector(`input[name="formattingStyle"][value="${items.formattingStyle}"]`).checked = true;
    });
}
