// Redirect to HTTPS if not debugging
if ('http:' === window.location.protocol && '?debug' !== window.location.search) {
    window.location.protocol = 'https:';
}

// On load: load versions from builds.json
document.addEventListener('DOMContentLoaded', async function () {
    // Load content of builds.json
    let response = await fetch('/builds.json'),
        responseJson = await response.json(),
        selectedVersion = null;

    // Add each version to the picker
    const selector = document.getElementById('version-selector');
    responseJson.forEach(function (v) {
        let node = document.createElement('option');
        node.label = v.label;
        node.value = '/builds/' + v.value + '.yaml';
        node.innerText = v.label;
        selector.appendChild(node);

        // If nothing is selected: select first available version for now
        if (v.selected ?? false) {
            selectedVersion = node.value;
        } else {
            selectedVersion ??= node.value;
        }
    });

    // Set the current loaded version into the doc
    const rapidoc = document.getElementById('rapidoc');
    rapidoc.setAttribute('spec-url', selectedVersion);
    selector.value = selectedVersion;
    selector.addEventListener('change', ev => rapidoc.setAttribute('spec-url', ev.target.value));
}, false);
