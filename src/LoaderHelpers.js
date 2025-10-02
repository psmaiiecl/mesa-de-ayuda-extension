export function showLoader() {
  const loader = document.getElementById("load-panel");
  loader.classList.remove("inactive");
  loader.classList.add("active");
}

export function hideLoader() {
  const loader = document.getElementById("load-panel");
  loader.classList.remove("active");
  loader.classList.add("inactive");
}