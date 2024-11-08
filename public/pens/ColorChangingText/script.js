var r = 255, g = 0, b = 0;

var colorElement = document.getElementById("color");

const name = "Umair Ali Bhutto ";

setInterval(function () {
  if (r > 0 && b == 0) {
    r--;
    g++;
  }
  if (g > 0 && r == 0) {
    g--;
    b++;
  }
  if (b > 0 && g == 0) {
    r++;
    b--;
  }
  colorElement.innerHTML = name +"rgb(" + r + "," + g + "," + b + ")";
  colorElement.style.color = "rgb(" + r + "," + g + "," + b + ")";
}, 20);