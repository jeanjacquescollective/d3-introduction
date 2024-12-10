import time
import random
import paho.mqtt.client as mqtt

# MQTT broker details
BROKER = 'broker.hivemq.com'
PORT = 1883
TOPICS = {
    'temperature': 'channel/temperature',
    'humidity': 'channel/humidity',
    'pressure': 'channel/pressure',
}
PUBLISH_INTERVAL = 1  # Interval in seconden tussen publicaties

# Maak een nieuwe MQTT-client
client = mqtt.Client()

def connect_to_broker():
    """
    Verbindt met de opgegeven MQTT-broker.
    """
    try:
        client.connect(BROKER, PORT)
        print(f"Verbonden met broker op {BROKER}:{PORT}")
    except Exception as e:
        print(f"Kan niet verbinden met broker: {e}")
        exit(1)

def publish_data():
    """
    Publiceert random gegenereerde temperatuur-, luchtvochtigheid- en luchtdrukwaarden 
    naar de opgegeven MQTT-topics.
    """
    try:
        while True:
            # Genereer willekeurige waarden
            temperature = round(random.uniform(20.0, 30.0), 2)
            humidity = round(random.uniform(30.0, 60.0), 2)
            pressure = round(random.uniform(1000.0, 1020.0), 2)

            # Publiceer gegevens naar de respectieve topics
            client.publish(TOPICS['temperature'], temperature)
            client.publish(TOPICS['humidity'], humidity)
            client.publish(TOPICS['pressure'], pressure)

            # Logging in de console
            print(f"Published: {temperature}°C to {TOPICS['temperature']}")
            print(f"Published: {humidity}% to {TOPICS['humidity']}")
            print(f"Published: {pressure} hPa to {TOPICS['pressure']}")


            # Genereer gegevens voor drie categorieën om te vergelijken
            category_a = round(random.uniform(0.0, 100.0), 2)
            category_b = round(random.uniform(0.0, 100.0), 2)
            category_c = round(random.uniform(0.0, 100.0), 2)
            comparative_categories = {'A': category_a, 'B': category_b, 'C': category_c}
            client.publish('channel/comparative_categories', str(comparative_categories))
            print(f"Published: {comparative_categories} to channel/comparative_categories")

            # Genereer geografische gegevens
            latitude = round(random.uniform(-90.0, 90.0), 6)
            longitude = round(random.uniform(-180.0, 180.0), 6)
            geographic_data = {'latitude': latitude, 'longitude': longitude}
            client.publish('channel/geographic', str(geographic_data))
            print(f"Published: {geographic_data} to channel/geographic")

            # Genereer proportionele gegevens (marktaandeel)
            market_share = round(random.uniform(0.0, 100.0), 2)
            client.publish('channel/market_share', market_share)
            print(f"Published: {market_share}% to channel/market_share")

            # Genereer gegevens voor een scatter plot
            scatter_x = round(random.uniform(0.0, 100.0), 2)
            scatter_y = round(random.uniform(0.0, 100.0), 2)
            scatter_data = {'x': scatter_x, 'y': scatter_y}
            client.publish('channel/scatter', str(scatter_data))
            print(f"Published: {scatter_data} to channel/scatter")

            # Genereer gegevens voor een watervaldiagram
            waterfall_value = round(random.uniform(-50.0, 50.0), 2)
            client.publish('channel/waterfall', waterfall_value)
            print(f"Published: {waterfall_value} to channel/waterfall")

            # Genereer netwerkverkeer gegevens voor een stroomdiagram
            network_traffic = round(random.uniform(0.0, 1000.0), 2)
            client.publish('channel/network_traffic', network_traffic)
            print(f"Published: {network_traffic} to channel/network_traffic")

            # Genereer gegevens voor een heatmap (10x10 gegevens)
            heatmap_data = [[round(random.uniform(0.0, 100.0), 2) for _ in range(10)] for _ in range(10)]
            client.publish('channel/heatmap', str(heatmap_data))
            print(f"Published: {heatmap_data} to channel/heatmap")

            # Genereer gegevens voor een stacked area chart
            stacked_area_value = round(random.uniform(0.0, 100.0), 2)
            client.publish('channel/stacked_area', stacked_area_value)
            print(f"Published: {stacked_area_value} to channel/stacked_area")

            # Wacht voor het volgende bericht
            time.sleep(PUBLISH_INTERVAL)
    except KeyboardInterrupt:
        print("\nPublicatie gestopt door gebruiker.")
    finally:
        client.disconnect()
        print("MQTT-client losgekoppeld.")

if __name__ == '__main__':
    # Verbinden met de broker en publicatie starten
    connect_to_broker()
    publish_data()
