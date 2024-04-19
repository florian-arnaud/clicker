// Variables
const clicksElement = document.getElementById("totalClicks");
const clicksPerSecondElement = document.getElementById("clicksPerSecond");
const timePeriodElement = document.getElementById("timePeriod");

const autoclickerLevelElement = document.getElementById("autoclickerLevel");
const speedLevelElement = document.getElementById("speedLevel")
let totalClicks = 0
let autoClicks = 0; // Automatically click once per second
let cost = 1; // This cost should increase exponentially
let speedUpgrade = 0; // Level of the speed up upgrade
let clickRate = 1000; // Milliseconds between each autoclick
let autoClickInterval; // Storing the interval for updating
let clickIncrement = 1; // Number of clicks per click
const storedClicks = localStorage.getItem("totalClicks");
const storedAutoClicks = localStorage.getItem("autoClicker");
const storedSpeedUpgrade = localStorage.getItem("speedUpgrade")

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
}

document.getElementById("click").addEventListener("click", function () {
    totalClicks = parseFloat(totalClicks) + parseFloat(clickIncrement);
    saveClicksToLocalStorage();
    updateTotalClicks();
})

document.getElementById("autoclickButton").addEventListener("click", function () {
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
})

document.getElementById("speedUpgrade").addEventListener("click", function () {
    // Check if enough clicks are available for purchase
    if (!buyBonus(cost, this)) {
        return;
    }

    speedUpgrade++;
    cost = Math.pow(2, speedUpgrade) *100;
    saveSpeedUpgradeBonusToLocalStorage()
    clickRate = clickRate * 0.90;
    document.getElementById("speedUpgrade").textContent = "Buy for " + cost
    updateTotalClicks();
    this.textContent = "Buy for " + cost;
    console.log(speedUpgrade);
    speedLevelElement.textContent = "Level " + speedUpgrade;
})

updateWorkers()