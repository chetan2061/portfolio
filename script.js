// Loading Screen
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  const progressFill = document.getElementById("progressFill");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      progressFill.style.width = "100%";
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 500);
      clearInterval(interval);
    } else {
      progressFill.style.width = progress + "%";
    }
  }, 100);
});
