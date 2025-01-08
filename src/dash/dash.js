  const fs = require('fs');
  const path = require('path');
  const config = require('../resources/config.json');
  const customTitlebar = require('custom-electron-titlebar');
  var child = require('child_process').execFile;
  var updateFormExecutablePath = path.resolve(__dirname, '../../../../../UpdateForm.exe');
  var recapFormExecutablePath = path.resolve(__dirname, '../../../../../MorningRecap/MorningRecap.exe')
  var dpsBoardAShutdownPath = path.resolve(__dirname, '../resources/DPSPERFBOARDSHUTDOWN.BAT')
  var dpsBoardBShutdownPath = path.resolve(__dirname, '../resources/DPSBOARDBSHUTDOWN.BAT')
  var repackBoardAShutdownPath = path.resolve(__dirname, '../resources/REPACKPERFBOARDSHUTDOWN.BAT')
  var repackBoardBShutdownPath = path.resolve(__dirname, '../resources/REPACKBOARDBSHUTDOWN.BAT')
  var casesBoardAShutdownPath = path.resolve(__dirname, '../resources/CASESPERFBOARDSHUTDOWN.BAT')
  var casesBoardBShutdownPath = path.resolve(__dirname, '../resources/CASESBOARDBSHUTDOWN.BAT')


  // Loads in the config.JSON file to the editor
  let rawData = fs.readFileSync(path.resolve(__dirname, '../resources/config.json'));
  let parseJSON = JSON.parse(rawData);
  const container = document.getElementById('jsoneditor');
  const options = {

    modes: ['code', 'text', 'tree', 'view'],
    mode: 'text'
  }
  const editor = new JSONEditor(container, options);
  editor.set(parseJSON);


  // Saves the updated JSON to config.json file
  const saveJSON = document.getElementById("saveJSON")
  saveJSON.addEventListener('click', () => {
    parseJSON = editor.getText();
    writeJSON = fs.writeFileSync(path.resolve(__dirname, '../resources/config.json'), JSON.stringify(JSON.parse(parseJSON), null, "\r\n\t"));
    alert("File Updated");
  })








  const pages = createPages();

  window.onload = function () {
    createButtons();
  }

  $(document).ready(function () {
    initMenu();
  });

  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });
  $("#menu-toggle-2").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled-2");
    $('#menu ul').hide();
  });

  function initMenu() {
    $('#menu ul').hide();
    $('#menu ul').children('.current').parent().show();
    //$('#menu ul:first').show();
    $('#menu li a').click(
      function () {
        var checkElement = $(this).next();
        if (checkElement.is('ul') && checkElement.is(':visible')) {
          return false;
        }
        if (checkElement.is('ul') && !checkElement.is(':visible')) {
          $('#menu ul:visible').slideUp('normal');
          checkElement.slideDown('normal');
          return false;
        }
      });
  }

  // Creates webview div to show other pages inside of 
  const {
    shell
  } = require('electron');
  const webview = document.querySelector("#webviewFrame");
  webview.addEventListener('will-navigate', (e) => {
    const protocol = require('url').parse(e.url).protocol
    if (protocol === 'http:' || protocol === 'https:') {
      shell.openExternal(e.url)
    }
  });


  // For creating new Windows 
  function createBrowserWindow(filePath) {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      },
      autoHideMenuBar: true,
      fullscreen: false,
      frame: false,
      devTools: true,
      maximize: true,
    });

    mainWindow.loadFile(filePath);
    mainWindow.maximize();
  }


  function createPages() {

    const pages = [
      path.resolve(__dirname, config.dashboard.pageOne),
      path.resolve(__dirname, config.dashboard.pageTwo),
      path.resolve(__dirname, config.dashboard.pageThree),
      path.resolve(__dirname, config.dashboard.pageFour),
      path.resolve(__dirname, config.dashboard.pageFive),
      path.resolve(__dirname, config.dashboard.pageSix),
      path.resolve(__dirname, config.dashboard.pageSeven),
      path.resolve(__dirname, config.dashboard.pageEight),
      path.resolve(__dirname, config.dashboard.pageNine),
      path.resolve(__dirname, config.dashboard.pageTen),
      path.resolve(__dirname, config.dashboard.pageEleven),
      path.resolve(__dirname, config.dashboard.pageThirteen),
      path.resolve(__dirname, config.dashboard.pageFourteen),
      path.resolve(__dirname, config.dashboard.pageFifteen)
    ];

    document.getElementById("page1").innerHTML = config.mod1A.mainTitle;
    document.getElementById("page2").innerHTML = config.mod1B.mainTitle;
    document.getElementById("page3").innerHTML = config.mod2A.mainTitle;
    document.getElementById("page4").innerHTML = config.mod2B.mainTitle;
    document.getElementById("page5").innerHTML = config.mod3A.mainTitle;
    document.getElementById("page6").innerHTML = config.mod3B.mainTitle;
    document.getElementById("page7").innerHTML = config.news1.mainTitle;
    document.getElementById("page8").innerHTML = config.news2.mainTitle;
    document.getElementById("page9").innerHTML = config.chart1.mainTitle;
    document.getElementById("page10").innerHTML = config.chart2.mainTitle;
    document.getElementById("page11").innerHTML = config.test.mainTitle;
    document.getElementById("page12").innerHTML = config.template.mainTitle;
    document.getElementById("page13").innerHTML = config.dashboard.jsonTitle;
    document.getElementById("page14").innerHTML = config.mod2C.mainTitle;

    return (pages);

  }


  function createButtons() {

    const buttons = [
      document.getElementById("button1"),
      document.getElementById("button2"),
      document.getElementById("button3"),
      document.getElementById("button4"),
      document.getElementById("button5"),
      document.getElementById("button6"),
      document.getElementById("button7"),
      document.getElementById("button8"),
      document.getElementById("button9"),
      document.getElementById("button10"),
      document.getElementById("button11"),
      document.getElementById("button12"),
      document.getElementById("button13"),
      document.getElementById("button14")
    ]



    buttons[0].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[0];
      hiddenPage();
    });

    buttons[1].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[1];
      hiddenPage();
    });

    buttons[2].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[2];
      hiddenPage();
    });

    buttons[3].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[3];
      hiddenPage();
    });

    buttons[4].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[4];
      hiddenPage();
    });

    buttons[5].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[5];
      hiddenPage();
    });

    buttons[6].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[6];
      hiddenPage();
    });

    buttons[7].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[7];
      hiddenPage();
    });

    buttons[8].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[8];
      hiddenPage();
    });

    buttons[9].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[9];
      hiddenPage();
    });

    buttons[10].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[10];
      hiddenPage();
    });

    buttons[11].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[11];
      hiddenPage();
    });

    buttons[12].addEventListener('click', () => {

      hiddenEditor();
    });

    buttons[13].addEventListener('click', () => {
      document.getElementById("webviewFrame").src = pages[13];
      hiddenPage();
    });

    dpsBoardAButton = document.getElementById("dpsBoardAButton");
    dpsBoardAButton.addEventListener('click', () => {

      child(dpsBoardAShutdownPath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
        });

    })

    dpsBoardBButton = document.getElementById("dpsBoardBButton");
    dpsBoardBButton.addEventListener('click', () => {

      child(dpsBoardBShutdownPath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
        });

    })

    repackBoardAButton = document.getElementById("repackBoardAButton");
    repackBoardAButton.addEventListener('click', () => {

      child(repackBoardAShutdownPath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
        });

    })

    repackBoardBButton = document.getElementById("repackBoardBButton");
    repackBoardBButton.addEventListener('click', () => {

      child(repackBoardBShutdownPath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
        });

    })

    casesBoardAButton = document.getElementById("casesBoardAButton");
    casesBoardAButton.addEventListener('click', () => {

      child(casesBoardAShutdownPath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
        });

    })

    casesBoardBButton = document.getElementById("casesBoardBButton");
    casesBoardBButton.addEventListener('click', () => {

      child(casesBoardBShutdownPath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
        });

    })

    closeButton = document.getElementById("closeButton");
    closeButton.addEventListener('click', () => {

      var y = document.getElementById("hiddenEditor");
      y.style.display = "none";
      var x = document.getElementById("htmlDiv");
      x.style.display = "none";
      var z = document.getElementById("webviewFrame");
      z.src = "...";

    });

    updateFormButton = document.getElementById("updateFormButton");
    updateFormButton.addEventListener('click', () => {

      child(updateFormExecutablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
        });

    });

    /*
    recapFormButton = document.getElementById("recapFormButton");
    recapFormButton.addEventListener('click', () => {

      child(recapFormExecutablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
        });

    });
  */

    return (buttons);
  }

  function hiddenPage() {

    var y = document.getElementById("hiddenEditor");
    y.style.display = "none";

    var x = document.getElementById("htmlDiv");

    if (x.style.display === "none") {
      x.style.display = "block";
    }
  }


  function hiddenEditor() {

    var y = document.getElementById("htmlDiv");
    var z = document.getElementById("webviewFrame");
    var x = document.getElementById("hiddenEditor");

    y.style.display = "none";
    z.src = "...";
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


  document.addEventListener("keydown", function (e) {
    if (e.which === 123) {
      require('electron').remote.getCurrentWindow().webContents.openDevTools();
    } else if (e.which === 116) {
      location.reload();
    }
  });


  new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#000')
  });