// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".s-checkbox-label").forEach((label) => {
//     label.addEventListener("click", function (event) {
//       let checkbox = this.previousElementSibling;
//       checkbox.checked = !checkbox.checked;
//       event.preventDefault(); // Prevent multi-clicks error
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const checkboxes = document.querySelectorAll(".s-checkbox");
//   const progressBar = document.getElementById("html-progress");
//   const progressText = document.getElementById("progress-text");
//   const totalCount = checkboxes.length; // total count = 15

//   function updateProgressBar() {
//     const checkedCount = document.querySelectorAll(
//       ".s-checkbox:checked"
//     ).length;
//     // const totalCount = checkboxes.length;
//     const percentage = (checkedCount / totalCount) * 100;

//     progressBar.style.width = percentage + "%";
//     progressText.textContent = `${checkedCount}/${totalCount}`; // Show n/15

//     // Gradient color according to percentage change
//     let gradientColor = "";
//     let textColor = "";
//     let boxShadow = "";

//     if (percentage <= 30) {
//       gradientColor = "linear-gradient(90deg, red, yellow)";
//     } else if (percentage <= 50) {
//       gradientColor = "linear-gradient(90deg, red, yellow, green)";
//     } else if (percentage <= 70) {
//       gradientColor = "linear-gradient(90deg, red, yellow, green, blue)";
//     } else if (percentage <= 99) {
//       gradientColor =
//         "linear-gradient(90deg, red, yellow, green, blue, purple)";
//     } else {
//       gradientColor =
//         "linear-gradient(90deg, red, yellow, green, blue, purple)";
//       textColor = "white";
//       boxShadow = "0px 0px 15px rgba(128, 0, 128, 0.7)";
//     }

//     progressBar.style.background = gradientColor;
//     progressBar.style.boxShadow = boxShadow;
//     progressText.style.color = textColor;
//   }

//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener("change", updateProgressBar);
//   });

//   // Initialized progress bar
//   updateProgressBar();
// });

// -----------------NEW-------------------------------------------------------
// document.addEventListener("DOMContentLoaded", function () {
//   const sections = document.querySelectorAll(".checklist-section");

//   sections.forEach((section) => {
//     const checkboxes = section.querySelectorAll(".s-checkbox");
//     const progressBar = section.querySelector(".progress-bar");
//     const progressText = section.querySelector(".progress-text");
//     const toggleAllBtn = section.querySelector(".toggle-all-btn");
//     const collapseBtn = section.querySelector(".collapse-btn");
//     const checklistBody = section.querySelector(".checklist-body");
//     const totalCount = checkboxes.length;

//     function updateProgressBar() {
//       const checkedCount = section.querySelectorAll(
//         ".s-checkbox:checked"
//       ).length;
//       const percentage = (checkedCount / totalCount) * 100;

//       progressBar.style.width = percentage + "%";
//       progressText.textContent = `${checkedCount}/${totalCount}`;

//       let gradientColor = "";
//       let textColor = "";
//       let boxShadow = "";

//       if (percentage <= 30) {
//         gradientColor = "linear-gradient(90deg, red, yellow)";
//       } else if (percentage <= 50) {
//         gradientColor = "linear-gradient(90deg, red, yellow, green)";
//       } else if (percentage <= 80) {
//         gradientColor = "linear-gradient(90deg, red, yellow, green, blue)";
//       } else {
//         gradientColor =
//           "linear-gradient(90deg, red, yellow, green, blue, purple)";
//         textColor = "white";
//         boxShadow = "0px 0px 15px rgba(128, 0, 128, 0.7)";
//       }

//       progressBar.style.background = gradientColor;
//       progressBar.style.boxShadow = boxShadow;
//       progressText.style.color = textColor;
//     }

//     // Listen to checkbox change to update progress bar
//     checkboxes.forEach((checkbox) => {
//       checkbox.addEventListener("change", updateProgressBar);
//     });

//     // Select/Unselect all
//     toggleAllBtn.addEventListener("click", function () {
//       const allChecked = [...checkboxes].every((checkbox) => checkbox.checked);
//       checkboxes.forEach((checkbox) => {
//         checkbox.checked = !allChecked;
//       });

//       updateProgressBar(); // update progress bar
//     });

//     // Fold/Unfold
//     collapseBtn.addEventListener("click", function () {
//       checklistBody.classList.toggle("collapsed");

//       // Change icon for fold/unfold
//       if (checklistBody.classList.contains("collapsed")) {
//         collapseBtn.textContent = "▶"; // When Folded
//       } else {
//         collapseBtn.textContent = "🔽"; // When Unfolded
//       }
//     });

//     updateProgressBar();
//   });
// });

// NEW-------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".checklist-section");
  const totalCheckedText = document.getElementById("total-checked");

  function updateTotalChecked() {
    const checkedCount = document.querySelectorAll(
      ".s-checkbox:checked"
    ).length;
    const totalCount = document.querySelectorAll(".s-checkbox").length;
    totalCheckedText.textContent = `Checked ${checkedCount}/${totalCount}`;
  }

  sections.forEach((section) => {
    const checkboxes = section.querySelectorAll(".s-checkbox");
    const progressBar = section.querySelector(".progress-bar");
    const progressText = section.querySelector(".progress-text");
    const toggleAllBtn = section.querySelector(".toggle-all-btn");
    const collapseBtn = section.querySelector(".collapse-btn");
    const checklistBody = section.querySelector(".checklist-body");
    const totalCount = checkboxes.length;

    function updateProgressBar() {
      const checkedCount = section.querySelectorAll(
        ".s-checkbox:checked"
      ).length;
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

    // Listen to checkbox change to update progress bar and total count
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateProgressBar();
        updateTotalChecked();
      });
    });

    // Select/Unselect all
    toggleAllBtn.addEventListener("click", function () {
      const allChecked = [...checkboxes].every((checkbox) => checkbox.checked);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = !allChecked;
      });

      updateProgressBar(); // update section progress bar
      updateTotalChecked(); // update total checked count
    });

    // Fold/Unfold checklist
    collapseBtn.addEventListener("click", function () {
      checklistBody.classList.toggle("collapsed");

      // Change icon for fold/unfold
      collapseBtn.textContent = checklistBody.classList.contains("collapsed")
        ? "▶"
        : "🔽";
    });

    updateProgressBar();
  });

  updateTotalChecked();
});
