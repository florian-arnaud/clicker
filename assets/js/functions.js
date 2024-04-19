
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
function loadLocalStorage() {
  /* Loading progression from local storage*/
if (storedClicks) {
  totalClicks = parseInt(storedClicks, 10);
  updateTotalClicks()
}

if (storedAutoClicks) {
  autoClicks = parseInt(storedAutoClicks, 10);
  updateAutoClick()

}

if (storedSpeedUpgrade) {
  speedUpgrade = parseInt(storedSpeedUpgrade, 10)
  document.getElementById("speedUpgrade").textContent = "Buy for " + localStorage.getItem("speedUpgrade Cost")
  speedLevelElement.textContent = "Level " + localStorage.getItem("speedUpgrade")
  clickRate = localStorage.getItem("clickRate");
}

if(storedIncrementClicksLevel)
{
  clickIncrement = localStorage.getItem("clickIncrement")
  clickIncrementLevelElement.textContent = "Level " + localStorage.getItem("clickIncrement")
  document.getElementById("clickIncrement").textContent = "Buy for " + localStorage.getItem("clickIncrement Cost")

}
}

function saveAutoClickerBonusToLocalStorage(cost) {
  localStorage.setItem("autoClicker", autoClicks)
  localStorage.setItem("autoClicker Cost", cost)
}

function saveSpeedUpgradeBonusToLocalStorage(cost) {
  localStorage.setItem("speedUpgrade", speedUpgrade)
  localStorage.setItem("speedUpgrade Cost", cost)
  localStorage.setItem("clickRate", clickRate)
}

function saveClickIncrementToLocalStorage(cost) {
  localStorage.setItem("clickIncrement", clickIncrement)
  localStorage.setItem("clickIncrement Cost", cost)
}
function updateAutoClick() {
  document.getElementById("autoclickButton").textContent = "Buy for " + (parseInt(localStorage.getItem("autoClicker Cost"),10));
  clicksPerSecondElement.textContent = parseInt(localStorage.getItem("autoClicker"))
  autoclickerLevelElement.textContent = "Level " + localStorage.getItem("autoClicker")

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
