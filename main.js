const viewer = document.getElementById("viewer");
const tabs = document.querySelectorAll(".tab[data-model]");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const newSrc = tab.dataset.model;

    // Force reload to avoid caching
    viewer.removeAttribute("src");
    setTimeout(() => {
      viewer.setAttribute("src", newSrc);

  });
});
