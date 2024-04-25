const cubes = Array.from(document.querySelectorAll<HTMLElement>(".cube"));

document.addEventListener("mousemove", e => {
  cubes.forEach(cube => {
    cube.style.transform = `rotateX(${e.pageY}deg) rotateY(${e.pageX}deg)`;
  });
});
