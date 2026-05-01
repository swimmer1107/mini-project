# AI-Driven Smart Agriculture & Crop Intelligence System

**Live Demo:** https://mini-project-ten-tau.vercel.app/

A real-time IoT-powered smart farming dashboard that monitors soil moisture, temperature, humidity, and water quality — with AI-driven crop recommendations, disease detection, yield prediction, and irrigation scheduling.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Hardware Components](#hardware-components)
- [Circuit Diagram](#circuit-diagram)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [Arduino Setup](#arduino-setup)
- [Dashboard Setup](#dashboard-setup)
- [AI Features](#ai-features)
- [Team](#team)
- [Institution](#institution)

---

## About the Project

The AI-Driven Smart Agriculture & Crop Intelligence System is a mini-project developed at GLA University that combines IoT hardware with Artificial Intelligence to help farmers make data-driven decisions.

The system continuously monitors key agricultural parameters using physical sensors connected to an Arduino Uno R4 WiFi, sends data to the cloud via ThingSpeak, and displays everything on a live web dashboard complete with AI-powered insights powered by Claude AI.

### Problem Statement

Traditional farming relies on guesswork for irrigation, crop selection, and disease management — leading to crop loss, water wastage, and reduced yield.

### Our Solution

A smart, affordable IoT system that provides real-time environmental data and AI-powered recommendations directly to farmers via a web dashboard accessible from any device.

---

## Features

### Real-Time Sensor Monitoring

| Sensor | Measurement | Status Indicators |
|--------|-------------|-------------------|
| Soil Moisture | 0 – 100% | DRY / MOIST / WET |
| Temperature | 0 – 50°C | COOL / OPTIMAL / HOT |
| Humidity | 0 – 100% | LOW / GOOD / HIGH |
| TDS (Water Quality) | 0 – 1500 ppm | PURE / ACCEPTABLE / POOR / UNSAFE |

### AI-Powered Features

- Crop Disease Detection — Upload a leaf photo for instant disease analysis
- Yield Prediction — Predicts expected harvest based on live sensor data
- Smart Irrigation Schedule — Generates a 7-day watering plan
- Crop Recommendation — AI advice for a selected crop based on current conditions

### Dashboard Highlights

- Live connection status (LIVE / DISCONNECTED)
- Farm Health Score out of 100
- Feels Like temperature indicator
- Critical alerts with real-time updates
- Sensor history graph showing last 10 readings
- Fully responsive design for mobile and desktop

---

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite as the build tool
- Recharts for data visualization
- Lucide React for icons

### Cloud and AI
- ThingSpeak for IoT data storage and retrieval
- Claude AI by Anthropic for AI-powered recommendations
- Vercel for deployment and hosting

### Hardware
- Arduino Uno R4 WiFi
- DHT11 Temperature and Humidity Sensor
- Soil Moisture Sensor Module
- TDS Water Quality Sensor

---

## Hardware Components

| No. | Component | Quantity | Purpose |
|-----|-----------|----------|---------|
| 1 | Arduino Uno R4 WiFi | 1 | Main microcontroller with WiFi |
| 2 | DHT11 Sensor | 1 | Temperature and humidity measurement |
| 3 | Soil Moisture Sensor | 1 | Soil water content measurement |
| 4 | TDS Sensor Module | 1 | Water quality measurement in ppm |
| 5 | Breadboard | 1 | Component connections |
| 6 | Jumper Wires | 1 set | Wiring between components |
| 7 | USB Cable | 1 | Power supply and programming |
| 8 | 5V Power Bank or Adapter | 1 | Field power supply |

---

## Circuit Diagram

```
Arduino Uno R4 WiFi
├── 5V  ─────────────────── DHT11 VCC
│                           Soil Sensor VCC
│                           TDS Sensor VCC
│
├── GND ─────────────────── DHT11 GND
│                           Soil Sensor GND
│                           TDS Sensor GND
│
├── D2  ─────────────────── DHT11 DATA pin
├── A0  ─────────────────── Soil Moisture Sensor AO pin
└── A1  ─────────────────── TDS Sensor AO pin
```

### Pin Mapping

| Arduino Pin | Connected To | Wire Colour |
|-------------|-------------|-------------|
| 5V | VCC on all sensors | Yellow |
| GND | GND on all sensors | Black |
| D2 | DHT11 DATA | Blue |
| A0 | Soil Moisture AO | Orange |
| A1 | TDS Sensor AO | Purple |

---

## System Architecture

```
HARDWARE LAYER
  DHT11 Sensor ──────┐
  Soil Moisture ─────┼──► Arduino Uno R4 WiFi ──► WiFi
  TDS Sensor ────────┘
          │
          ▼
CLOUD LAYER
  ThingSpeak IoT Platform
  Channel ID : 3361311
  Fields     : Temperature, Humidity, Soil Moisture, TDS
  Update     : Every 5 seconds
          │
          ▼
DASHBOARD LAYER
  React + TypeScript Web App hosted on Vercel
  ├── Live Sensor Cards (4 sensors)
  ├── Farm Health Score
  ├── Smart Alert System
  └── Sensor History Graph
          │
          ▼
AI LAYER
  Claude AI by Anthropic
  ├── Crop Disease Detection
  ├── Yield Prediction
  ├── Irrigation Schedule Generator
  └── Crop Recommendations
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- Arduino IDE 2.x
- ThingSpeak account (free)
- Git

### Clone the Repository

```bash
git clone https://github.com/swimmer1107/mini-project.git
cd mini-project
```

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

---

## Arduino Setup

### Step 1 — Install Required Libraries

In Arduino IDE go to Sketch → Include Library → Manage Libraries and install:
- DHT sensor library by Adafruit
- WiFiS3 (built-in for Arduino UNO R4)

### Step 2 — Configure the Code

Open the Arduino sketch and update these three lines:

```cpp
const char* ssid     = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
String apiKey        = "YOUR_THINGSPEAK_WRITE_API_KEY";
```

### Step 3 — ThingSpeak Channel Setup

1. Create a free account at thingspeak.com
2. Create a new channel with 4 fields:
   - Field 1: Temperature
   - Field 2: Humidity
   - Field 3: Soil Moisture
   - Field 4: TDS Value
3. Copy the Write API Key and paste it into the Arduino code
4. The Read API Key is already configured in the dashboard

### Step 4 — Upload and Monitor

1. Connect Arduino to your laptop via USB cable
2. In Arduino IDE select Board as Arduino UNO R4 WiFi
3. Select the correct COM port under Tools then Port
4. Click Upload
5. Open Serial Monitor at 9600 baud to verify data is sending

Expected Serial Monitor output:

```
=== SmartAgri Starting ===
Connecting to: YourHotspot
..........
WiFi Connected!
192.168.x.x
Temp: 36.9 | Humidity: 50.0 | Soil: 65 | TDS: 245.3
Data saved! ThingSpeak Entry #1
```

---

## Dashboard Setup

The dashboard is already live at:

https://mini-project-ten-tau.vercel.app/

### To Deploy Your Own Copy

1. Fork this repository on GitHub
2. Go to vercel.com and sign in
3. Click New Project and import your forked repository
4. Click Deploy — no environment variables are needed
5. Your dashboard will be live within a minute

---

## AI Features

### Crop Disease Detection

Upload any leaf photo and the system analyzes pixel colors and patterns to detect:
- Leaf Rust or Brown Spot caused by fungal infection
- Chlorosis or Yellow Leaf Disease caused by nutrient deficiency
- Black Spot or Sooty Mold caused by fungal or bacterial infection
- Healthy leaf with no disease present

Each result includes disease name, confidence percentage, visible symptoms, cause, treatment recommendation, and urgency level.

### Yield Prediction

Select crop type, farm size in acres, and farming method. The AI calculates:
- Expected yield in kg per acre
- Total yield for your full farm size
- Quality rating from Poor to Excellent
- Expected harvest timeline
- Key factors affecting yield
- Actionable tips to improve yield

### Smart Irrigation Schedule

Select crop type, growth stage, and soil type. The AI generates:
- Current urgency level: Immediate, Today, Tomorrow, or Not needed
- Recommended water amount per session in litres
- Best time to irrigate: Morning, Evening, or Both
- A complete 7-day day-by-day irrigation schedule
- Special warnings and precision tips

### Crop Recommendation

Select any crop and receive AI advice covering:
- Ideal soil type for that crop
- Ideal temperature range
- Recommended watering frequency
- Key pests to watch for
- Best fertilizer type
- Expected time to maturity

---

## Team

Project ID: 196

---

### Pulkit Kulshreshtha

- Enrollment: 2415500365
- Section: 2D
- Email: pulkit.kulshreshtha_cs.aiml24@gla.ac.in
- Contact: 7742737734

Contributions:
- Frontend development and UI/UX design
- Arduino programming and firmware development
- Hardware integration and circuit wiring
- Overall project architecture and deployment

---

### Gauri Singh

- Enrollment: 2415500181
- Section: 2I
- Email: gauri.singh_cs.aiml24@gla.ac.in

Contributions:
- AI features integration using Claude API
- Dashboard component development
- Crop disease detection feature
- Data visualization and sensor history graph

---

### Akshara Mishra

- Enrollment: 2415500046
- Section: 2G
- Email: akshara.mishra_cs.aiml24@gla.ac.in

Contributions:
- ThingSpeak IoT platform integration
- Sensor configuration and calibration
- Data pipeline from hardware to cloud
- Hardware testing and validation

---

## Institution

GLA University, Mathura, Uttar Pradesh

Department of Computer Science and Engineering — Artificial Intelligence and Machine Learning

B.Tech CSE (AIML) — Batch 2024 to 2028

Mini Project | Semester II | Project ID: 196

---

Developed by Team 196 at GLA University