import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

def generate_mock_data():
    print("Generating synthetic Crop_recommendation.csv for demonstration...")
    np.random.seed(42)
    n_samples = 1000
    crops = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango', 'grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 'coconut', 'cotton', 'jute', 'coffee']
    
    data = {
        'N': np.random.randint(0, 140, n_samples),
        'P': np.random.randint(5, 145, n_samples),
        'K': np.random.randint(5, 205, n_samples),
        'temperature': np.random.uniform(8.0, 43.0, n_samples),
        'humidity': np.random.uniform(14.0, 100.0, n_samples),
        'ph': np.random.uniform(3.5, 9.9, n_samples),
        'rainfall': np.random.uniform(20.0, 300.0, n_samples),
        'label': np.random.choice(crops, n_samples)
    }
    df = pd.DataFrame(data)
    df.to_csv('Crop_recommendation.csv', index=False)
    return df

def train():
    file_path = 'Crop_recommendation.csv'
    if not os.path.exists(file_path):
        df = generate_mock_data()
    else:
        df = pd.read_csv(file_path)

    X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
    y = df['label']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training Decision Tree...")
    dt_model = DecisionTreeClassifier(random_state=42)
    dt_model.fit(X_train, y_train)
    dt_preds = dt_model.predict(X_test)
    print(f"Decision Tree Accuracy: {accuracy_score(y_test, dt_preds):.4f}")

    print("Training Random Forest...")
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    rf_preds = rf_model.predict(X_test)
    print(f"Random Forest Accuracy: {accuracy_score(y_test, rf_preds):.4f}")

    # Save best model
    os.makedirs('models', exist_ok=True)
    joblib.dump(rf_model, 'models/crop_model.pkl')
    print("Best model (Random Forest) saved to models/crop_model.pkl")

if __name__ == '__main__':
    train()
