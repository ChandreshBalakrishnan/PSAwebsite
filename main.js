const viewer = document.getElementById("viewer");
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    viewer.src = tab.dataset.model;
  });
});
