document.addEventListener('DOMContentLoaded', (e) => {
    show();
});

function show() {
    document.getElementById("body").style.display = "block";
}

function hide() {
    document.getElementById("body").style.display = "none";
}

function flugHafen() {
    alt.emit('spawnFlug');
}

function stadtPark() {
    alt.emit('spawnStad');
}

function letztePosition() {
    alt.emit('spawnLetz');
}

if ('alt' in window) {
    alt.on('show', show);
    alt.on('hide', hide);
}