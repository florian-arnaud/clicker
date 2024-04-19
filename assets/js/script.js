// Variables
const clicksElement = document.getElementById("totalClicks");
const clicksPerSecondElement = document.getElementById("clicksPerSecond");
const timePeriodElement = document.getElementById("timePeriod");
const clickIncrementLevelElement = document.getElementById("clickIncrementLevel")
const autoclickerLevelElement = document.getElementById("autoclickerLevel");
const speedLevelElement = document.getElementById("speedLevel")
let totalClicks = 0
let autoClicks = 0; // Automatically click once per second
let cost = 1 // This cost should increase exponentially
let speedUpgrade = 0; // Level of the speed up upgrade
let clickRate = 1000; // Milliseconds between each autoclick
let autoClickInterval; // Storing the interval for updating
let clickIncrement = 0; // Number of clicks per click
const storedClicks = localStorage.getItem("totalClicks");
const storedAutoClicks = localStorage.getItem("autoClicker");
const storedSpeedUpgrade = localStorage.getItem("speedUpgrade")
const storedIncrementClicksLevel = localStorage.getItem("clickIncrement")
loadLocalStorage()
document.getElementById("click").addEventListener("click", function () {
    totalClicks = totalClicks +1 + parseInt(clickIncrement)
    saveClicksToLocalStorage();
    updateTotalClicks();
})

document.getElementById("autoclickButton").addEventListener("click", function () {
    localStorage.getItem("autoClicker Cost")? this.cost = localStorage.getItem("autoClicker Cost") : this.cost = 10
    console.log(this.cost);
    // Check if enough clicks are available for purchase
    if (!buyBonus(this.cost, this)) {
        return;
    }

    autoClicks++
    this.cost = Math.round(Math.pow(1.20, autoClicks) * this.cost);
    saveAutoClickerBonusToLocalStorage(this.cost)
    updateTotalClicks();
    clicksPerSecondElement.textContent = autoClicks;
    this.textContent = "Buy for " + localStorage.getItem("autoClicker Cost")
    autoclickerLevelElement.textContent = "Level " + autoClicks;
})

document.getElementById("speedUpgrade").addEventListener("click", function () {
    localStorage.getItem("speedUpgrade Cost")? this.cost = localStorage.getItem("speedUpgrade Cost") : this.cost = 100
    // Check if enough clicks are available for purchase
    if (!buyBonus(this.cost, this)) {
        return;
    }
    speedUpgrade++;
    this.cost = Math.round(Math.pow(1.20, speedUpgrade) * this.cost);
    clickRate = clickRate * 0.90;
    saveSpeedUpgradeBonusToLocalStorage(this.cost)
    updateWorkers()
    this.textContent = "Buy for " + localStorage.getItem("speedUpgrade Cost");
    speedLevelElement.textContent = "Level " + speedUpgrade;
})

document.getElementById("clickIncrement").addEventListener("click", function () {
    localStorage.getItem("clickIncrement Cost")? this.cost = localStorage.getItem("clickIncrement Cost") : this.cost = 50
    if (!buyBonus(this.cost, this)) {
        return;
    }
    clickIncrement++;
    this.cost = Math.round(Math.pow(1.20, clickIncrement) * this.cost);
    saveClickIncrementToLocalStorage(this.cost)
    console.log(clickIncrement);
    updateWorkers()
    this.textContent = "Buy for " + this.cost;
    clickIncrementLevelElement.textContent = "Level " + localStorage.getItem("clickIncrement");

})
updateWorkers()