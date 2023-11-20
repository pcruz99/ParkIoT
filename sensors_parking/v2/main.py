# main.py -- put your code here!
last_message = 0
message_interval = 5

flag = True
MIN_DISTANCE = 200

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
        external_led.on()
        time.sleep(1)
        buzzer.off()        
        external_led.off()        
        flag = False
      elif distance > MIN_DISTANCE:
        flag = True
                         
except OSError as e:
    restart_and_reconnect()