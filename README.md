# 🌱 Smart Crop Recommendation System

## 📌 Project Overview

The **Smart Crop Recommendation System** is a Machine Learning based application that recommends the most suitable crop based on soil nutrients and environmental conditions.

The system analyzes important agricultural parameters such as:

* Nitrogen (N)
* Phosphorus (P)
* Potassium (K)
* Temperature
* Humidity
* Soil pH
* Rainfall

Based on these inputs, the trained Machine Learning model predicts the **best crop to cultivate**.

Currently, this repository contains the **software implementation** of the project.
In future phases, **hardware sensors will be integrated** to automatically collect environmental data from the field.

---

# 🎯 Project Objective

The objective of this project is to assist farmers and agricultural planners in making **data-driven crop decisions**.

Goals of the system:

* Improve crop yield
* Reduce wrong crop selection
* Promote smart agriculture
* Use soil nutrients efficiently
* Support precision farming

---

# 🧠 Technologies Used

### Programming Language

* Python

### Machine Learning

* Scikit-learn
* NumPy
* Joblib

### Web Development

* Flask
* HTML
* CSS
* JavaScript

### Dataset

* Crop Recommendation Dataset containing soil and environmental data.

---

# ⚙️ System Architecture

The system consists of two major components:

## 1️⃣ Software System (Current Repository)

The software performs the following tasks:

1. Accepts soil and environmental parameters from the user interface.
2. Sends the input data to the backend server.
3. The trained Machine Learning model processes the data.
4. The system predicts the most suitable crop.
5. The predicted crop is displayed to the user.

---

# 🖥️ Input Parameters

| Parameter      | Description                    |
| -------------- | ------------------------------ |
| Nitrogen (N)   | Nitrogen content in soil       |
| Phosphorus (P) | Phosphorus content in soil     |
| Potassium (K)  | Potassium content in soil      |
| Temperature    | Environmental temperature (°C) |
| Humidity       | Relative humidity (%)          |
| pH             | Soil pH level                  |
| Rainfall       | Rainfall level (mm)            |

---

# 📂 Project Structure

```
Mini-Project/
│
├── app.py
├── train_model.py
├── crop_model.pkl
├── Crop_recommendation.csv
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── README.md
```

---

# 🚀 How to Run the Project

### Step 1 — Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

---

### Step 2 — Open the Project Folder

```
cd YOUR_REPOSITORY_NAME
```

---

### Step 3 — Install Required Libraries

```
pip install flask numpy scikit-learn joblib
```

---

### Step 4 — Run the Application

```
python app.py
```

---

### Step 5 — Open the Web App

Open your browser and go to:

```
http://127.0.0.1:5000
```

---

# 🔌 Hardware Integration (Future Work)

To make the system fully automated, hardware sensors will be integrated to collect **real-time environmental data** from the field.

## Hardware Components

The following hardware components can be used:

* Soil Moisture Sensor
* Temperature & Humidity Sensor (DHT11 / DHT22)
* Soil pH Sensor
* Microcontroller:

  * Arduino
  * NodeMCU (ESP8266)
  * Raspberry Pi
* Water Pump (for irrigation automation)

---

# ⚙️ Role of Hardware System

The hardware system will act as a **data collection module**.

It will:

* Measure soil moisture
* Measure temperature
* Measure humidity
* Measure soil pH
* Send data to the system via **WiFi or USB**

---

# 🔄 System Data Flow

1. Sensors collect environmental data.
2. Microcontroller processes sensor readings.
3. Data is sent to the software system.
4. The Machine Learning model analyzes the data.
5. The system recommends the best crop.

---

# 🌾 Smart Irrigation Possibility

The system can also automate irrigation.

Example:

* If **soil moisture is low → Water pump turns ON**
* If **soil moisture is sufficient → Pump stays OFF**

This converts the project into a **Smart Agriculture IoT System**.

---

# 🔮 Future Improvements

Possible future enhancements:

* Real-time IoT sensor integration
* Mobile application for farmers
* Cloud data storage
* Crop analytics dashboard
* Fertilizer recommendation system
* Weather API integration

---

# 🌍 Applications

* Smart Farming
* Precision Agriculture
* Agricultural Decision Support Systems
* Farming Research Projects

---

# 👨‍💻 Contributors

Project Team:
Gauri Singh
Akshara Mishra
Pulkit Kulshreshtha

---

# 📜 License

This project is developed for **educational and academic purposes**.
