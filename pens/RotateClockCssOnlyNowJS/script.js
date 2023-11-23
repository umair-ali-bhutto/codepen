// GETTING TODAYS TIME
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();


// ALL Varibles
var hour = hours;
var minute = minutes;
var second = seconds;

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




function assignAnimations() {
  let CSS = '';
  let temp;

  for (let i = 1; i <= 3; i++) {
    let index = i + hourTens;
    if (index > 3) { index = index - 3; }
    temp = -((3600 * hourOnes) + (600 * minuteTens) + (60 * minuteOnes) + (10 * secondTens) + secondOnes);
    CSS += `.hourTens li:nth-child(${index}){
      animation:three${i} 108000s ${animationTiming} infinite;
      animation-delay:${temp}s;
    }`;
  }

  for (let i = 1; i <= 10; i++) {
    let index = i + hourOnes;
    if (index > 10) { index = index - 10; }
    temp = -((600 * minuteTens) + (60 * minuteOnes) + (10 * secondTens) + secondOnes);
    CSS += `.hourOnes li:nth-child(${index}){
      animation:ten${i} 36000s ${animationTiming} infinite;
      animation-delay:${temp}s;
    }`;
  }

  for (let i = 1; i <= 6; i++) {
    let index = i + minuteTens;
    if (index > 6) { index = index - 6; }
    temp = -((60 * minuteOnes) + (10 * secondTens) + secondOnes);
    CSS += `.minuteTens li:nth-child(${index}){
      animation:six${i} 3600s ${animationTiming} infinite;
      animation-delay:${temp}s;
    }`;
  }

  for (let i = 1; i <= 10; i++) {
    let index = i + minuteOnes;
    if (index > 10) { index = index - 10; }
    temp = -((10 * secondTens) + secondOnes);
    CSS += `.minuteOnes li:nth-child(${index}){
      animation:ten${i} 600s ${animationTiming} infinite;
      animation-delay:${temp}s;
    }`;
  }

  for (let i = 1; i <= 6; i++) {
    let index = i + secondTens;
    if (index > 6) { index = index - 6; }
    temp = -(secondOnes);
    CSS += `.secondTens li:nth-child(${index}){
      animation:six${i} 60s ${animationTiming} infinite;
      animation-delay:${temp}s;
    }`;
  }

  for (let i = 1; i <= 10; i++) {
    let index = i + secondOnes;
    if (index > 10) { index = index - 10; }
    CSS += `.secondOnes li:nth-child(${index}){
      animation:ten${i} 10s cubic-bezier(0.9, 0, 0.9, 0) infinite;
    }`;
  }

  styleElement.innerHTML += CSS;
}


function staticCss() {
  let CSS = '';

  CSS = `
  
html {
  height: 100%;
}

body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background: #DB6713;
  background: linear-gradient(45deg, #dba013, #df2445);
  font-family: "Lato", sans-serif;
}

div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

ul {
  position: relative;
  width: 30px;
  height: 35px;
  margin: 0;
  padding: 0;
  float: left;
  list-style-type: none;
  font-size: 35px;
  font-weight: bold;
}
ul:nth-of-type(even) {
  margin-right: 15px;
  padding-right: 15px;
}
ul:nth-of-type(even)::after {
  content: ":";
  position: absolute;
  right: 0;
  color: #FFF;
  line-height: 1;
}
ul:last-of-type::after {
  display: none;
}
ul li {
  position: absolute;
  backface-visibility: hidden;
  color: rgba(255, 255, 255, 0.2);
  font-size: 35px;
  line-height: 1;
}
  `;

  styleElement.innerHTML += CSS;

}


// document.addEventListener('DOMContentLoaded', function () {

  generateAnimation("ten", 10);
  generateAnimation("six", 6);
  generateAnimation("three", 3);


  assignAnimations();

  staticCss();

  console.log(styleElement.innerHTML);
  document.head.appendChild(styleElement);
// });

