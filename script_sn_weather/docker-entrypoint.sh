#!/usr/bin/env bash

test=1
timeout=0
sleep 10

while :
do
    echo -n > /dev/tcp/$BACKEND_NODE_IP/$BACKEND_NODE_PORT
    test=$?
    sleep 5 && echo test result: $test
    timeout=$((timeout+1))
    
    if [ $test -eq 0 ]
    then
        npm start
        break
    fi
    if [ $timeout -ge 25 ]
    then
        break
    fi    

done
