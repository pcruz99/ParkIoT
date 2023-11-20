# main.py -- put your code here!
last_message = 0
message_interval = 5

flag = True
MIN_DISTANCE = 200

buzzer.on()
time.sleep(0.3)
buzzer.off()
time.sleep(0.1)
buzzer.on()
time.sleep(0.3)
buzzer.off()
led_board.on()
time.sleep(1)
led_board.off()
time.sleep(1)
led_board.on()
time.sleep(1)
led_board.off()
time.sleep(1)

try:
    while True:
      # client.check_msg()
      if (time.time() - last_message) > message_interval:
        distance = sensor.distance_cm()                
        msg = '{'+'\"C_ID\":'+'\"'+str(client_id)[2:10]+'\"'+',\"distance\":'+str(distance)+'}'
        client.publish(topic_pub, msg)
        last_message = time.time()

      if distance < MIN_DISTANCE and flag:
        buzzer.on()
        tira_led.on()
        time.sleep(1)
        buzzer.off()        
        tira_led.off()        
        flag = False
      elif distance > MIN_DISTANCE:
        flag = True
      
           
except OSError as e:
    restart_and_reconnect()