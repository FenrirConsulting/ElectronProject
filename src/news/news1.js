const fs = require('fs');
const path = require('path');
const config = require('../resources/config.json');
setTimeout(function(){location.href="news2.html";},45 * 1000);

var dirPath = '../../../../../DisplayScreens/';
var fileName = config.news1.fileOne;
var title = config.news1.titleOne;
var fPath = path.join(dirPath,fileName);


document.getElementById("Title").innerHTML = title;

buildTable()

/*setInterval(function () {

            
            fadeInOut(".modSet", function () {
                $(".modSet").fadeIn(3000)
                buildTable()
            });

}, 50000);*/


function buildTable(){

    fs.readFile((path.resolve(__dirname, fPath)), function (error, data) {
        console.log("runData");
    
        if (error) {
            throw error;
        }

        var builtbox ="";


        var lines = data.toString().split("\n");
        for (i=1; i<34; i++){

            builtbox = "box"+i;
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






