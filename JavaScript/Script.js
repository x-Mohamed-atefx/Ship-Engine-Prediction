function calculate() {
    let tempInput = document.getElementById("temp");
    let rpmInput = document.getElementById("rpm");
    let distInput = document.getElementById("dist");
    let typeInput = document.getElementById("type");

    if (tempInput.value === "" || rpmInput.value === "" || distInput.value === "") {
        alert("Input Error");
        return; // السطر ده هو اللي بيخلي الكود يقف وما يكملش الحسابات
    }

    let temp = Number(tempInput.value);
    let rpm = Number(rpmInput.value);
    let dist = Number(distInput.value);
    let type = typeInput.value;

    let factor = (type === "diesel") ? 0.02 : 0.015;

    let speed = rpm * factor; // ضربنا في الـ factor عشان الحسبة تكون أدق
    let time = dist / speed;

    let tempStatusText = "";
    let tempColor = "";

    if (temp > 1000) {
        tempStatusText = "Danger";
        tempColor = "#ef4444"; 
    } else if (temp > 500) {
        tempStatusText = "Warning";
        tempColor = "#f59e0b"; 
    } else {
        tempStatusText = "Normal";
        tempColor = "#22c55e"; 
    }

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

    myChart.data.datasets[0].data[0] = temp;
    myChart.data.datasets[0].data[1] = rpm;
    myChart.data.datasets[0].data[2] = speed;
    myChart.update();
}