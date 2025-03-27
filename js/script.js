document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".checklist-section");
  const totalCheckedText = document.getElementById("total-checked");
  const checkboxes = document.querySelectorAll(".s-checkbox");

  const rewardContainer = $("#reward-container");
  const bottomHint = $("#bottom-hint");
  const toggleImageBtn = $("#toggle-image-btn");
  let imageVisible = true;
  let imageLoaded = false;

  // Toggle button to show/hide cat image
  toggleImageBtn.on("click", function () {
    imageVisible = !imageVisible;
    rewardContainer.toggle(imageVisible);
    toggleImageBtn.text(imageVisible ? "Hide Image" : "Show Image");
  });

  // Back to top button
  const backToTop = $("#back-to-top");
  backToTop.on("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Scroll show/hide behavior
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 200) {
      backToTop.fadeIn();
    } else {
      backToTop.fadeOut();
    }
  });

  // Function for animation
  function triggerFlyingIcons() {
    for (let i = 0; i < 10; i++) {
      const icon = document.createElement("img");
      icon.src = "https://cdn-icons-png.flaticon.com/512/11565/11565122.png";
      icon.classList.add("flying-icon");

      // Different delay for each icon
      icon.style.left = Math.random() * 100 + "vw";
      icon.style.animationDelay = Math.random() * 5 + "s";
      document.body.appendChild(icon);
    }
  }
  // Function for removing flying icons animation
  function removeFlyingIcons() {
    document.querySelectorAll(".flying-icon").forEach((icon) => icon.remove());
  }

  // Function to update total checked count and activities
  function updateTotalChecked() {
    // Count checked checkboxes
    const checkedCount = document.querySelectorAll(
      ".s-checkbox:checked"
    ).length;
    const totalCount = checkboxes.length;
    totalCheckedText.textContent = `Checked ${checkedCount}/${totalCount}`;

    // Reward - random cat image logic
    if (checkedCount >= 12) {
      bottomHint.show();
      if (!imageLoaded) {
        loadRandomCatImage();
      }
    } else {
      bottomHint.hide();
      rewardContainer.empty();
      imageLoaded = false;
    }

    // Animation trigger logic
    if (checkedCount >= 15) {
      if (!document.querySelector(".flying-icon")) {
        triggerFlyingIcons();
      }
    } else {
      removeFlyingIcons();
    }

    saveState();
  }

  // Function to update progress bar
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

  // Function to load random cat img using AJAX through public API
  function loadRandomCatImage() {
    const catAPI = "https://api.thecatapi.com/v1/images/search";
    $.ajax({
      url: catAPI,
      method: "GET",
      success: function (data) {
        const img = document.createElement("img");
        img.src = data[0].url;
        img.alt = "Random Cat";
        rewardContainer.empty().append(img);
        rewardContainer.show();
        imageVisible = true;
        toggleImageBtn.text("Hide Image");
        imageLoaded = true;
      },
      error: function (error) {
        console.error("Error loading cat image:", error);
      },
    });
  }

  // Function to save state in local storage
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

  // Function to load state from local storage
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
