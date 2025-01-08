window.$ = window.jQuery = require('../resources/chart.js');
window.$ = window.jQuery = require('../resources/d3.js'); 
window.$ = window.jQuery = require('../resources/canvasJS.js');
window.$ = window.jQuery = require('../resources/chartjs-plugin-datalabels.js');

const path = require('path');
const fs = require('fs');
const config = require('../resources/config.json');

var title = config.chart1.titleOne;
var mainTitle = config.chart1.mainTitle; 
document.title = mainTitle;
document.getElementById("Title").innerHTML = title;
var ctx = document.getElementById("testchart").getContext('2d');

var parentPath = '../../../../../DisplayScreens/';//It goes three folders or directories back from given __dirname.
var fileName = config.chart1.fileOne;

var doc = path.join(parentPath,fileName)


    d3.text(doc).then(function(text){
        var fixedData = d3.csvParse(text.split('\n').slice(1).join('\n'));
        makeChart(fixedData);
    })







 function makeChart(data) {


    data = data.splice(0, data.length - 1);
    
    const newArray = data.map(data => ({
        date: data["Date"].split(" ")[0],
        time: data["Date"].match(/^(\S+)\s(.*)/).slice(2),
        data1: data["DPS Pick EA *"].replace(/,/g, ''),
        data2: data["MPS Pick Case *"].replace(/,/g, ''),
        data3: data["CPS Pick Case *"].replace(/,/g, ''),
        data4: data["Totes from Rep"].replace(/,/g, ''),
    }));


    
    var dateLabel = newArray.map(function(newArray){return newArray.date});
    var timeLabel = newArray.map(function(newArray){return newArray.time});
    
    //DPS Data
    var data1 = newArray.map(function(newArray) {return +newArray.data1});
    //MPS Data
    var data2 = newArray.map(function(newArray) {return +newArray.data2});
    //CPS Data
    var data3 = newArray.map(function(newArray) {return +newArray.data3});
    //Repack Data
    var data4 = newArray.map(function(newArray) {return +newArray.data4});

    
    finalDate = (dateLabel.length - 1);
    document.getElementById("Date").innerHTML = dateLabel[finalDate];

    

    var pieChart = new Chart (ctx, {

        type: 'pie',
        
        fontColor: "#FFFFFF",



        data : {

                datasets: [
                {
                    datalabels: { labels: timeLabel, color: '#fff'},
                    data: data1,
                    backgroundColor: "#cc2222",
                    fontColor: "#fff"
                }
            ],
            
        },




        options: {

            maintainAspectRatio : false,


            layout: { 
                padding: 30,
            },

            legend: {

                display : false
            },

            tooltips: {
                fontSize : 12,
            },

        
            plugins: {
                datalabels: {
                    labels: {
                        title: {
                            color: '#fff'
                        }
                    }
                }
            },

            

            title: {
                display: true,
                margin: 0,
                position: 'top',
                text: "DPS Hourly Pick",
                fontColor:"white",
                fontSize: 24
            }
          },


    });

    
    /*

    var Chart1 = new Chart('chart1', {

        type: 'horizontalBar',

        fontColor: "#FFFFFF",

        data: {
            labels: dateLabel,

            datasets: [
                {
                    data: data1,
                    backgroundColor: ["#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0",
                                      "#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0"] ,
                    fontColor: "#fff"
                }
            ]
        },

        options: {

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



    var Chart2 = new Chart('chart2', {

        type: 'horizontalBar',

        fontColor: "#FFFFFF",

        data: {
            labels: dateLabel,

            datasets: [
                {
                    data: data2,
                    backgroundColor: ["#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0",
                    "#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0"] ,
                    fontColor: "#fff"
                }
            ]
        },

        options: {

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


    
    var Chart3 = new Chart('chart3', {

        type: 'horizontalBar',

        fontColor: "#FFFFFF",

        data: {
            labels: dateLabel,

            datasets: [
                {
                    data: data3,
                    backgroundColor: ["#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0",
                                      "#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0"] ,
                    fontColor: "#fff"
                }
            ]
        },

        options: {

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



    var Chart4 = new Chart('chart4', {

        type: 'horizontalBar',

        fontColor: "#FFFFFF",

        data: {
            labels: dateLabel,

            datasets: [
                {
                    data: data4,
                    backgroundColor: ["#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0",
                                      "#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0","#cc2222", "#e7ecf0"] ,
                    fontColor: "#fff"
                }
            ]
        },

        options: {

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
    
    */

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


