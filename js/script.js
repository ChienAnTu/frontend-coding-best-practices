// TODO: AJAX cute image : Change to - Only 1 threshold --12 checked
// ----------------------------------------------------------
// NEW: AJAX & Local storage test----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".checklist-section");
  const totalCheckedText = document.getElementById("total-checked");
  const rewardContainer = document.createElement("div");
  rewardContainer.id = "reward-container";
  rewardContainer.style.textAlign = "center";
  document.body.appendChild(rewardContainer);

  let animalImageCount = 0; // Track displayed images

  function updateTotalChecked() {
    const checkedCount = document.querySelectorAll(
      ".s-checkbox:checked"
    ).length;
    const totalCount = document.querySelectorAll(".s-checkbox").length;
    totalCheckedText.textContent = `Checked ${checkedCount}/${totalCount}`;

    if (checkedCount >= 12 && animalImageCount === 0) {
      loadRandomAnimalImage();
      animalImageCount = 1;
    }
    // TODO: Can change this to else if
    if (
      checkedCount >= 15 &&
      (animalImageCount === 1 || animalImageCount === 0)
    ) {
      loadRandomAnimalImage();
      animalImageCount = 2;
    } else if (checkedCount < 12) {
      removeAnimalImage();
      animalImageCount = 0;
    }
    saveState();
  }

  function updateProgressBar(section) {
    const checkboxes = section.querySelectorAll(".s-checkbox");
    const progressBar = section.querySelector(".progress-bar");
    const progressText = section.querySelector(".progress-text");
    const checkedCount = section.querySelectorAll(".s-checkbox:checked").length;
    const totalCount = checkboxes.length;
    const percentage = (checkedCount / totalCount) * 100;

    progressBar.style.width = percentage + "%";
    progressText.textContent = `${checkedCount}/${totalCount}`;

    let gradientColor = "";
    let textColor = "";
    let boxShadow = "";

    if (percentage <= 30) {
      gradientColor = "linear-gradient(90deg, red, yellow)";
    } else if (percentage <= 50) {
      gradientColor = "linear-gradient(90deg, red, yellow, green)";
    } else if (percentage <= 80) {
      gradientColor = "linear-gradient(90deg, red, yellow, green, blue)";
    } else {
      gradientColor =
        "linear-gradient(90deg, red, yellow, green, blue, purple)";
      textColor = "white";
      boxShadow = "0px 0px 15px rgba(128, 0, 128, 0.7)";
    }

    progressBar.style.background = gradientColor;
    progressBar.style.boxShadow = boxShadow;
    progressText.style.color = textColor;
  }

  function loadRandomAnimalImage() {
    fetch("https://random.dog/woof.json") // Public API for random dog images
      .then((response) => response.json())
      .then((data) => {
        const img = document.createElement("img");
        img.src = data.url;
        img.alt = "Random Animal";
        img.style.maxWidth = "300px";
        img.style.marginTop = "20px";
        rewardContainer.appendChild(img);
      })
      .catch((error) => console.error("Error loading animal image:", error));
  }

  function removeAnimalImage() {
    rewardContainer.innerHTML = "";
  }

  function saveState() {
    const state = {
      checkboxState: {},
      progressBars: {},
    };

    document.querySelectorAll(".s-checkbox").forEach((checkbox) => {
      state.checkboxState[checkbox.id] = checkbox.checked;
    });

    sections.forEach((section, index) => {
      const progressBar = section.querySelector(".progress-bar");
      if (progressBar) {
        state.progressBars[index] = progressBar.style.width;
      }
    });

    localStorage.setItem("savedState", JSON.stringify(state));
  }

  function loadState() {
    const savedState = JSON.parse(localStorage.getItem("savedState")) || {};
    if (savedState.checkboxState) {
      document.querySelectorAll(".s-checkbox").forEach((checkbox) => {
        if (savedState.checkboxState[checkbox.id]) {
          checkbox.checked = true;
        }
      });
    }

    sections.forEach((section, index) => {
      const progressBar = section.querySelector(".progress-bar");
      if (progressBar && savedState.progressBars) {
        progressBar.style.width = savedState.progressBars[index] || "0%";
      }
      updateProgressBar(section);
    });

    updateTotalChecked();
  }

  sections.forEach((section) => {
    const checkboxes = section.querySelectorAll(".s-checkbox");
    const toggleAllBtn = section.querySelector(".toggle-all-btn");
    const collapseBtn = section.querySelector(".collapse-btn");
    const checklistBody = section.querySelector(".checklist-body");

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateProgressBar(section);
        updateTotalChecked();
        saveState();
      });
    });

    toggleAllBtn.addEventListener("click", function () {
      const allChecked = [...checkboxes].every((checkbox) => checkbox.checked);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = !allChecked;
      });

      updateProgressBar(section);
      updateTotalChecked();
      saveState();
    });

    collapseBtn.addEventListener("click", function () {
      checklistBody.classList.toggle("collapsed");
      collapseBtn.textContent = checklistBody.classList.contains("collapsed")
        ? "▶"
        : "🔽";
    });

    updateProgressBar(section);
  });

  loadState();
});
