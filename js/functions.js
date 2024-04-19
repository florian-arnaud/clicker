
function updateTotalClicks() {
  clicksElement.textContent = localStorage.getItem("totalClicks");
}

function saveClicksToLocalStorage() {
  localStorage.setItem("totalClicks", totalClicks);

}

function buyBonus(cost, buyButton) {
  // Check if enough clicks are available
  if (totalClicks < cost) {
    // Set button to indicate insufficient clicks
    buyButton.classList.add('btn-danger');

    // Reset button style after a short delay
    setTimeout(() => {
      buyButton.classList.remove('btn-danger');
      buyButton.classList.add('btn-success'); // Assuming success state class
    }, 1000);

    // Indicate insufficient clicks
    return false;
  }

  // Deduct cost from clicks and indicate success
  totalClicks -= cost;
  return true;
}

function saveAutoClickerBonusToLocalStorage() {
  localStorage.setItem("Autoclicker", autoClicks)
  localStorage.setItem("Autoclicker Cost", cost)
}

function updateAutoClick() {
  document.getElementById("autoclickButton").textContent = "Buy for " + (parseInt(localStorage.getItem("Autoclicker Cost"),10));
  clicksPerSecondElement.textContent = parseInt(localStorage.getItem("Autoclicker"))
  autoclickerLevelElement.textContent = "Level " + localStorage.getItem("Autoclicker")

}
function updateWorkers() {
  // Update time period display
  const timePeriodElement = document.getElementById("timePeriod");
  timePeriodElement.textContent = (clickRate / 1000.0).toFixed(2);

  clearInterval(autoClickInterval);

  autoClickInterval = setInterval(() => {
    totalClicks += autoClicks;
    updateTotalClicks();
    saveClicksToLocalStorage()}, clickRate);
}
