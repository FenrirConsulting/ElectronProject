const fs = require('fs');
const path = require('path');
const config = require('../resources/config.json');
setTimeout(function () {
    location.href = "../charts/chart1.html";
}, 45 * 1000);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!`
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd
}
if (mm < 10) {
    mm = '0' + mm
}
var today = mm + '/' + dd + '/' + yyyy;

console.log(today);

if (today == "08/06/2021") {
    document.getElementById("hiddenMessage").style.display = "";
}

var dirPath = '../../../../../DisplayScreens/';
var fileName = config.news2.fileOne;
var title = config.news2.titleOne;
var fPath = path.join(dirPath, fileName);

document.getElementById("Title").innerHTML = title;

buildTable()

/*setInterval(function () {

            
            fadeInOut(".modSet", function () {
                $(".modSet").fadeIn(3000)
                buildTable()
            });

}, 50000);*/

function buildTable() {

    fs.readFile((path.resolve(__dirname, fPath)), function (error, data) {
        console.log("runData");

        if (error) {
            throw error;
        }

        var builtbox = "";


        var lines = data.toString().split("\n");
        for (i = 1; i < 18; i++) {

            builtbox = "box" + i;
            document.getElementById(builtbox).innerHTML = lines[i];

        }
        document.getElementById("Date").innerHTML = lines[0];
    });

}

function fadeInOut(div, callback) {
    $(div).fadeOut(1000);
    console.log(today);
    callback(2000);
}

document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
        require('electron').remote.getCurrentWindow().webContents.openDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});