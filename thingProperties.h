#include <ArduinoIoTCloud.h>
#include <Arduino_ConnectionHandler.h>

// ── Fill these in ──────────────────────────────────
const char DEVICE_LOGIN_NAME[] = "CLOUD_ID";       // from Arduino IoT Cloud
const char SSID[]              = "WIFI_NAME";
const char PASS[]              = "WIFI_PASS";
const char DEVICE_KEY[]        = "CLOUD_PASSKEY";      // from Arduino IoT Cloud

// ── Cloud variables ────────────────────────────────
int   heartRate     = 0;
int   spo2Level     = 0;
float temperatureF  = 0.0;
float temperatureC  = 0.0;

void initProperties() {
  ArduinoCloud.setBoardId(DEVICE_LOGIN_NAME);
  ArduinoCloud.setSecretDeviceKey(DEVICE_KEY);

  ArduinoCloud.addProperty(heartRate,    READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(spo2Level,    READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(temperatureF, READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(temperatureC, READ, ON_CHANGE, NULL);
}

WiFiConnectionHandler ArduinoIoTPreferredConnection(SSID, PASS);
