// Seleccionamos todas las cards
const cards = document.querySelectorAll(".card");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalClose = document.querySelector(".modal__close");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const img = card.getAttribute("data-img");
    const title = card.getAttribute("data-title");

    modalImg.src = img;
    modalTitle.textContent = title;
    modal.style.display = "flex"; // mostramos modal
  });
});

// Cerrar modal con la X
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar al hacer clic fuera de la imagen
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
