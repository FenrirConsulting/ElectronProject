/*
    Written by Christopher Olson 08-01-2019
    For CVS Health
*/

const fs = require('fs');
const fs2 = require('fs');
const path = require('path');
const config = require('../resources/config.json');

// Add Var's and filenames for desired reports
var file1 = config.mod2C.fileOne;
var title = config.mod2C.mainTitle;
document.title = title;

var dirPath = '../../../../../DisplayScreens/';
var fPath = path.join(dirPath,file1);

var count = 1;
var myTime;
var activeTable = document.getElementById("DataStream1");

$(".mod2Set1").addClass("hideElement");
$(".mod2Set1").fadeOut();
myStartFunction(); // Begins table function

function timerFunc() {
    /*Auto scrolls and refreshes table data with new information */

    var objTbl = activeTable;

    objTbl.scrollTop = objTbl.scrollTop + 1;

    if (objTbl.scrollHeight - objTbl.scrollTop === objTbl.clientHeight) {

        // Add or remove counts, then add Case statements to add files to cycle through.
        // Counts need to point to the next file, 1->2, 2->3, 3->1, etc.

        switch (count) {
            case 1:
                fPath = path.join(dirPath,file1);
                activeTable = document.getElementById("DataStream1");
                console.log(count);
                count = count+1;
                runData(objTbl, count);
                break;

            case 2 :
                myStopFunction();
                console.log(count);
                $(".mod2Set1").fadeOut(1500);
                setTimeout(function () {
                    location.href="../mod2/mod2A.html"
                }, 2500);
        }

    }

}


function myStartFunction() { // Start interval

    myTime = setInterval(function () {
        timerFunc()
    }, 35);
    console.log("startInterval");
}

function myStopFunction() { // Clear interval timer

    clearInterval(myTime);
    console.log("clearInterval");
}


function runData(objTbl, count) {

    // Fades out Divs, Stops scroll interval, runs new table, fades in on timer
    setTimeout(function () {
        objTbl.scrollTop = 0;
    }, 2000);

    myStopFunction();

    setTimeout(function () {

        readData1();
        $(".mod2Set1").fadeIn(3000);
        $(".mod2Set1").addClass("showElement");
        setTimeout(function () {
            myStartFunction();
        }, 1500);
        

    }, 1500);

}


function readData1() {

    fs.readFile((path.resolve(__dirname, fPath)), function (error, data) {
        console.log("runData");

        if (error) {
            throw error;
        }

        $("#tbl1 tbody").children().remove()

        // File is read into table string array. Lines 1-3 are used to store the Title, Date,
        // and Week into string variables that are displayed in their respective boxes. Trims | out of Title/Date/Week

        var table = data.toString().split("\n");
        var pretitle = table[1];
        var predate = table[2];
        var preweek = table[3];
        var title = pretitle.replace(/\|.*/, '');;
        var date = predate.replace(/\|.*/, '');;
        var week = preweek.replace(/\|.*/, '');;
        console.log(title);
        console.log(date);
        console.log(week);

        // Creates empty fields for spacing between different .txt Files
        // Change n count for more or less empty lines between files. 
        for (n = 0; n < 10; n++) {

            var f = [];
            var td = [];
            var tar = document.getElementById("DataStream1");
            var tr = document.createElement('tr');

            for (i = 0; i < 12; i++) {
                f[i] = ("");
                td[i] = document.createElement('td');
                td[i].innerHTML = f[i];
                td[i].setAttribute("id", "remove");
                tr.appendChild(td[i]);
            }

            tar.appendChild(tr);
        }

        for (i = 4; i < table.length - 1; i++) {

            var f1 = table[i].trim().split("|", 15);
            var tar = document.getElementById("DataStream1");
            var tr = document.createElement('tr');
            var td = [];

            for (n = 0; n < 12; n++) {
                td[n] = document.createElement('td');
                td[n].innerHTML = f1[n];
                td[n].setAttribute("id", "remove")
                tr.appendChild(td[n]);
            }

            tar.appendChild(tr);

            var valueCheck = parseInt(td[7].innerHTML, 10);
            changeColor(td[7], valueCheck);
            var valueCheck = parseInt(td[8].innerHTML, 10);
            changeColor(td[8], valueCheck);
            var valueCheck = parseInt(td[9].innerHTML, 10);
            changeColor(td[9], valueCheck);
            var valueCheck = parseFloat(td[10].innerHTML, 10);
            changeColor(td[10], valueCheck);

            function changeColor(input, valueCheck) {
                $(input).removeClass();

                if (valueCheck > 99.99) {
                    $(input).addClass('pass');
                } else if (valueCheck > 99.89 && input == td[10]) {
                    $(input).addClass('warning');
                } else {
                    $(input).addClass('fail');
                }
            }

        };

        // Creates empty fields for spacing between different .txt Files
        // Change n count for more or less empty lines between files. 
        for (n = 0; n < 8; n++) {

            var f = [];
            var td = [];
            var tar = document.getElementById("DataStream1");
            var tr = document.createElement('tr');

            for (i = 0; i < 12; i++) {
                f[i] = ("");
                td[i] = document.createElement('td');
                td[i].innerHTML = f[i];
                td[i].setAttribute("id", "remove");
                tr.appendChild(td[i]);
            }

            tar.appendChild(tr);
        }

        document.getElementById("Title1").innerHTML = title;
        //document.getElementById("Date1").innerHTML = date;
        document.getElementById("Week1").innerHTML = week;

    });
}




// Allows for reloading and DevTools inside app, using F5 & F12
document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
        require('electron').remote.getCurrentWindow().webContents.openDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});