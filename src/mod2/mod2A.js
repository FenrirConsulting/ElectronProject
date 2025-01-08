/*
    Written by Christopher Olson 08-01-2019
    For CVS Health
*/

const fs = require('fs');
const fs2 = require('fs');
const path = require('path');
const config = require('../resources/config.json');

// Add Var's and filenames for desired reports
var file1 = config.mod2A.fileOne;
var file2 = config.mod2A.fileTwo;
var title = config.mod2A.mainTitle;
document.title = title;

var dirPath = '../../../../../DisplayScreens/';
var fPath = path.join(dirPath,file1);
var fPath2 = path.join(dirPath,file2);

var count = 1;
var myTime;

$(".mod2Set").addClass("hideElement");
$(".mod2Set").fadeOut();
myStartFunction();

function timerFunc() {
    /*Auto scrolls and refreshes table data with new information */

    var objTbl = document.getElementById("DataStream1");
    var objTbl2 = document.getElementById("DataStream2");

    objTbl.scrollTop = objTbl.scrollTop + 1;
    objTbl2.scrollTop = objTbl2.scrollTop + 1;

    if (objTbl.scrollHeight - objTbl.scrollTop === objTbl.clientHeight &&
        objTbl2.scrollHeight - objTbl2.scrollTop === objTbl2.clientHeight) {

        // Add or remove counts, then add Case statements to add files to cycle through.
        // Counts need to point to the next file, 1->2, 2->3, 3->1, etc.
        switch (count) {
            case 1:
                fPath = path.join(dirPath,file1);
                fPath2 = path.join(dirPath,file2);
                runData(objTbl, objTbl2);
                count = count + 1;
                break;

            case 2:
                myStopFunction();
                $(".mod2Set").fadeOut(1500);
                setTimeout(function () {
                    location.href="../mod2/mod2B.html"
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

function runData(objTbl, objTbl2) {

    // Fades out Divs, Stops scroll interval, runs new table, fades in on timer
    

    setTimeout(function () {
        objTbl.scrollTop = function () {
            return 0;
        }
        objTbl2.scrollTop = function () {
            return 0;
        }
    }, 2500);

    myStopFunction();

    setTimeout(function () {

        readData1();
        readData2();
        $(".mod2Set").fadeIn(4000);
        $(".mod2Set").addClass("showElement");


    }, 2500);

    setTimeout(function () {
        myStartFunction();
    }, 3000);

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
        var date2 = date
        var week = preweek.replace(/\|.*/, '');;
        console.log(title);
        console.log(date);
        console.log(week);
        count = 2;

        // Creates empty fields for spacing between different .txt Files
        // Change n count for more or less empty lines between files. 
        for (n = 0; n < 15; n++) {

            var f = [];
            var td = [];
            var tar = document.getElementById("DataStream1");
            var tr = document.createElement('tr');

            for (i = 0; i < 2; i++) {
                f[i] = ("");
                td[i] = document.createElement('td');
                td[i].innerHTML = f[i];
                td[i].setAttribute("id", "remove");
                tr.appendChild(td[i]);
            }

            tar.appendChild(tr);
        }

        for (i = 4; i < table.length - 1; i++) {

            var f1 = table[i].trim().split("|", 2);
            var tar = document.getElementById("DataStream1");
            var tr = document.createElement('tr');
            var td = [];

            for (n = 0; n < 2; n++) {
                td[n] = document.createElement('td');
                td[n].innerHTML = f1[n];
                td[n].setAttribute("id", "remove")
                tr.appendChild(td[n]);
            }

            tar.appendChild(tr);

            var valueCheck = parseInt(td[1].innerHTML, 10);
            changeColor(td[1], valueCheck);

            function changeColor(input, value) {
                $(input).removeClass();
                if (value > 99.99) {
                    $(input).addClass('pass');
                } else {
                    $(input).addClass('fail');
                }
            }

        };

        // Creates empty fields for spacing between different .txt Files
        // Change n count for more or less empty lines between files. 
        for (n = 0; n < 6; n++) {

            var f = [];
            var td = [];
            var tar = document.getElementById("DataStream1");
            var tr = document.createElement('tr');

            for (i = 0; i < 2; i++) {
                f[i] = ("");
                td[i] = document.createElement('td');
                td[i].innerHTML = f[i];
                td[i].setAttribute("id", "remove");
                tr.appendChild(td[i]);
            }

            tar.appendChild(tr);
        }

        document.getElementById("Title1").innerHTML = title;
        document.getElementById("Date1").innerHTML = "Performance for : " + date;
        document.getElementById("Date1").style.whiteSpace = "nowrap";
        document.getElementById("Date1").style.fontSize = "1vw";
        document.getElementById("Week1").innerHTML = week;

    });

}


function readData2() {

    fs2.readFile((path.resolve(__dirname, fPath2)), function (error, data) {
        console.log("runData");

        if (error) {
            throw error;
        }

        $("#tbl2 tbody").children().remove()

        // File is read into table string array. Lines 1-3 are used to store the Title, Date,
        // and Week into string variables that are displayed in their respective boxes. Trims | out of Title/Date/Week

        var table2 = data.toString().split("\n");
        var pretitle = table2[1];
        var predate = table2[2];
        var preweek = table2[3];
        var mpstitle = pretitle.replace(/\|.*/, '');;
        var mpsdate = predate.replace(/\|.*/, '');;
        var mpsweek = preweek.replace(/\|.*/, '');;
        console.log(mpstitle);
        console.log(mpsdate);
        console.log(mpsweek);

        // Creates empty fields for spacing between different .txt Files
        // Change n count for more or less empty lines between files. 
        for (n = 0; n < 15; n++) {

            var f = [];
            var td = [];
            var tar = document.getElementById("DataStream2");
            var tr = document.createElement('tr');

            for (i = 0; i < 2; i++) {
                f[i] = ("");
                td[i] = document.createElement('td');
                td[i].innerHTML = f[i];
                td[i].setAttribute("id", "remove");
                tr.appendChild(td[i]);
            }

            tar.appendChild(tr);
        }

        for (i = 4; i < table2.length - 1; i++) {

            var f1 = table2[i].trim().split("|", 2);
            var tar = document.getElementById("DataStream2");
            var tr = document.createElement('tr');
            var td = [];

            for (n = 0; n < 2; n++) {
                td[n] = document.createElement('td');
                td[n].innerHTML = f1[n];
                td[n].setAttribute("id", "remove")
                tr.appendChild(td[n]);
            }

            tar.appendChild(tr);

            var valueCheck = parseInt(td[1].innerHTML, 10);
            changeColor(td[1], valueCheck);

            function changeColor(input, value) {
                $(input).removeClass();
                if (value > 99.99) {
                    $(input).addClass('pass');
                } else {
                    $(input).addClass('fail');
                }
            }

        };

        // Creates empty fields for spacing between different .txt Files
        // Change n count for more or less empty lines between files. 
        for (n = 0; n < 6; n++) {

            var f = [];
            var td = [];
            var tar = document.getElementById("DataStream2");
            var tr = document.createElement('tr');

            for (i = 0; i < 2; i++) {
                f[i] = ("");
                td[i] = document.createElement('td');
                td[i].innerHTML = f[i];
                td[i].setAttribute("id", "remove");
                tr.appendChild(td[i]);
            }

            tar.appendChild(tr);
        }

        document.getElementById("Title2").innerHTML = mpstitle;
        document.getElementById("Date2").innerHTML = "Performance for : " + date2;
        document.getElementById("Date2").style.whiteSpace = "nowrap";
        document.getElementById("Week2").innerHTML = mpsweek;

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