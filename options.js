document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('settingsForm').addEventListener('submit', saveOptions);

function saveOptions(e) {
    e.preventDefault();
    var formattingStyle = document.querySelector('input[name="formattingStyle"]:checked').value;
    chrome.storage.sync.set({formattingStyle}, function() {
        console.log('Setting saved:', formattingStyle);
    });
}

function restoreOptions() {
    chrome.storage.sync.get('formattingStyle', function(data) {
        document.querySelector(`input[name="formattingStyle"][value="${data.formattingStyle || 'all'}"]`).checked = true;
    });
}
