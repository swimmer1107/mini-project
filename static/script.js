// Theme Toggle Logic
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Weather Fetching Logic
document.getElementById("fetchWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const status = document.getElementById("weatherStatus");
    status.classList.remove("hidden");
    status.innerText = "Fetching weather data...";
    status.style.background = "var(--accent-green)";
    status.style.color = "var(--primary-dark)";

    // Use API Key from CONFIG
    const apiKey = typeof CONFIG !== 'undefined' ? CONFIG.WEATHER_API_KEY : "7dd12d6d04c849f8053a9d57995e4301";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            // Check if cod is 200 (can be number or string)
            if (data.cod == 200) {
                document.getElementById("temperature").value = data.main.temp;
                document.getElementById("humidity").value = data.main.humidity;
                status.innerText = `Success! Temperature: ${data.main.temp}°C, Humidity: ${data.main.humidity}% for ${data.name}`;
                status.style.background = "#e8f5e9";
                status.style.color = "#2e7d32";
            } else {
                // Display specific error from API (e.g., "city not found", "invalid api key")
                const errorMsg = data.message ? data.message.charAt(0).toUpperCase() + data.message.slice(1) : "Error fetching weather.";
                status.innerText = `${errorMsg}. Please check and try again.`;
                status.style.background = "#ffebee";
                status.style.color = "#c62828";
            }
        })
        .catch(err => {
            console.error(err);
            status.innerText = "Network error. Please check your connection.";
        });
});

document.getElementById("cropForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");

    // Hidden results during new prediction
    document.getElementById("resultSection").classList.add("hidden");

    let data = {
        N: document.getElementById("N").value,
        P: document.getElementById("P").value,
        K: document.getElementById("K").value,
        temperature: document.getElementById("temperature").value,
        humidity: document.getElementById("humidity").value,
        ph: document.getElementById("ph").value,
        rainfall: document.getElementById("rainfall").value
    };

    fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(result => {
            // Save to history
            const predictionData = {
                id: Date.now(),
                date: new Date().toLocaleString(),
                input: data,
                result: result
            };
            saveToHistory(predictionData);

            // Hide loader after a small delay for smooth feel
            setTimeout(() => {
                loader.classList.add("hidden");
                displayResult(result, data);
            }, 1500);
        })
        .catch(error => {
            console.error("Error:", error);
            loader.classList.add("hidden");
            alert("An error occurred during prediction. Please try again.");
        });
});

function displayResult(result, inputData) {
    const resultSection = document.getElementById("resultSection");
    resultSection.classList.remove("hidden");

    const cropName = result.crop.toUpperCase();
    document.getElementById("cropName").innerText = cropName;
    document.getElementById("cropDescription").innerText = `Based on your inputs, ${result.crop} is the most suitable crop with high yield potential!`;

    calculateFertilizer(result.crop.toLowerCase(), inputData);

    // Smooth scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });

    renderCharts(result);
}

function calculateFertilizer(crop, input) {
    const ideal = (typeof CONFIG !== 'undefined' && CONFIG.IDEAL_NPK[crop]) ? CONFIG.IDEAL_NPK[crop] : { N: 50, P: 50, K: 50 }; // Fallback
    const container = document.getElementById("fertilizerDetails");
    container.innerHTML = "";

    const nutrients = [
        { name: "Nitrogen", key: "N", current: input.N },
        { name: "Phosphorus", key: "P", current: input.P },
        { name: "Potassium", key: "K", current: input.K }
    ];

    nutrients.forEach(n => {
        const diff = ideal[n.key] - n.current;
        let advice = "";
        if (diff > 10) advice = `Add ${diff.toFixed(0)} units more`;
        else if (diff < -10) advice = `Excessive by ${Math.abs(diff).toFixed(0)} units`;
        else advice = "Optimal level";

        const div = document.createElement("div");
        div.className = "fertilizer-item";
        div.innerHTML = `
            <span class="label">${n.name}</span>
            <span class="value">${n.current} / ${ideal[n.key]}</span>
            <span class="advice">${advice}</span>
        `;
        container.appendChild(div);
    });
}

// History Management
const historyDrawer = document.getElementById("historyDrawer");
const historyList = document.getElementById("historyList");

document.getElementById("openDrawer").addEventListener("click", () => historyDrawer.classList.add("active"));
document.getElementById("closeDrawer").addEventListener("click", () => historyDrawer.classList.remove("active"));

function saveToHistory(item) {
    let history = JSON.parse(localStorage.getItem("cropHistory") || "[]");
    history.unshift(item);
    history = history.slice(0, 10); // Keep last 10
    localStorage.setItem("cropHistory", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem("cropHistory") || "[]");
    historyList.innerHTML = history.length ? "" : "<p>No history yet.</p>";

    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
            <h4>${item.result.crop.toUpperCase()}</h4>
            <p>${item.date}</p>
            <small>N:${item.input.N} P:${item.input.P} K:${item.input.K}</small>
        `;
        div.addEventListener("click", () => {
            displayResult(item.result, item.input);
            historyDrawer.classList.remove("active");
        });
        historyList.appendChild(div);
    });
}

document.getElementById("clearHistory").addEventListener("click", () => {
    localStorage.removeItem("cropHistory");
    renderHistory();
});

// PDF Export Logic
document.getElementById("exportPdfBtn").addEventListener("click", () => {
    const element = document.getElementById("resultSection");
    const options = {
        margin: 10,
        filename: `Crop_Report_${document.getElementById("cropName").innerText.replace(/ /g, "_")}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
});

// Initial Render
renderHistory();

// Store chart instances to destroy them before re-rendering
let yieldChartInstance = null;
let suitabilityChartInstance = null;
let featureImportanceChartInstance = null;

function renderCharts(result) {
    const ctxYield = document.getElementById('yieldChart').getContext('2d');
    const ctxSuitability = document.getElementById('suitabilityChart').getContext('2d');
    const ctxFeature = document.getElementById('featureImportanceChart').getContext('2d');

    // Destroy existing charts if they exist
    if (yieldChartInstance) yieldChartInstance.destroy();
    if (suitabilityChartInstance) suitabilityChartInstance.destroy();
    if (featureImportanceChartInstance) featureImportanceChartInstance.destroy();

    // Set chart colors based on theme
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const textColor = isDark ? "#E0E0E0" : "#2C3E50";

    Chart.defaults.color = textColor;

    // Yield Potential Bar Chart
    yieldChartInstance = new Chart(ctxYield, {
        type: 'bar',
        data: {
            labels: ['Low', 'Medium', 'High', 'Very High'],
            datasets: [{
                label: 'Growth Index',
                data: result.yield || [10, 30, 60, 95],
                backgroundColor: isDark ? ['#2E7D32', '#43A047', '#66BB6A', '#81C784'] : ['#C8E6C9', '#81C784', '#4CAF50', '#2E7D32'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, max: 100, grid: { color: isDark ? "#444" : "#eee" } },
                x: { grid: { display: false } }
            }
        }
    });

    // Suitability Doughnut Chart
    suitabilityChartInstance = new Chart(ctxSuitability, {
        type: 'doughnut',
        data: {
            labels: ['pH Balance', 'Temperature', 'Humidity', 'Rainfall'],
            datasets: [{
                data: [30, 25, 20, 25],
                backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#795548'],
                hoverOffset: 10,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            },
            cutout: '70%'
        }
    });

    // Feature Importance Horizontal Bar Chart
    featureImportanceChartInstance = new Chart(ctxFeature, {
        type: 'bar',
        indexAxis: 'y',
        data: {
            labels: ['Rainfall', 'Humidity', 'Nitrogen', 'Temperature', 'K', 'P', 'pH'],
            datasets: [{
                label: 'Importance Score',
                data: [0.35, 0.25, 0.15, 0.1, 0.08, 0.04, 0.03],
                backgroundColor: '#4CAF50',
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { beginAtZero: true, grid: { color: isDark ? "#444" : "#eee" } },
                y: { grid: { display: false } }
            }
        }
    });
}
