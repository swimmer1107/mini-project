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
        // Hide loader after a small delay for smooth feel
        setTimeout(() => {
            loader.classList.add("hidden");
            displayResult(result);
        }, 1500);
    })
    .catch(error => {
        console.error("Error:", error);
        loader.classList.add("hidden");
        alert("An error occurred during prediction. Please try again.");
    });
});

function displayResult(result) {
    const resultSection = document.getElementById("resultSection");
    resultSection.classList.remove("hidden");

    const cropName = result.crop.toUpperCase();
    document.getElementById("cropName").innerText = cropName;
    document.getElementById("cropDescription").innerText = `Based on your inputs, ${result.crop} is the most suitable crop with high yield potential!`;

    // Smooth scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });

    renderCharts(result);
}

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

    // Yield Potential Bar Chart
    yieldChartInstance = new Chart(ctxYield, {
        type: 'bar',
        data: {
            labels: ['Low', 'Medium', 'High', 'Very High'],
            datasets: [{
                label: 'Growth Index',
                data: result.yield || [10, 30, 60, 95],
                backgroundColor: ['#C8E6C9', '#81C784', '#4CAF50', '#2E7D32'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
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
                hoverOffset: 10
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
            scales: { x: { beginAtZero: true } }
        }
    });
}
