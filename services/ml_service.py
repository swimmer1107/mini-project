import joblib
import os
import numpy as np

def predict_crop(features):
    model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'models', 'crop_model.pkl')
    if not os.path.exists(model_path):
        return None
    
    model = joblib.load(model_path)
    # features: [n, p, k, temp, humidity, ph, rain]
    data = np.array([features])
    prediction = model.predict(data)
    return prediction[0]
