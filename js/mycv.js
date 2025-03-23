$(document).ready(function () {
  $("#toggle-education").click(function () {
    $("#education-panel").fadeIn(600).addClass("active");
    $("#work-panel").fadeOut(400).removeClass("active");
    $("#toggle-education").addClass("active");
    $("#toggle-work").removeClass("active");
  });

  $("#toggle-work").click(function () {
    $("#work-panel").fadeIn(600).addClass("active");
    $("#education-panel").fadeOut(400).removeClass("active");
    $("#toggle-work").addClass("active");
    $("#toggle-education").removeClass("active");
  });
});

$(document).ready(function () {
  function revealTimelineItems() {
    $(".timeline-item").each(function () {
      let windowHeight = $(window).height();
      let elementTop = $(this).offset().top;
      let scrollTop = $(window).scrollTop();

      if (elementTop < windowHeight + scrollTop - 50) {
        $(this).addClass("show");
      }
    });
  }

  // Activate on scroll
  $(window).on("scroll", revealTimelineItems);
  revealTimelineItems(); // Initial check
});
