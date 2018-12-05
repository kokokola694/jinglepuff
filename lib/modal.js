const Modal = (canvas) => {
  const modal = document.getElementById('myModal');
  const openModal = document.getElementById("open-modal");
  const exitButton = document.getElementById("modal-close");

  openModal.onclick = () => {
    modal.style.display = "block";
  }

  exitButton.onclick = () => {
    modal.style.display = "none";
    canvas.focus();
  }

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
      canvas.focus();
    }
  }
}

module.exports = Modal;
