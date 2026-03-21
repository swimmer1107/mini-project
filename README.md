# Smart Agriculture System

An AI-powered Crop Recommendation & Intelligence System for farmers, beautifully designed with a futuristic dark-mode UI.

## Features
- **Machine Learning Crop Recommendation**: Random Forest classifier recommending the best crop based on NPK, Temperature, Humidity, pH, and Rainfall.
- **Weather Integration**: Live weather parameters powered by OpenWeatherMap API for context.
- **Modern UI**: Fully responsive Tailwind CSS design crafted like a premium Dribbble mockup. Deep navy and highly vibrant green accents.
- **Dashboard & History**: User authentication, dynamic dashboard, and prediction record history to track farm activity.
- **Rule-based Fertilization Advice**: Immediate context-aware recommendations on what fertilizer to apply post-prediction.

## Requirements
- Python 3.10+
- Dependencies in `requirements.txt`

## How to Run

1. **Create Virtual Environment**:
   ```bash
   python -m venv venv
   # run `venv\Scripts\activate` on Windows
   # run `source venv/bin/activate` on Mac/Linux
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Train the Model**:
   ```bash
   python train_model.py
   ```
   *(This will generate synthetic data if `Crop_recommendation.csv` does not exist, and save the model to `models/crop_model.pkl`)*

4. **Environment Variables**:
   Copy `.env.example` to `.env` and fill out your `OPENWEATHER_API_KEY`. If left as `mock-key-for-now`, weather returns mocked data.

5. **Run the Server**:
   ```bash
   flask run
   ```

6. **View Application**:
   Open `http://127.0.0.1:5000` in your web browser.

## Built for presentation!
The UI is perfectly laid out for a stunning demo matching the 6-screen UI collage.
