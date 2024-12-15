#!/usr/bin/env bash

test=1
timeout=0

while [ $test -eq 1 ] && [ $timeout -lt 25 ]
do
    echo -n > /dev/tcp/${POSTGRESDB_IP}/${DB_PORT}
    test=$?
    sleep 5 && echo test result: $test
    timeout=$((timeout+1))
done

export DATABASE_URL=postgres://$POSTGRESDB_USER:$POSTGRESDB_ROOT_PASSWORD@$POSTGRESDB_IP:$POSTGRESDB_PORT/$POSTGRESDB_DATABASE
./node_modules/.bin/node-pg-migrate up
exec "$@"