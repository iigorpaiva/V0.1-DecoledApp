#include <WiFi.h>
#include "aWOT.h"
#include "StaticFiles.h"

#define WIFI_SSID "ISAIAS"
#define WIFI_PASSWORD "09068888"
#define LED_BUILTIN 26

WiFiServer server(80);
Application app;
bool ledOn;

void readLed(Request &req, Response &res) {
  res.print(ledOn);
}

void updateLed(Request &req, Response &res) {
  ledOn = (req.read() != '0');
  digitalWrite(LED_BUILTIN, ledOn);
  return readLed(req, res);
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());

  app.get("/led", &readLed);

  app.route(staticFiles());
  app.put("/led", &updateLed);

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client.connected()) {
    app.process(&client);
  }
}
