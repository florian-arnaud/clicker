// Variables
const clicksElement = document.getElementById("totalClicks");
const clicksPerSecondElement = document.getElementById("clicksPerSecond");
const autoclickerLevelElement = document.getElementById("autoclickerLevel");

let totalClicks = 0
let autoClicks = 0; // Automatically click once per second
let cost = 1; // This cost should increase exponentially
let upgradeSpeed = 0; // Level of the speed up upgrade
let clickRate = 1000; // Milliseconds between each autoclick
let autoClickInterval; // Storing the interval for updating
let clickIncrement = 1; // Number of clicks per click
const storedClicks = localStorage.getItem("totalClicks");
const storedAutoClicks = localStorage.getItem("Autoclicker");
if (storedClicks) {
    totalClicks = parseInt(storedClicks, 10); 
    updateTotalClicks()
}

/* Loading progression from local storage*/
console.log(autoClicks);
if (storedAutoClicks) {
    console.log(localStorage);
    updateAutoClick()
    autoClicks = parseInt(storedAutoClicks, 10);
}

document.getElementById("click").onclick = function () {
    totalClicks = parseFloat(totalClicks) + parseFloat(clickIncrement);
    saveClicksToLocalStorage();
    updateTotalClicks();
};

document.getElementById("buyClick").onclick = function () {
    // Check if enough clicks are available for purchase
    if (!buyBonus(cost, this)) {
        return;
    }

    autoClicks++;
    saveAutoClickerBonusToLocalStorage()
    cost = Math.pow(2, autoClicks);
    updateTotalClicks();
    clicksPerSecondElement.textContent = autoClicks;

    this.textContent = "Buy for " + cost;
    console.log(cost);
    autoclickerLevelElement.textContent = "Level " + autoClicks; 
};
updateWorkers()