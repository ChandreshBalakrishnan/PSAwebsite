const viewer = document.getElementById("viewer");
const modelTabs = document.querySelectorAll(".tab[data-model]");
const content = document.getElementById("content");
const modelContainer = document.getElementById("model-container");

modelTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    modelTabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // switch to model-only view
    content.classList.add("hidden");
    modelContainer.classList.remove("hidden");

    const newSrc = tab.dataset.model;
    viewer.src = "";
    setTimeout(() => viewer.src = newSrc, 10);
  });
});
