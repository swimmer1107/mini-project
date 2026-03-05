import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

# ===============================
# 1. Load Dataset
# ===============================

df = pd.read_csv("dataset/Crop_recommendation.csv")

print("Dataset Shape:", df.shape)
print(df.head())

# ===============================
# 2. Data Visualization
# ===============================

# Crop distribution
plt.figure(figsize=(12,6))
sns.countplot(x="label", data=df)
plt.xticks(rotation=90)
plt.title("Crop Distribution")
plt.show()

# Correlation heatmap
plt.figure(figsize=(10,8))
sns.heatmap(df.corr(), annot=True, cmap="YlGnBu")
plt.title("Feature Correlation Heatmap")
plt.show()

# Nitrogen distribution
plt.figure(figsize=(8,5))
sns.histplot(df["N"], kde=True)
plt.title("Nitrogen Distribution")
plt.show()

# Rainfall vs crop
plt.figure(figsize=(12,6))
sns.boxplot(x="label", y="rainfall", data=df)
plt.xticks(rotation=90)
plt.title("Rainfall vs Crop")
plt.show()

# ===============================
# 3. Prepare Data
# ===============================

X = df.drop("label", axis=1)
y = df["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ===============================
# 4. Train Multiple Models
# ===============================

dt_model = DecisionTreeClassifier()
rf_model = RandomForestClassifier()
svm_model = SVC()

dt_model.fit(X_train, y_train)
rf_model.fit(X_train, y_train)
svm_model.fit(X_train, y_train)

# ===============================
# 5. Model Prediction
# ===============================

dt_pred = dt_model.predict(X_test)
rf_pred = rf_model.predict(X_test)
svm_pred = svm_model.predict(X_test)

print("\nModel Comparison:")

print("Decision Tree Accuracy:", accuracy_score(y_test, dt_pred))
print("Random Forest Accuracy:", accuracy_score(y_test, rf_pred))
print("SVM Accuracy:", accuracy_score(y_test, svm_pred))

# ===============================
# 6. Feature Importance
# ===============================

importance = rf_model.feature_importances_
features = X.columns

feature_importance = pd.Series(importance, index=features)

plt.figure(figsize=(8,5))
feature_importance.sort_values().plot(kind="barh")
plt.title("Feature Importance")
plt.show()

# ===============================
# 7. Save Best Model
# ===============================

joblib.dump(rf_model, "crop_model.pkl")

print("\nModel saved as crop_model.pkl")

# ===============================
# 8. Test Prediction
# ===============================

sample_input = [[90,42,43,20.8,82,6.5,202.9]]

prediction = rf_model.predict(sample_input)

print("\nSample Prediction:", prediction[0])