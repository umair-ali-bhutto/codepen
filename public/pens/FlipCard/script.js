const card = document.querySelector(".card");
const btn = card.querySelector(".card__btn");
const btnBg = btn.querySelector(".btn__bg");
const btnArrow = btn.querySelector(".btn__arrow");

btn.addEventListener("click", (e) => {
  const target = e.target.closest(".card__btn");

  if (!target) return;
  card.classList.toggle("rotation");
  btnBg.classList.add("animate");
  btnArrow.classList.toggle("flip");
});

btn.addEventListener("animationend", (e) => {
  btnBg.classList.remove("animate");
});
