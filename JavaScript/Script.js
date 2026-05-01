function calculate() {
    let tempInput = document.getElementById("temp");
    let vibInput = document.getElementById("vibration");
    let speedInput = document.getElementById("speed");
    let distInput = document.getElementById("dist");
    //let typeInput = document.getElementById("type");

    if (
        tempInput.value === "" ||
        vibInput.value === "" ||
        speedInput.value === "" ||
        distInput.value === ""
    ) {
        alert("Input Error");
        return;
    }

    let temp = Number(tempInput.value);
    let vibration = Number(vibInput.value);
    let speed = Number(speedInput.value);
    let dist = Number(distInput.value);
    //let type = typeInput.value;

    let time = (speed > 0) ? (dist / speed) : 0;

    // 🔴 Temperature Status
    let tempStatus = (temp > 1000) ? "Danger" :
                     (temp > 500) ? "Warning" : "Normal";

    let tempColor = (temp > 1000) ? "#ef4444" :
                    (temp > 500) ? "#f59e0b" : "#22c55e";

    // 🔵 Vibration Status
    let vibStatus = (vibration > 10) ? "Danger" :
                    (vibration > 5) ? "Warning" : "Normal";

    let vibColor = (vibration > 10) ? "#ef4444" :
                   (vibration > 5) ? "#f59e0b" : "#22c55e";

    // 📊 عرض البيانات
    document.getElementById("tempStatus").innerHTML = `Temp: <b>${tempStatus}</b>`;
    document.getElementById("tempStatus").style.color = tempColor;

    document.getElementById("vibStatus").innerHTML = `Vibration: <b>${vibStatus}</b>`;
    document.getElementById("vibStatus").style.color = vibColor;

    document.getElementById("speedStatus").innerText = `Speed: ${speed.toFixed(2)} km/h`;

    if (speed > 0) {
        document.getElementById("timeStatus").innerText = `Time: ${time.toFixed(2)} h`;
        document.getElementById("reachStatus").innerText =
            (speed < 28) ? "Route: Inefficient" : "Route: Optimal";
    } else {
        document.getElementById("timeStatus").innerText = "Time: --";
        document.getElementById("reachStatus").innerText = "Route: --";
    }

    let health = 100;

    health -= (temp / 1000) * 30;
    health -= (vibration / 10) * 40;
    health -= (speed < 20 ? 20 : 0);

    if (health < 0) health = 0;

    document.getElementById("healthStatus").innerText =
        `Health: ${health.toFixed(0)}%`;

    if (typeof myChart !== "undefined") {
        myChart.data.datasets[0].data[0] = temp;
        myChart.data.datasets[0].data[1] = speed;
        myChart.data.datasets[0].data[2] = vibration;
        myChart.update();
    }
let stress =
    (temp / 1000) * 0.5 +
    (vibration / 10) * 0.3 +
    (speed / 100) * 0.2;

let remainingHours = 100 / (1 + stress * 5);

if (remainingHours < 0) remainingHours = 0;

let lifeText = "";

if (remainingHours < 10) {
    lifeText = "Critical";
} else if (remainingHours < 30) {
    lifeText = "Maintenance Soon";
} else {
    lifeText = "Healthy";
}

document.getElementById("lifeStatus").innerText =
    `Remaining Life: ${remainingHours.toFixed(1)} h (${lifeText})`;
}