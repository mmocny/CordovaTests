(function() {

/******************************************************************************/

'use strict';

function getURLParameter(name) {
    return decodeURIComponent(
        (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,""])[1].replace(/\+/g, '%20')
      ) || null;
}

function getMode() {
  return getURLParameter('mode') || 'main';
}

function setTitle(title) {
  var el = document.getElementById('title');
  el.textContent = title;
}

function createButton(title, callback) {
  var actionBar = document.getElementById('actions');
  var div = document.createElement('div');
  var button = document.createElement('a');
  button.textContent = title;
  button.onclick = function(e) {
    e.preventDefault();
    callback();
  };
  button.classList.add('topcoat-button');
  div.appendChild(button);
  actionBar.appendChild(div);
}

function logger() {
  console.log.apply(console, Array.prototype.slice.apply(arguments));
  var el = document.getElementById('log');
  var div = document.createElement('div');
  div.textContent = Array.prototype.slice.apply(arguments).map(function(arg) {
      return (typeof arg === 'string') ? arg : JSON.stringify(arg);
    }).join(' ');
  el.appendChild(div);
  el.scrollTop = el.scrollHeight;
}

/******************************************************************************/

function runMain() {
  setTitle('Cordova Tests');
  createButton('Auto Tests', function() { location.href = 'index.html?mode=autotests'; });
  createButton('Manual Tests', function() { location.href = 'index.html?mode=manualtests'; });

  setDeviceInfo();
}

function setDeviceInfo() {
  var el = document.getElementById('content');
  function display() {
    var div = document.createElement('div');
    div.textContent = Array.prototype.slice.apply(arguments).map(function(arg) {
        return (typeof arg === 'string') ? arg : JSON.stringify(arg);
      }).join(' ');
    el.appendChild(div);
  }
  display("Platform: ", device.platform);
  display("Version: ", device.version);
  display("Uuid: ", device.uuid);
  display("Model: ", device.model);
  display("Width: ", screen.width);
  display("Height: ", screen.height);
  display("Color-Depth: ", screen.colorDepth);
  display("User-Agent: ", navigator.userAgent);
}

/******************************************************************************/

function runAutoTests() {
  setTitle('Auto Tests');
  createButton('Back', function() { location.href = 'index.html'; });

  var content = document.getElementById('content');
  var jasmineEnv = jasmine.getEnv();
  var htmlReporter = new jasmine.HtmlReporter('content');
  jasmineEnv.updateInterval = 250;
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
  logger(jasmineEnv.versionString());
  jasmineEnv.execute();
}

/******************************************************************************/

function runManualTests() {
  setTitle('Manual Tests');
  createButton('Back', function() { location.href = 'index.html'; });
}

/******************************************************************************/

function runUnknownMode() {
  setTitle('Unknown Mode');
  createButton('Back', function() { location.href = 'index.html'; });
}

/******************************************************************************/

function loaded() {
}

function ready() {
  var test = cordova.require('org.apache.cordova.test.test');
  test.init(document.getElementById('content'), createButton, logger);

  var mode = getMode();
  logger(mode);
  if (mode === 'main')
    runMain();
  else if (mode === 'autotests')
    runAutoTests();
  else if (mode === 'manualtests')
    runManualTests();
  else
    runUnknownMode();
}

document.addEventListener("DOMContentLoaded", loaded);
document.addEventListener("deviceready", ready);

/******************************************************************************/

}());
