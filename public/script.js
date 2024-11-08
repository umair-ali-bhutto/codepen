// const blob = document.getElementById("blob");

// window.onpointermove = event => { 
//   const { clientX, clientY } = event;
  
//   blob.animate({
//     left: `${clientX}px`,
//     top: `${clientY + window.scrollY}px`
//   }, { duration: 3000, fill: "forwards" });
// }



// var r = 255, g = 0, b = 0;

// setInterval(function () {
//   if (r > 0 && b == 0) {
//     r--;
//     g++;
//   }
//   if (g > 0 && r == 0) {
//     g--;
//     b++;
//   }
//   if (b > 0 && g == 0) {
//     r++;
//     b--;
//   }
// //   blob.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
// //   blob.style.boxShadow = "0 0 15px 5px rgb(" + r + "," + g + "," + b + ")";
// }, 100);