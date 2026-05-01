function calculate() {
    // 1️⃣ Inputs
    let temp = Number(document.getElementById("temp").value);
    let rpm = Number(document.getElementById("rpm").value);
    let dist = Number(document.getElementById("dist").value);
    let type = document.getElementById("type").value;

    // 2️⃣ Engine Factor
    let factor = (type === "diesel") ? 0.02 : 0.015;

    let speed = rpm * factor;
    let time = dist / speed;

    // 3️⃣ Temperature Status logic
    let tempStatusText = "";
    let tempColor = "";

    if (temp > 1000) {
        tempStatusText = "Danger";
        tempColor = "#ef4444"; // Red
    } else if (temp > 500) {
        tempStatusText = "Warning";
        tempColor = "#f59e0b"; // Orange
    } else {
        tempStatusText = "Normal";
        tempColor = "#22c55e"; // Green
    }

    // 4️⃣ Update Dashboard (بدل الـ Alert)
    document.getElementById("tempStatus").innerHTML = `Temp: <b>${tempStatusText}</b>`;
    document.getElementById("tempStatus").style.color = tempColor;

    document.getElementById("speedStatus").innerText = `Speed: ${speed.toFixed(2)} km/h`;

    if (speed > 0) {
        document.getElementById("timeStatus").innerText = `Time: ${time.toFixed(2)} h`;
        document.getElementById("reachStatus").innerText = (speed < 28) ? "Route: Inefficient" : "Route: Optimal";
    } else {
        document.getElementById("timeStatus").innerText = "Time: --";
        document.getElementById("reachStatus").innerText = "Route: --";
    }

    // 5️⃣ Update Chart
    myChart.data.datasets[0].data[0] = temp;
    myChart.data.datasets[0].data[1] = rpm;
    myChart.data.datasets[0].data[2] = speed;
    myChart.update();
}