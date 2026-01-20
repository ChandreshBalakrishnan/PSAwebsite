const tabs = document.querySelectorAll(".tab");
const viewers = document.querySelectorAll(".viewer");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Remove active classes
    tabs.forEach(t => t.classList.remove("active"));
    viewers.forEach(v => v.classList.remove("active"));

    // Activate selected tab and viewer
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
