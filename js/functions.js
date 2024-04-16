
function updateTotalClicks() {
  clicksElement.textContent = localStorage.getItem("totalClicks");
}

function saveClicksToLocalStorage() {
  localStorage.setItem("totalClicks", totalClicks);

}