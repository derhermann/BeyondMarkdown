// Check if the specific style already exists
var existingStyles = [...document.head.querySelectorAll('style')].some(style => style.textContent.includes('.ot-beyondmarkdown-replaced ul'));

// Only add the style if it doesn't already exist
if (!existingStyles) {
    var otStyle = document.createElement('style');
    otStyle.textContent = `
        h1, h2, h3 { margin-top: 0; }
        p { margin-top: 0; }
        .ot-beyondmarkdown-replaced ul {
            list-style-type: disc;
            margin-block-start: 1em;
            margin-block-end: 1em;
            padding-inline-start: 40px;
        }
        .ot-beyondmarkdown-replaced li {
            margin-bottom: 0.5em;
        }
    `;
    document.head.appendChild(otStyle);
}

function setUpObserver() {
    var targetNode = document.querySelector('.ddbc-tab-list');

    if (targetNode) {
        var observer = new MutationObserver(handleMutations);
        var config = { childList: true, subtree: true };
        observer.observe(targetNode, config);
    }
}

function handleMutations(mutations, observer) {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                // Now checking if any child of the added node qualifies for conversion
                if (node.nodeType === 1) { // Checks if it's an element node
                    // If the node itself matches the criteria or contains children that do
                    if (node.matches('.ct-notes__note') || node.querySelector('.ct-notes__note')) {
                        convertContent(node); // Call convertContent on the parent node to handle its entire subtree
                    }
                }
            });
        }
    });
}


function convertMarkdownToHTML(markdown) {
    markdown = markdown.replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>')
        .replace(/<\/ul>\n<ul>/gim, '')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .split('\n').map(line => {
            if (line.match(/^(<h1>|<h2>|<h3>|<ul>|<li>|<strong>|<em>)/)) {
                return line;
            } else {
                return `<p>${line}</p>`;
            }
        }).join('');
    return markdown.trim();
}

function convertContent(container) {
    container.querySelectorAll('.ct-notes__note').forEach(element => {
        var markdownText = element.innerText.match(/\[ot-markdown\](.*?)\[\/ot-markdown\]/s);
        if (markdownText && markdownText.length > 1) {
            var htmlContent = convertMarkdownToHTML(markdownText[1]);
            element.innerHTML = htmlContent;
            element.classList.add('ot-beyondmarkdown-replaced');
        }
    });
}

convertContent(document);

window.onload = function() {
    // Set a timeout if you want an additional delay
    setTimeout(setUpObserver, 3000); // Adjust the 500ms delay as needed
};
