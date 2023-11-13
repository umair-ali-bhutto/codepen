
// ALL Varibles
var hour = 12;
var minute = 31;
var second = 45;

// var radius = '75px';
var radius = 75;
var animationTiming = 'cubic-bezier(1,0,1,0)';

var colorActive = '#FFF';
var colorInactive = 'rgba(255, 255, 255, 0.2)';

var fontSize = '35px';

var hourTens = Math.floor(hour / 10);
var hourOnes = hour % 10;
var minuteTens = Math.floor(minute / 10);
var minuteOnes = minute % 10;
var secondTens = Math.floor(second / 10);
var secondOnes = second % 10;

const pi = 3.14159265359;
const precision = 10;

var styleElement = document.createElement("style");

function pow(base, exp) {
  var value = base;
  if (exp > 1) {
    for (let i = 2; i <= exp; i++) {
      value = value * base;
    }
  }
  else if (exp < 1) {
    for (let i = 0; i >= exp; i--) {
      value = value / base;
    }
  }
  return value;
}

function fact(num) {
  let fact = 1;
  if (num > 0) {
    for (let i = 1; i <= num; i++) {
      fact = fact * i;
    }
  }
  return fact;
}

function toUnitlessRad(angle) {
  return parseFloat(angle) / 180 * pi;
  // if (angle.includes("deg")) {
  //   angle = parseFloat(angle) / 180 * pi;
  // } else if (angle.includes("rad")) {
  //   angle = parseFloat(angle) / 1;
  // }
  // return angle;
}

function sin(angle) {
  let a = toUnitlessRad(angle);
  let sin = a;
  for (let i = 1; i <= precision; i++) {
    sin = sin + (pow(-1, i) / fact(2 * i + 1)) * pow(a, (2 * i + 1));
  }
  return sin;
}

function cos(angle) {
  let a = toUnitlessRad(angle);
  let cos = 1;
  for (let i = 1; i <= precision; i++) {
    cos = cos + (pow(-1, i) / fact(2 * i)) * pow(a, (2 * i));
  }
  return cos;
}

function tan(angle) {
  return sin(angle) / cos(angle);
}

function generateAnimation(name, numberOfDigits) {
  let step = 100 / numberOfDigits;
  let angle = 360 / numberOfDigits;
  let keyframesCSS = '';

  for (let i = 1; i <= numberOfDigits; i++) {
    keyframesCSS += `@keyframes ${name}${i} {`;
    for (let j = 1; j <= numberOfDigits; j++) {
      let val = j - i + 1;
      let top = Math.round(radius * sin(val * angle));
      if (j == numberOfDigits) {
        keyframesCSS += `
        0%, 100% {
          top: ${top}px;
          `;
        if (Math.abs(val * angle) > 180) {
          keyframesCSS = keyframesCSS + `transform: rotateX(` + (360 - Math.abs(val * angle)) + `deg);`;
        }
        else {
          keyframesCSS = keyframesCSS + `transform: rotateX(` + Math.abs(val * angle) + `deg);`;
        }
        if (i == 1) {
          keyframesCSS += `color: ${colorActive};`;
        }
        keyframesCSS += `}`;
      }
      else {
        keyframesCSS += `
        ${j * step}% {
          top:${top}px;`;

        if (Math.abs(val * angle) > 180) {
          keyframesCSS = keyframesCSS + `transform: rotateX(` + (360 - Math.abs(val * angle)) + `deg);`;
        }
        else {
          keyframesCSS = keyframesCSS + `transform: rotateX(` + Math.abs(val * angle) + `deg);`;
        }
        if (val == 0) {
          keyframesCSS += `color:${colorActive};`;
        }
        else {
          keyframesCSS += `color:${colorInactive};`;
        }
        keyframesCSS += `}`;
      }

    }
    keyframesCSS += `}`;
  }
  styleElement.innerHTML += keyframesCSS;
}














document.addEventListener('DOMContentLoaded', function () {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();


  generateAnimation("ten", 10);
  generateAnimation("six", 6);
  generateAnimation("three", 3);



  document.head.appendChild(styleElement);



});





