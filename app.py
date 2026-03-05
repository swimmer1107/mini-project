from flask import Flask, render_template, request, jsonify
import numpy as np
import joblib
import time

app = Flask(__name__)

model = joblib.load("crop_model.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    N = float(data["N"])
    P = float(data["P"])
    K = float(data["K"])
    temperature = float(data["temperature"])
    humidity = float(data["humidity"])
    ph = float(data["ph"])
    rainfall = float(data["rainfall"])

    features = np.array([[N,P,K,temperature,humidity,ph,rainfall]])

    prediction = model.predict(features)[0]

    # simulate processing time
    time.sleep(2)

    return jsonify({
        "crop": prediction,
        "yield": [10,30,50,90]
    })

if __name__ == "__main__":
    app.run(debug=True)