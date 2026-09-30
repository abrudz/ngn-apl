// Save APL code & output across page reloads

function saveAcrossReload(elemAttribs) {
    const elemIds = Object.entries(elemAttribs);
    const elemInfos = elemIds.map(([id, attr]) => [document.getElementById(id), attr]);
    for (const [e, attr] of elemInfos) {
        const val = localStorage.getItem(attr);
        if (val !== null) {
            e[attr] = val;
        }
    }
    window.addEventListener('beforeunload', function() {
        for (const [e, attr] of elemInfos) {
            localStorage.setItem(attr, e[attr]);
        }
    });
}

saveAcrossReload({
    // keys are HTML element ids
    'code': 'value',
    'rslt': 'innerHTML'
});