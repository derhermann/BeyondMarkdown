document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    document.getElementById('settingsForm').addEventListener('submit', saveOptions);
    document.querySelectorAll('input[name="formattingStyle"]').forEach(input => {
        input.addEventListener('change', toggleCustomTagInput);
    });
});


function toggleCustomTagInput() {
    const tagInputContainer = document.getElementById('tagInputContainer');
    if (document.querySelector('input[name="formattingStyle"]:checked').value === 'tags') {
        tagInputContainer.style.display = 'block';
    } else {
        tagInputContainer.style.display = 'none';
    }
}

function saveOptions(e) {
    e.preventDefault();
    const formattingStyle = document.querySelector('input[name="formattingStyle"]:checked').value;
    const customTag = document.getElementById('customTag').value || 'ot-markdown';
    chrome.storage.sync.set({formattingStyle, customTag}, function() {
        window.close();
    });
}

function restoreOptions() {
    chrome.storage.sync.get({formattingStyle: 'tags', customTag: 'ot-markdown'}, function(items) {
        document.querySelector(`input[name="formattingStyle"][value="${items.formattingStyle}"]`).checked = true;
        document.getElementById('customTag').value = items.customTag;
        toggleCustomTagInput(); // Call to ensure correct display based on the restored option
    });
}

document.querySelectorAll('.ot-radio input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        document.querySelectorAll('.ot-radio').forEach(label => {
            if (label.querySelector('input[type="radio"]').checked) {
                label.classList.add('checked');
            } else {
                label.classList.remove('checked');
            }
        });
    });
});
