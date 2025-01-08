/*
    Written by Christopher Olson 08-01-2019
    For CVS Health
*/
setTimeout(function(){location.href="../test/test.html";},10 * 1000);

const fs = require('fs');
const path = require('path');
const config = require('../resources/config.json');
const os = require('os');


// Allows for reloading and DevTools inside app, using F5 & F12
document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
        require('electron').remote.getCurrentWindow().webContents.openDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});