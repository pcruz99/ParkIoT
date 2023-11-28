# main.py -- put your code here!
last_message = 0
message_interval = 2

flag = True
MIN_DISTANCE = 200

while True:
    try:
        if (time.time() - last_message) > message_interval:
            distance = sensor.distance_cm()
            msg = '{'+'\"C_ID\":'+'\"' + \
                str(client_id)[2:10]+'\"'+',\"distance\":'+str(distance)+'}'
            client.publish(topic_pub, msg, qos=1)
            last_message = time.time()
        if distance < MIN_DISTANCE and flag:
            buzzer.on()
            led_indicator.on()
            time.sleep(1)
            buzzer.off()
            led_indicator.off()
            flag = False
        elif distance > MIN_DISTANCE:
            flag = True
        time.sleep_ms(3)
    except OSError as e:
        restart_and_reconnect()
