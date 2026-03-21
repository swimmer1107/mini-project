# 🌾 AI-Driven Smart Agriculture & Crop Intelligence System

## 📌 Project Description

The AI-Driven Smart Agriculture & Crop Intelligence System is a web-based application designed to help farmers make better crop decisions using Machine Learning and real-time weather data.

The system takes environmental parameters such as temperature, humidity, rainfall, soil type, and pH value as input and predicts the most suitable crop to grow. It also provides weather information, prediction history, and user authentication for a personalized experience.

This project aims to improve agricultural productivity by providing intelligent recommendations based on data analysis.


---

## 🎯 Problem Statement

Farmers often face difficulty in selecting the right crop due to changing weather conditions and lack of proper data analysis tools.

This system solves the problem by:
- Predicting best crop using Machine Learning
- Providing real-time weather information
- Storing previous predictions
- Giving intelligent suggestions


---

## 🚀 Features

- User Authentication (Login / Signup)
- Crop Prediction using Machine Learning
- Weather Data Fetching using API
- Prediction History Storage
- SQLite Database Integration
- Advice / Recommendation System
- Responsive UI with Theme Toggle
- Modular Flask Architecture


---

## 🧠 Technologies Used

- Python
- Flask
- SQLite
- HTML
- CSS
- JavaScript
- Scikit-learn
- NumPy
- Joblib
- Weather API


---

## 🏗 Project Structure


project/
│
├── app.py
├── config.py
├── requirements.txt
│
├── blueprints/
├── services/
├── models/
├── static/
├── templates/
│
├── README.md


This structure follows modular architecture for better scalability.


---

## ⚙️ How to Run the Project

1. Clone the repository


git clone <repo-link>


2. Install dependencies


pip install -r requirements.txt


3. Run the application


python app.py


4. Open browser


http://127.0.0.1:5000



---

## 📊 Machine Learning Model

The system uses a trained Machine Learning model to predict the best crop based on environmental conditions.

Input parameters:
- Temperature
- Humidity
- Rainfall
- Soil type
- pH value

Output:
- Recommended crop
- Advice


---

## 🌦 Weather Integration

The system fetches real-time weather data using an external API based on user location.

This helps in making better crop predictions.


---

## 🗄 Database

SQLite database is used to store:

- User accounts
- Prediction history
- Crop results
- Weather data


---

## 🔐 Security Features

- User login authentication
- Session management
- Environment variables (.env)
- Input validation


---

## 👨‍💻 Team Members

- Gauri Singh
- Pulkit Kulshreshtha
- Akshara Mishra


---

## 📌 Future Improvements

- Add fertilizer recommendation
- Add soil sensor integration
- Add mobile app version
- Improve ML accuracy
- Add admin dashboard


---

## ✅ Conclusion

This project demonstrates how Artificial Intelligence and Web Development can be combined to build a smart agriculture system that helps farmers make better decisions and improve crop productivity.