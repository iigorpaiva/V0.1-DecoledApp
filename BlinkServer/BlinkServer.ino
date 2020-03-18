#include <WiFi.h>
#include "aWOT.h"
#include "StaticFiles.h"

#define WIFI_SSID "ISAIAS"
#define WIFI_PASSWORD "09068888"

#define LED_1 26
#define LED_2 27

#define LED_3 25
#define LED_4 33

WiFiServer server(80);
Application app;
bool ledon1;
bool ledon2;

bool ledon3;
bool ledon4;

void readLed1(Request &req, Response &res) {
  res.print(ledon1);
}

void readLed2(Request &req, Response &res) {
  res.print(ledon2);
}

void readLed3(Request &req, Response &res) {
  res.print(ledon3);
}

void readLed4(Request &req, Response &res) {
  res.print(ledon4);
}

void updateLed1(Request &req, Response &res) {
  ledon1 = (req.read() != '0');
  digitalWrite(LED_1, ledon1);
  return readLed1(req, res);
}

void updateLed2(Request &req, Response &res) {
  ledon2 = (req.read() != '0');
  digitalWrite(LED_2, ledon2);
  return readLed2(req, res);
}

void updateLed3(Request &req, Response &res) {
  ledon3 = (req.read() != '0');
  digitalWrite(LED_3, ledon3);
  return readLed3(req, res);
}

void updateLed4(Request &req, Response &res) {
  ledon4 = (req.read() != '0');
  digitalWrite(LED_4, ledon4);
  return readLed4(req, res);
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_1, OUTPUT);
  pinMode(LED_2, OUTPUT);
  pinMode(LED_3, OUTPUT);
  pinMode(LED_4, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());

  app.get("/led1", &readLed1);
  app.get("/led2", &readLed2);

  app.get("/led3", &readLed3);
  app.get("/led4", &readLed4);


  app.route(staticFiles());
  
  app.put("/led1", &updateLed1);
  app.put("/led2", &updateLed2);

  app.put("/led3", &updateLed3);
  app.put("/led4", &updateLed4);

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client.connected()) {
    app.process(&client);
  }
}
