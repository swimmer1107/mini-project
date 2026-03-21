from flask import Blueprint, render_template, request, flash, redirect, url_for, session
from flask_login import login_required, current_user
from services.ml_service import predict_crop
from services.weather_service import get_weather
from services.advice_service import get_advice
from models.db_models import db, Prediction
import traceback

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('main.dashboard'))
    return redirect(url_for('auth.login'))

@main_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@main_bp.route('/predict', methods=['GET', 'POST'])
@login_required
def predict():
    if request.method == 'POST':
        try:
            n = float(request.form.get('n', 0))
            p = float(request.form.get('p', 0))
            k = float(request.form.get('k', 0))
            temp = float(request.form.get('temperature', 0))
            humidity = float(request.form.get('humidity', 0))
            ph = float(request.form.get('ph', 0))
            rain = float(request.form.get('rainfall', 0))
            soil = request.form.get('soil_type', 'Loamy')

            # Validation
            if not (0 <= n <= 140 and 5 <= p <= 145 and 5 <= k <= 205):
                flash('NPK values out of physical bounds.', 'error')
                return redirect(url_for('main.predict'))
            if not (8 <= temp <= 43 and 14 <= humidity <= 100):
                flash('Temperature or humidity out of bounds.', 'error')
                return redirect(url_for('main.predict'))
            if not (3.5 <= ph <= 9.9 and 20 <= rain <= 300):
                flash('pH or rainfall out of bounds.', 'error')
                return redirect(url_for('main.predict'))

            # Predict
            features = [n, p, k, temp, humidity, ph, rain]
            predicted_crop = predict_crop(features)
            
            if predicted_crop:
                # Save to history
                record = Prediction(
                    user_id=current_user.id, n=n, p=p, k=k,
                    temperature=temp, humidity=humidity, ph=ph,
                    rainfall=rain, soil_type=soil, predicted_crop=predicted_crop
                )
                db.session.add(record)
                db.session.commit()
                
                advice = get_advice(predicted_crop, n, p, k)
                
                return render_template('predict.html', 
                                     result=predicted_crop, 
                                     advice=advice,
                                     yield_text=f"Expected Yield: High potential for {predicted_crop.capitalize()}")
            else:
                flash("Model not trained yet. Run train_model.py first.", "error")
        except Exception as e:
            traceback.print_exc()
            flash("Error processing inputs.", "error")
            
    return render_template('predict.html')

@main_bp.route('/weather', methods=['GET', 'POST'])
@login_required
def weather():
    city = 'Mathura'
    weather_data = None
    if request.method == 'POST':
        city_input = request.form.get('city')
        if city_input:
            city = city_input
            
    try:
        weather_data = get_weather(city)
        if not weather_data:
            flash(f"Could not fetch weather for {city}. Is your API Key valid?", "error")
    except Exception as e:
        flash("External API Error. Please check your connectivity or API key.", "error")
        
    return render_template('weather.html', weather=weather_data, city=city)

@main_bp.route('/profile')
@login_required
def profile():
    pred_count = Prediction.query.filter_by(user_id=current_user.id).count()
    return render_template('profile.html', user=current_user, total_predictions=pred_count)
