document.addEventListener('DOMContentLoaded', function() {
    restoreOptions();
    document.getElementById('settingsForm').addEventListener('submit', saveOptions);
    document.querySelectorAll('input[name="formattingStyle"]').forEach(input => {
        input.addEventListener('change', toggleCustomTagInput);
    });
});


/**
 * The function toggles the display of a tag input container based on the selected value of a radio
 * button.
 */
function toggleCustomTagInput() {
    const tagInputContainer = document.getElementById('tagInputContainer');
    if (document.querySelector('input[name="formattingStyle"]:checked').value === 'tags') {
        tagInputContainer.style.display = 'block';
    } else {
        tagInputContainer.style.display = 'none';
    }
}

/**
 * The `saveOptions` function saves the selected formatting style and custom tag to the Chrome storage
 * and closes the window.
 * @param e - The parameter "e" is an event object that is passed to the function when it is called. It
 * is commonly used in event handlers to access information about the event that occurred, such as the
 * target element or the event type. In this case, it is used to prevent the default behavior of a
 */
function saveOptions(e) {
    e.preventDefault();
    const formattingStyle = document.querySelector('input[name="formattingStyle"]:checked').value;
    const customTag = document.getElementById('customTag').value || 'ot-markdown';
    chrome.storage.sync.set({formattingStyle, customTag}, function() {
        window.close();
    });
}

/**
 * The `restoreOptions` function retrieves the saved options from Chrome storage and updates the
 * corresponding input elements in the HTML page.
 */
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
