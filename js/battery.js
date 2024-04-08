/* Variables
-------------------------------------------------- */
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
const imageContainer = document.getElementById('image-container');
const batteryImage = document.getElementById('batteryImage');

/* Functions
-------------------------------------------------- */
function updateBatteryStatus(battery) {
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;
    
    // Update robot image based on battery level
    updateRobotImage(battery.level);
}

function updateRobotImage(batteryLevel) {
    const imageUrl = generateRobotImageUrl(batteryLevel);
    batteryImage.src = imageUrl;
}

function generateRobotImageUrl(batteryLevel) {
    // Generate robot image URL based on battery level
    const percentage = Math.round(batteryLevel * 100);
    return `https://robohash.org/${percentage}.png`;
}

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});
