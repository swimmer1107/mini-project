#include <WiFiS3.h>
#include <DHT.h>

// ---- CONFIG ----
const char* ssid     = "Flanker_30mki";
const char* password = "Swimmer1107";
String apiKey        = "KHAHZUVL92CL2ASJ";

// ---- PINS ----
#define DHTPIN 2
#define DHTTYPE DHT11
#define SOIL_PIN A0
#define TDS_PIN A1   // ✅ TDS sensor on A1

DHT dht(DHTPIN, DHTTYPE);
WiFiClient client;

void setup() {
  Serial.begin(9600);
  delay(1000);
  dht.begin();
  
  Serial.println("=== SmartAgri Starting ===");
  Serial.print("Connecting to: ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    attempts++;
    if (attempts > 40) {
      Serial.println("\n❌ Cannot connect! Retrying...");
      attempts = 0;
      WiFi.begin(ssid, password);
    }
  }
  Serial.println("\n✅ WiFi Connected!");
  Serial.println(WiFi.localIP());
}

void loop() {
  float temp     = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Soil Moisture
  int soilRaw  = analogRead(SOIL_PIN);
  int soilPct  = map(soilRaw, 1023, 0, 0, 100);

  // TDS Sensor
  int tdsRaw   = analogRead(TDS_PIN);
  float voltage = tdsRaw * (5.0 / 1023.0);
  float tdsValue = (133.42 * voltage * voltage * voltage
                  - 255.86 * voltage * voltage
                  + 857.39 * voltage) * 0.5;

  if (isnan(temp) || isnan(humidity)) {
    Serial.println("❌ DHT11 read failed!");
    delay(5000);
    return;
  }

  Serial.print("Temp: ");     Serial.print(temp);
  Serial.print(" | Humidity: "); Serial.print(humidity);
  Serial.print(" | Soil: ");  Serial.print(soilPct);
  Serial.print(" | TDS: ");   Serial.println(tdsValue);

  // ---- Send to ThingSpeak ----
  client.stop();

  if (client.connect("api.thingspeak.com", 80)) {
    String postData = "api_key=" + apiKey +
                      "&field1=" + String(temp) +
                      "&field2=" + String(humidity) +
                      "&field3=" + String(soilPct) +
                      "&field4=" + String(tdsValue); // ✅ TDS as field4

    client.print("POST /update HTTP/1.1\r\n");
    client.print("Host: api.thingspeak.com\r\n");
    client.print("Connection: close\r\n");
    client.print("Content-Type: application/x-www-form-urlencoded\r\n");
    client.print("Content-Length: ");
    client.print(postData.length());
    client.print("\r\n\r\n");
    client.print(postData);

    delay(2000);
    String response = "";
    while (client.available()) {
      char c = client.read();
      response += c;
    }
    client.stop();

    int lastNewline = response.lastIndexOf('\n');
    String entryNum = "";
    if (lastNewline >= 0) {
      entryNum = response.substring(lastNewline + 1);
      entryNum.trim();
    }

    if (entryNum.toInt() > 0) {
      Serial.println("✅ ThingSpeak Entry #" + entryNum);
    } else {
      Serial.println("✅ Data sent!");
    }

  } else {
    Serial.println("❌ ThingSpeak connection failed");
  }

  delay(5000);
}
