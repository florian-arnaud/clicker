// Variables
const clicksElement = document.getElementById("totalClicks");
let totalClicks = 0
let autoClicks = 0; // Automatically click once per second
let cost = 1; // This cost should increase exponentially
let upgradeSpeed = 0; // Level of the speed up upgrade
let clickRate = 1000; // Milliseconds between each autoclick
let autoClickInterval; // Storing the interval for updating
let clickIncrement = 1; // Number of clicks per click
const storedClicks = localStorage.getItem("totalClicks");
if (storedClicks) {
    totalClicks = parseInt(storedClicks, 10); // Parse stored value as integer
    updateTotalClicks()

}

document.getElementById("click").onclick = function () {
    totalClicks = parseFloat(totalClicks) + parseFloat(clickIncrement);
    saveClicksToLocalStorage(); // Save updated clicks to local storage

    updateTotalClicks(); // Updates the text
};
