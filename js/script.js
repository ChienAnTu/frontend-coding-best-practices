document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".s-checkbox-label").forEach((label) => {
    label.addEventListener("click", function (event) {
      let checkbox = this.previousElementSibling;
      checkbox.checked = !checkbox.checked;
      event.preventDefault(); // Prevent multi-clicks error
    });
  });
});
