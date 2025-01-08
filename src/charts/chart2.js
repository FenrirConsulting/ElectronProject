window.$ = window.jQuery = require('../resources/chart.js');
window.$ = window.jQuery = require('../resources/d3.js');
window.$ = window.jQuery = require('../resources/canvasJS.js'); 
const path = require('path');
const fs = require('fs');
const config = require('../resources/config.json');
var title = config.chart1.titleOne;
var mainTitle = config.chart1.mainTitle; 
var dirPath = '../../../../../DisplayScreens/';
document.title = mainTitle;
document.getElementById("Title").innerHTML = title;
var parentPath = '../../../../../ReportGenerator/Reports/';//It goes three folders or directories back from given __dirname.
var fileName = config.chart1.fileOne;

var totalsFile = config.news1.fileOne;
var fPath = path.join(dirPath,totalsFile);
var dpsTotal = 0;
var mpsTotal = 0;
var cpsTotal = 0;
var repackTotal = 0;
var productionHours = 0;
var dpsRunningTotal = 0;
var cpsRunningTotal = 0;
var mpsRunningTotal = 0;
var repackRunningTotal = 0;
var dpsHourlyGoal = 0;
var mpsHourlyGoal = 0;
var cpsHourlyGoal = 0;
var repackHourlyGoal = 0;
var dpsToGoal = 0;
var mpsToGoal = 0 ;
var cpsToGoal = 0;
var repackToGoal = 0;

var Chart1;
var Chart2;
var Chart3;
var Chart4;



function fetchTotals(){

    fs.readFile((path.resolve(__dirname, fPath)), function (error, data) {
        
    
        if (error) {
            throw error;
        }

        var builtbox ="";


        var lines = data.toString().split("\n");
     
        
        dpsTotal = parseInt(lines[34].replace(',', '')); 
        cpsTotal = parseInt(lines[35].replace(',', ''));
        mpsTotal = parseInt(lines[36].replace(',', ''));
        repackTotal = parseInt(lines[37].replace(',', '')); 
        productionHours = parseInt(lines[38].replace(',', ''));
        dpsHourlyGoal = dpsTotal / productionHours; dpsHourlyGoal = Math.round(dpsHourlyGoal);
        mpsHourlyGoal = mpsTotal / productionHours; mpsHourlyGoal = Math.round(mpsHourlyGoal);
        cpsHourlyGoal = cpsTotal / productionHours; cpsHourlyGoal = Math.round(cpsHourlyGoal);
        repackHourlyGoal = repackTotal / productionHours; repackHourlyGoal = Math.round(repackHourlyGoal);
    
        dpsToGoal = dpsTotal - dpsRunningTotal;
        mpsToGoal = mpsTotal - mpsRunningTotal; 
        cpsToGoal = cpsTotal - cpsRunningTotal; 
        repackToGoal = repackTotal - repackRunningTotal; 
        dpsHalfValue = dpsTotal *.3;
        mpsHalfValue = mpsTotal *.3;
        cpsHalfValue = cpsTotal *.3;
        repackHalfValue = repackTotal *.3;
     
        document.getElementById("dpsTotal").innerHTML = "Goal : " + dpsTotal; 
        document.getElementById("dpsRunningTotal").innerHTML = "Current Total : " + dpsRunningTotal;
        document.getElementById("dpsHourlyGoal").innerHTML = "Hourly Goal : " + dpsHourlyGoal;
        var dpsToGoalHTML = document.getElementById("dpsToGoal");
        dpsToGoalHTML.innerHTML = "To Goal : " + dpsToGoal;
        if (dpsToGoal < 0) {  dpsToGoalHTML.innerHTML = "Past Goal : " + (dpsToGoal* -1); dpsToGoalHTML.classList.add('pass');};
        if (dpsRunningTotal < dpsHalfValue) { dpsToGoalHTML.innerHTML = "To Goal : " + dpsToGoal; dpsToGoalHTML.classList.add('fail');};

        document.getElementById("mpsTotal").innerHTML = "Goal : " + mpsTotal;
        document.getElementById("mpsRunningTotal").innerHTML = "Current Total : " + mpsRunningTotal;
        document.getElementById("mpsHourlyGoal").innerHTML = "Hourly Goal : " + mpsHourlyGoal;
        var mpsToGoalHTML = document.getElementById("mpsToGoal");
        mpsToGoalHTML.innerHTML = "To Goal : " + mpsToGoal;
        if (mpsToGoal < 0) {  mpsToGoalHTML.innerHTML = "Past Goal : " + (mpsToGoal* -1); mpsToGoalHTML.classList.add('pass');};
        if (mpsRunningTotal < mpsHalfValue) { mpsToGoalHTML.innerHTML = "To Goal : " + mpsToGoal; mpsToGoalHTML.classList.add('fail');};

        document.getElementById("cpsTotal").innerHTML = "Goal : " + cpsTotal;
        document.getElementById("cpsRunningTotal").innerHTML = "Current Total : " + cpsRunningTotal;
        document.getElementById("cpsHourlyGoal").innerHTML = "Hourly Goal : " + cpsHourlyGoal;
        var cpsToGoalHTML = document.getElementById("cpsToGoal");
        cpsToGoalHTML.innerHTML = "To Goal : " + cpsToGoal;
        if (cpsToGoal < 0) {  cpsToGoalHTML.innerHTML = "Past Goal : " + (cpsToGoal* -1); cpsToGoalHTML.classList.add('pass');};
        if (cpsRunningTotal < cpsHalfValue) { cpsToGoalHTML.innerHTML = "To Goal : " + cpsToGoal; cpsToGoalHTML.classList.add('fail');};

        document.getElementById("repackTotal").innerHTML = "Goal : " + repackTotal;
        document.getElementById("repackRunningTotal").innerHTML = "Current Total : " + repackRunningTotal;
        document.getElementById("repackHourlyGoal").innerHTML = "Hourly Goal : " + repackHourlyGoal;
        var repackToGoalHTML = document.getElementById("repackToGoal");
        repackToGoalHTML.innerHTML = "To Goal : " + repackToGoal;
        if (repackToGoal < 0) { repackToGoalHTML.innerHTML = "Past Goal : " + (repackToGoal* -1); repackToGoalHTML.classList.add('pass');};
        if (repackRunningTotal < repackHalfValue) { repackToGoalHTML.innerHTML = "To Goal : " + repackToGoal; repackToGoalHTML.classList.add('fail');};

        hourlyValueCheck(Chart1, dpsHourlyGoal);
        hourlyValueCheck(Chart2, mpsHourlyGoal);
        hourlyValueCheck(Chart3, cpsHourlyGoal);
        hourlyValueCheck(Chart4, repackHourlyGoal);
    });

}

var doc = path.join(parentPath,fileName);

function hourlyValueCheck (myChart, goalCheck){

    var chartColors = {
        red: 'rgb(255, 99, 132)',
        blue: 'rgb(54, 162, 235)',
        yellow : 'rgb(255,255,0)'
      };

    var dataset = myChart.data.datasets[0];
    for (var i = 0; i < dataset.data.length; i++) {
    if (dataset.data[i] < goalCheck) {
    dataset.backgroundColor[i] = chartColors.yellow;
    }

    
}
myChart.update();
}

d3.text(doc).then(function(text){
    var fixedData = d3.csvParse(text.split('\n').slice(1).join('\n'));
    fetchTotals();
    makeChart(fixedData)
})

function makeChart(data) {


    data = data.splice(0, data.length - 1);

    data.splice(0,1);

    var str = ":00:00";
    
    const newArray = data.map(data => ({
        date: data["Date"].split(" ")[0],

        time: data["Date"].match(/^(\S+)\s(.*)/).slice(2),

        
        data1: data["DPS Pick EA *"].replace(/,/g, ''),
        data2: data["MPS Pick Case *"].replace(/,/g, ''),
        data3: data["CPS Pick Case *"].replace(/,/g, ''),
        data4: data["Totes from Rep"].replace(/,/g, '')
    }));

    
    var dateLabel = newArray.map(function(newArray){return newArray.date});
    var timeLabel = newArray.map(function(newArray){return newArray.time});

    for (var i = 0; i < timeLabel.length; i++) {
        var str = ":00:00";
        var tempString = timeLabel[i].toString().replace(str, "");
        timeLabel[i][0] = tempString;
    }

    

    var data1 = newArray.map(function(newArray) {return +newArray.data1});
    var data2 = newArray.map(function(newArray) {return +newArray.data2});
    var data3 = newArray.map(function(newArray) {return +newArray.data3});
    var data4 = newArray.map(function(newArray) {return +newArray.data4});

    finalDate = (dateLabel.length - 1);
    document.getElementById("Date").innerHTML = dateLabel[finalDate];

    
    for( var i = 0; i < data1.length; i++ ){
        dpsRunningTotal += parseInt( data1[i], 10 ); //don't forget to add the base
    }

    for( var i = 0; i < data1.length; i++ ){
        mpsRunningTotal += parseInt( data2[i], 10 ); //don't forget to add the base
    }

    for( var i = 0; i < data1.length; i++ ){
        cpsRunningTotal += parseInt( data3[i], 10 ); //don't forget to add the base
    }

    for( var i = 0; i < data1.length; i++ ){
        repackRunningTotal += parseInt( data4[i], 10 ); //don't forget to add the base
    }
  
    Chart1 = new Chart('chart', {

        type: 'bar',

        fontColor: "#FFFFFF",

        data: {
            labels: timeLabel,

            datasets: [
                {
                    data: data1,
                    backgroundColor: ["#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",] ,
                    fontColor: "#fff"
                }
            ]
        },

        options: {

            maintainAspectRatio: false,
            
            title: {
                display: true,
                text: "DPS Hourly Pick",
                fontColor:"white",
                fontSize: 24
            },

            legend: {
                display: false,
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },

            scales: {
                xAxes: [
                    {
                        
                        ticks: {
                            fontColor: "white",
                            fontSize: 14,
                            position : 'left'
                        }
                    }
                ],
                yAxes: [{
                    ticks: {
                    fontColor: "white",
                    fontSize: 14
                    }
                }]
            }
        }
    });


    Chart2 = new Chart('chart2', {

        type: 'bar',

        fontColor: "#FFFFFF",

        data: {
            labels: timeLabel,

            datasets: [
                {
                    data: data2,
                    backgroundColor: ["#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",] ,
                    fontColor: "#fff"
                }
            ]
        },

        options: {

            maintainAspectRatio: false,

            title: {
                display: true,
                text: "MPS Hourly Pick",
                fontColor:"white",
                fontSize: 24
            },

            legend: {
                display: false,
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },

            scales: {
                xAxes: [
                    {
                        ticks: {
                            fontColor: "white",
                            fontSize: 14
                        }
                    }
                ],
                yAxes: [{
                    ticks: {
                    fontColor: "white",
                    fontSize: 14
                    }
                }]
            }
        }
    });


    
    Chart3 = new Chart('chart3', {

        type: 'bar',

        fontColor: "#FFFFFF",

        data: {
            labels: timeLabel,

            datasets: [
                {
                    data: data3,
                    backgroundColor: ["#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",] ,
                    fontColor: "#fff"
                }
            ]
        },

        options: {

            maintainAspectRatio: false,

            title: {
                display: true,
                text: "CPS Hourly Pick",
                fontColor:"white",
                fontSize: 24
            },

            legend: {
                display: false,
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },

            scales: {
                xAxes: [
                    {
                        ticks: {
                            fontColor: "white",
                            fontSize: 14
                        }
                    }
                ],
                yAxes: [{
                    ticks: {
                    fontColor: "white",
                    fontSize: 14
                    }
                }]
            }
        }
    });



    Chart4 = new Chart('chart4', {

        type: 'bar',

        fontColor: "#FFFFFF",

        data: {
            labels: timeLabel,

            datasets: [
                {
                    data: data4,
                    backgroundColor: ["#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",
                                      "#cc2222", "#cc2222","#cc2222", "#cc2222","#cc2222", "#cc2222",] ,
                    fontColor: "#fff"
                }
            ]
        },

        options: {

            maintainAspectRatio: false,

            title: {
                display: true,
                text: "Repack Totes per Hour",
                fontColor:"white",
                fontSize: 24
            },

            legend: {
                display: false,
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },

            scales: {
                xAxes: [
                    {
                        ticks: {
                            fontColor: "white",
                            fontSize: 14
                        }
                    }
                ],
                yAxes: [{
                    ticks: {
                    fontColor: "white",
                    fontSize: 14
                    }
                }]
            }
        }
    });

}





document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
        require('electron').remote.getCurrentWindow().webContents.openDevTools();
    } else if (e.which === 116) {
        location.reload();
    }
});


function fadeInOut(div, callback) {

    $(div).fadeOut(1000);
    callback(3000);
}


