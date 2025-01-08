window.$ = window.jQuery = require('../resources/chart.js');
window.$ = window.jQuery = require('../resources/d3.js');
window.$ = window.jQuery = require('../resources/canvasJS.js'); 


const os = require('os');
const username = os.userInfo().username;
const hostname = os.hostname();

if (username != "MPS-DISPLAY") { setTimeout(function(){location.href="../news/news1.html";},45 * 1000); }



if (username == "MPS-DISPLAY" || username == "MPS-Display") { 

    document.getElementById('chart_wrapper1').style.display = "none";
    document.getElementById('chart_wrapper3').style.display = "none";
    document.getElementById('chart_wrapper4').style.display = "none";
    document.getElementById('body_wrapper').style.gridTemplateRows = "100%";
}


else {
  setTimeout(function(){location.href="../charts/chart1.html";},30 * 1000);
}



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
var fileName2 = config.chart1.fileTwo;

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
        dpsHourlyGoal = parseInt(lines[47].replace(',', ''));
        mpsHourlyGoal = parseInt(lines[48].replace(',', ''));
        cpsHourlyGoal = parseInt(lines[49].replace(',', ''));
        repackHourlyGoal = parseInt(lines[50].replace(',', ''));
    
        dpsToGoal = dpsTotal - dpsRunningTotal;
        mpsToGoal = mpsTotal - mpsRunningTotal; 
        cpsToGoal = cpsTotal - cpsRunningTotal; 
        repackToGoal = repackTotal - repackRunningTotal; 
        dpsHalfValue = dpsTotal *.3;
        mpsHalfValue = mpsTotal *.3;
        cpsHalfValue = cpsTotal *.3;
        repackHalfValue = repackTotal *.3;
     
        document.getElementById("dpsTotal").innerHTML = dpsTotal; 
        document.getElementById("dpsRunningTotal").innerHTML = dpsRunningTotal;
        document.getElementById("dpsHourlyGoal").innerHTML = dpsHourlyGoal;
        var dpsToGoalHTML = document.getElementById("dpsToGoal");
        dpsToGoalHTML.innerHTML = dpsToGoal;
        if (dpsToGoal < 0) {  dpsToGoalHTML.innerHTML = (dpsToGoal* -1) + " Past Goal"; dpsToGoalHTML.classList.add('pass');};
        if (dpsRunningTotal < dpsHalfValue) { dpsToGoalHTML.innerHTML = dpsToGoal; dpsToGoalHTML.classList.add('fail');};

        document.getElementById("mpsTotal").innerHTML = mpsTotal;
        document.getElementById("mpsRunningTotal").innerHTML = mpsRunningTotal;
        document.getElementById("mpsHourlyGoal").innerHTML = mpsHourlyGoal;
        var mpsToGoalHTML = document.getElementById("mpsToGoal");
        mpsToGoalHTML.innerHTML =  mpsToGoal;
        if (mpsToGoal < 0) {  mpsToGoalHTML.innerHTML = (mpsToGoal* -1) + " Past Goal"; mpsToGoalHTML.classList.add('pass');};
        if (mpsRunningTotal < mpsHalfValue) { mpsToGoalHTML.innerHTML = mpsToGoal; mpsToGoalHTML.classList.add('fail');};

        document.getElementById("cpsTotal").innerHTML = cpsTotal;
        document.getElementById("cpsRunningTotal").innerHTML = cpsRunningTotal;
        document.getElementById("cpsHourlyGoal").innerHTML = cpsHourlyGoal;
        var cpsToGoalHTML = document.getElementById("cpsToGoal");
        cpsToGoalHTML.innerHTML = cpsToGoal;
        if (cpsToGoal < 0) {  cpsToGoalHTML.innerHTML = (cpsToGoal* -1) + " Past Goal"; cpsToGoalHTML.classList.add('pass');};
        if (cpsRunningTotal < cpsHalfValue) { cpsToGoalHTML.innerHTML = cpsToGoal; cpsToGoalHTML.classList.add('fail');};

        document.getElementById("repackTotal").innerHTML = repackTotal;
        document.getElementById("repackRunningTotal").innerHTML = repackRunningTotal;
        document.getElementById("repackHourlyGoal").innerHTML = repackHourlyGoal;
        var repackToGoalHTML = document.getElementById("repackToGoal");
        repackToGoalHTML.innerHTML = repackToGoal;
        if (repackToGoal < 0) { repackToGoalHTML.innerHTML = (repackToGoal* -1) + " Past Goal"; repackToGoalHTML.classList.add('pass');};
        if (repackRunningTotal < repackHalfValue) { repackToGoalHTML.innerHTML = repackToGoal; repackToGoalHTML.classList.add('fail');};

        hourlyValueCheck(Chart1, dpsHourlyGoal);
        hourlyValueCheck(Chart2, mpsHourlyGoal);
        hourlyValueCheck(Chart3, cpsHourlyGoal);
        hourlyValueCheck(Chart4, repackHourlyGoal);
    });

}

var doc = path.join(parentPath,fileName);
var doc2 = path.join(parentPath,fileName2); // Repack File Csv , to be gathered from secondary generator file

function hourlyValueCheck (myChart, goalCheck){

    var chartColors = {
        red: '#e41a1c',
        blue: 'rgb(54, 162, 235)',
        yellow : 'rgb(255,255,0)'
      };

    var dataset = myChart.data.datasets[0];
    for (var i = 0; i < dataset.data.length; i++) {
    if (dataset.data[i] < goalCheck) {
    dataset.backgroundColor[i] = chartColors.red;
    }

    
}
myChart.update();
}

d3.text(doc).then(function(text){

    var psv = d3.dsvFormat(";");
    var fixedData = psv.parse(text.split('\n').slice(1).join('\n'));
    d3.text(doc2).then(function(text){
        var fixedData2 = psv.parse(text.split('\n').slice(1).join('\n'));
        
        makeChart(fixedData, fixedData2)
    })
    fetchTotals();
})




function makeChart(data, data2) {


    data = data.splice(0, data.length - 1);
    data.splice(0,1);

    data2 = data2.splice(0, data2.length - 1);
    data2.splice(0,1);
    var str = ":00:00";
    
    const newArray = data.map(data => ({
        date: data["Date"].split(" ")[0],
        time: data["Date"].match(/^(\S+)\s(.*)/).slice(2),
        data1: data["DPS Pick EA *"].replace(/,/g, ''),
        data2: data["MPS Pick Case *"].replace(/,/g, ''),
        data3: data["CPS Pick Case *"].replace(/,/g, '')
    }));

    const repackArray = data2.map(data2 => ({
        date2: data2["Date"].split(" ")[0],
        time2: data2["Hour"], //.match(/^(\S+)\s(.*)/).slice(2),
        data4: data2["Total Cases"].replace(/,/g, '')
    }));


    var dateLabel = newArray.map(function(newArray){return newArray.date});
    var timeLabel = newArray.map(function(newArray){return newArray.time});
    var dateLabel2 = repackArray.map(function(repackArray){return repackArray.date2});
    var timeLabel2 = repackArray.map(function(repackArray){return repackArray.time2});

    for (var i = 0; i < timeLabel.length; i++) {
        var str = ":00:00";
        var tempString = timeLabel[i].toString().replace(str, "");
        timeLabel[i][0] = tempString;
    }


    for (var i = 0; i < timeLabel2.length; i++) {

        var timeHalf = false;

        var tempString = timeLabel2[i].toString();
        var tempValue = parseInt(tempString);

        if (tempValue > 0  && tempValue < 12){ timeframe = false;};
		if (tempValue == 12) {timeframe = true;}
        if (tempValue > 12  && tempValue < 25){ tempValue = tempValue - 12; timeframe = true ;};

        if (timeframe == false ) { tempString = tempValue.toString() + " AM";}
        if (timeframe == true) { tempString = tempValue.toString() + " PM";}
        
        console.log(tempString);
        timeLabel2[i] = tempString;
    }
    

    var data1 = newArray.map(function(newArray) {return +newArray.data1});
    var data2 = newArray.map(function(newArray) {return +newArray.data2});
    var data3 = newArray.map(function(newArray) {return +newArray.data3});
    var data4 = repackArray.map(function(repackArray) {return +repackArray.data4});

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

    for( var i = 0; i < data4.length; i++ ){

        repackRunningTotal += parseInt( data4[i], 10 ); //don't forget to add the base
        console.log(repackRunningTotal);
    }

  
    Chart1 = new Chart('chart', {

        type: 'bar',

        fontColor: "#FFFFFF",

        data: {
            labels: timeLabel,

            datasets: [
                {
                    data: data1,
                    backgroundColor: ["#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",] ,
                    fontColor: "#fff",
                    trendlineLinear: {
                        style: "#377eb8",
                        lineStyle: "solid",
                        width: 6
                    }                             
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
            },
        
            animation: {
                duration: 0,
                onComplete: function () {
                    // render the value of the chart above the bar
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = "white";
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                            ctx.fillText(dataset.data[i], model.x, model.y - 5);
                        }
                    });
            }}   
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
                    backgroundColor: ["#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",] ,
                    fontColor: "#fff",
                    trendlineLinear: {
                        style: "#377eb8",
                        lineStyle: "solid",
                        width: 4
                    }             
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
            },
        
            animation: {
                duration: 0,
                onComplete: function () {
                    // render the value of the chart above the bar
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = "white";
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                            ctx.fillText(dataset.data[i], model.x, model.y - 5);
                        }
                    });
            }}   
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
                    backgroundColor: ["#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",] ,
                    fontColor: "#fff",
                    trendlineLinear: {
                        style: "#377eb8",
                        lineStyle: "solid",
                        width: 4
                    }            
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
            },
        
            animation: {
                duration: 0,
                onComplete: function () {
                    // render the value of the chart above the bar
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = "white";
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                            ctx.fillText(dataset.data[i], model.x, model.y - 5);
                        }
                    });
            }}   
        }
    });



    Chart4 = new Chart('chart4', {

        type: 'bar',

        fontColor: "#FFFFFF",

        data: {
            labels: timeLabel2,

            datasets: [
                {
                    data: data4,
                    backgroundColor: ["#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",
                                      "#4daf4a", "#4daf4a","#4daf4a", "#4daf4a","#4daf4a", "#4daf4a",] ,
                    fontColor: "#fff",
                    trendlineLinear: {
                        style: "#377eb8",
                        lineStyle: "solid",
                        width: 4
                    }         
                }
            ]
        },

        options: {

            maintainAspectRatio: false,

            title: {
                display: true,
                text: "Repack Cases per Hour",
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
            },
        
            animation: {
                duration: 0,
                onComplete: function () {
                    // render the value of the chart above the bar
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = "white";
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                            ctx.fillText(dataset.data[i], model.x, model.y - 5);
                        }
                    });
            }}   
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


