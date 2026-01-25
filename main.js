const viewer = document.getElementById("viewer");
const tabs = document.querySelectorAll(".tab[data-model]");

// Function to recolor model
function recolorModel(color = [1, 0, 0, 1]) { // default red
  if (!viewer.model) return;
  viewer.model.materials.forEach((material) => {
    material.pbrMetallicRoughness.baseColorFactor = color;
  });
}

// Set up tab click behavior
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Update active class
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const newSrc = tab.dataset.model;

    // Force reload to avoid caching
    viewer.removeAttribute("src");
    setTimeout(() => {
      viewer.setAttribute("src", newSrc);
    }, 50);
  });
});

// Recolor the model after it loads (for first model and after switches)
viewer.addEventListener("load", () => {
  recolorModel(); // recolor to red
});
