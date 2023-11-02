const container = document.querySelector("#logo-container")
  const contact = container.querySelector(".contact")
  const socialLinks = container.querySelectorAll(".contact a")
  const heading = container.querySelector("h1")
  const subheading = container.querySelector("h2")
  const line = container.querySelector(".line")
  const linkText = container.querySelector(".text")
  
let mouseLeaveInterval

init();

function init() {
  // Link depth of field effect
  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
      clearInterval(mouseLeaveInterval)
      addBlur()
      e.target.classList.remove("blurred")
      linkText.innerHTML = e.target.getAttribute("alt")
      linkText.style.opacity = 1
    })
    link.addEventListener("mouseleave", (e) => {
      mouseLeaveInterval = setInterval(removeBlur, 250)
      linkText.style.opacity = 0
    })
  })

  // Animate Move
  container.addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  
  //Animate In
  container.addEventListener("mouseenter", (e) => {
    container.style.transition = "none";
    //Popout
    heading.style.transform = "translateZ(50px)";
    line.style.transform = "translateZ(50px)";
    subheading.style.transform = "translateZ(50px)";
    contact.style.transform = "translateZ(50px)";
  });
  
  //Animate Out
  container.addEventListener("mouseleave", (e) => {
    container.style.transition = "all 0.5s ease";
    container.style.transform = `rotateY(0deg) rotateX(0deg)`;
    //Popback
    heading.style.transform = "translateZ(0)";
    line.style.transform = "translateZ(0)";
    subheading.style.transform = "translateZ(0)";
    contact.style.transform = "translateZ(0)";
  });
}

function addBlur() {
  heading.classList.add('blurred')
  subheading.classList.add('blurred')
  line.classList.add('blurred')
  contact.querySelectorAll("a").forEach(innerLink => {
    innerLink.classList.add('blurred')
  })
}

function removeBlur() {
  heading.classList.remove('blurred')
  subheading.classList.remove('blurred')
  line.classList.remove('blurred')
  contact.querySelectorAll("a").forEach(innerLink => {
    innerLink.classList.remove('blurred')
  })
  clearInterval(mouseLeaveInterval)
}