function setDeviceInfo() {
  function fillIn(id, value) {
    var el = document.getElementById(id);
    el.textContent = el.textContent.replace("unknown", value);
  }
  fillIn("platform", device.platform);
  fillIn("version", device.version);
  fillIn("uuid", device.uuid);
  fillIn("model", device.model);
  fillIn("width", screen.width);
  fillIn("height", screen.height);
  fillIn("color-depth", screen.colorDepth);
  fillIn("user-agent", navigator.userAgent);
}

function main() {
  setDeviceInfo();
}

document.addEventListener("deviceready", main);
