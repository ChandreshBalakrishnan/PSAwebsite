const viewer = document.getElementById("viewer");
const pdfViewer = document.getElementById("pdf-viewer");
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.type;
    const src = tab.dataset.src;

    if (type === "model") {
      pdfViewer.style.display = "none";
      viewer.style.display = "block";

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
