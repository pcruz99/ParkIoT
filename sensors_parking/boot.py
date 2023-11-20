# boot.py -- run on boot-up
# This file is executed on every boot (including wake-boot from deepsleep)
#import os
#os.dupterm(None, 1) # disable REPL on UART(0)

#import webrepl
#webrepl.start()

# import esp
# esp.osdebug(None)
import gc
import time
import network
import ubinascii
import machine
from umqttsimple import MQTTClient
from hcsr04 import HCSR04

sensor = HCSR04(trigger_pin=12, echo_pin=14, echo_timeout_us=10000)

led_board = machine.Pin(2, machine.Pin.OUT, pull=None)
buzzer = machine.Pin(15, machine.Pin.OUT, pull=None)
tira_led = machine.Pin(13, machine.Pin.OUT, pull=None)

gc.collect()

SENSOR_NUM = 1

ssid = 'crnet'
password = 'MiPerroDulce99'

def do_connect():
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(ssid, password)
        while not sta_if.isconnected():
            pass
    print('network config:', sta_if.ifconfig())

mqtt_server = '192.168.1.10'
client_id = ubinascii.hexlify(machine.unique_id())
topic_pub = 'parking/sensor/{}'.format(SENSOR_NUM)

def restart_and_reconnect():
  print('Failed to connect to MQTT broker. Reconnecting...')
  time.sleep(10)
  machine.reset()

def connect_mqtt():
  client = MQTTClient(client_id, mqtt_server)
  client.connect()
  return client

do_connect()

try:
    client = connect_mqtt()
except:
    restart_and_reconnect()