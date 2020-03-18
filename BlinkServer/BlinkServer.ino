#include <WiFi.h>
#include "aWOT.h"
#include "StaticFiles.h"

#define WIFI_SSID "Decoled"
#define WIFI_PASSWORD "@Decoled1963@"
#define LED_BLUE 26
#define LED_GREEN 27

WiFiServer server(80);
Application app;
bool ledOnB;
bool ledOnG;

void readLedB(Request &req, Response &res) {
  res.print(ledOnB);
}

void readLedG(Request &req, Response &res) {
  res.print(ledOnG);
}

void updateLedB(Request &req, Response &res) {
  ledOnB = (req.read() != '0');
  digitalWrite(LED_BLUE, ledOnB);
  return readLedB(req, res);
}

void updateLedG(Request &req, Response &res) {
  ledOnG = (req.read() != '0');
  digitalWrite(LED_GREEN, ledOnG);
  return readLedG(req, res);
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_BLUE, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());

  app.get("/ledB", &readLedB);
  app.get("/ledG", &readLedG);


  app.route(staticFiles());
  
  app.put("/ledB", &updateLedB);
  app.put("/ledG", &updateLedG);

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client.connected()) {
    app.process(&client);
  }
}
