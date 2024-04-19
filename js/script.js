document.addEventListener("DOMContentLoaded", function() {
    const clicksElement = document.getElementById("totalClicks");
    const clicksPerSecondElement = document.getElementById("clicksPerSecond");
    const autoclickerLevelElement = document.getElementById("autoclickerLevel");
    const speedLevelElement = document.getElementById("speedLevel");
    const increaseClicksButton = document.getElementById("increaseClicks"); // Ajout pour le bouton d'augmentation des clics

    let totalClicks = 0;
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
        updateTotalClicks();
    }

    console.log(autoClicks);
    if (storedAutoClicks) {
        console.log(localStorage);
        updateAutoClick();
        autoClicks = parseInt(storedAutoClicks, 10);
    }

    document.getElementById("click").addEventListener("click", function() {
        totalClicks += clickIncrement;
        saveClicksToLocalStorage();
        updateTotalClicks();
    });

    document.getElementById("autoclickButton").addEventListener("click", function() {
        if (!buyBonus(cost, this)) {
            return;
        }

        autoClicks++;
        saveAutoClickerBonusToLocalStorage();
        cost = Math.pow(2, autoClicks);
        updateTotalClicks();
        clicksPerSecondElement.textContent = autoClicks;

        this.textContent = "Buy for " + cost;
        console.log(cost);
        autoclickerLevelElement.textContent = "Level " + autoClicks;
    });

    document.getElementById("upgradeSpeed").addEventListener("click", function() {
        if (!buyBonus(cost, this)) {
            return;
        }

        upgradeSpeed++;
        saveUpgradeSpeedToLocalStorage();
        cost += 100;
        updateTotalClicks();
        speedLevelElement.textContent = "Level " + upgradeSpeed;

        this.textContent = "Buy for " + cost;
    });

    increaseClicksButton.addEventListener("click", function() { // Ajout pour le bouton d'augmentation des clics
        if (!buyBonus(cost, this)) {
            return;
        }

        clickIncrement++;
        saveClickIncrementToLocalStorage();
        cost += 100; // Coût arbitraire, à modifier selon les besoins
        updateTotalClicks();

        this.textContent = "Buy for " + cost;
    });

    updateWorkers();

    const autoclickButton = document.getElementById("autoclickButton");
    autoclickButton.innerHTML = '<i class="fas fa-hand-pointer"></i> ' + autoclickButton.innerHTML;

    const upgradeSpeedButton = document.getElementById("upgradeSpeed");
    upgradeSpeedButton.innerHTML = '<i class="fas fa-person-running"></i> ' + upgradeSpeedButton.innerHTML;

    increaseClicksButton.innerHTML = '<i class="fas fa-gauge"></i> ' + increaseClicksButton.innerHTML;

    function updateTotalClicks() {
        clicksElement.textContent = totalClicks;
    }

    function saveClicksToLocalStorage() {
        localStorage.setItem("totalClicks", totalClicks);
    }

    function buyBonus(cost, buyButton) {
        if (totalClicks < cost) {
            buyButton.classList.add('btn-danger');

            setTimeout(() => {
                buyButton.classList.remove('btn-danger');
                buyButton.classList.add('btn-success');
            }, 1000);

            return false;
        }

        totalClicks -= cost;
        return true;
    }

    function saveAutoClickerBonusToLocalStorage() {
        localStorage.setItem("Autoclicker", autoClicks);
        localStorage.setItem("Autoclicker Cost", cost);
    }

    function updateAutoClick() {
        document.getElementById("autoclickButton").textContent = "Buy for " + parseInt(localStorage.getItem("Autoclicker Cost"), 10);
        clicksPerSecondElement.textContent = parseInt(localStorage.getItem("Autoclicker"), 10);
        autoclickerLevelElement.textContent = "Level " + localStorage.getItem("Autoclicker");
    }

    function updateWorkers() {
        const timePeriodElement = document.getElementById("timePeriod");
        timePeriodElement.textContent = (clickRate / 1000.0).toFixed(2);

        clearInterval(autoClickInterval);

        autoClickInterval = setInterval(() => {
            totalClicks += autoClicks;
            updateTotalClicks();
            saveClicksToLocalStorage();
        }, clickRate);
    }

    function saveUpgradeSpeedToLocalStorage() {
        localStorage.setItem("UpgradeSpeed", upgradeSpeed);
        localStorage.setItem("UpgradeSpeed Cost", cost);
    }

    function saveClickIncrementToLocalStorage() { // Ajout pour enregistrer l'incrémentation des clics dans le stockage local
        localStorage.setItem("ClickIncrement", clickIncrement);
    }
});
