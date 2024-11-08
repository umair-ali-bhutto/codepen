const container = document.querySelector(".card")

// Card Tilt
container.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Option Titles
const options = document.querySelectorAll(".card__option")
const options_title = document.querySelector(".card__options-title")

options.forEach(option => {
  option.addEventListener("mouseover", () => {
    options_title.innerHTML = option.dataset.title
  })
})
