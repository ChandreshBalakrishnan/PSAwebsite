const tabs = document.querySelectorAll(".tab");
const viewer = document.getElementById("viewer");
const pdfViewer = document.getElementById("pdf-viewer");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // Update active tab UI
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.type;
    const src = tab.dataset.src;

    // Switch content
    if (type === "model") {
      pdfViewer.style.display = "none";
      viewer.style.display = "block";

      // Force reload to avoid caching issues
      viewer.removeAttribute("src");
      setTimeout(() => {
        viewer.setAttribute("src", src);
      }, 50);
    }

    if (type === "pdf") {
      viewer.style.display = "none";
      pdfViewer.style.display = "block";
      pdfViewer.src = src;
    }
  });
});
