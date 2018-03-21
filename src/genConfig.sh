#!/bin/bash

if [[ $# != 4 ]]; then
    echo "Usage: ./genConfig.sh <secret> <dbName> <serverPort> <user>"
    echo "ex: ./genConfig.sh secret yourquiz 3000 steven"
    exit 1
fi

SERVER_FILE=server/config/config.js
CLIENT_FILE=client/js/config.js

echo "module.exports = {" > $SERVER_FILE
echo "    'secret': '$1'," >> $SERVER_FILE
echo "    'dbUrl': 'mongodb://localhost/$2'," >> $SERVER_FILE
echo "    'serverPort': $3" >> $SERVER_FILE
echo "}" >> $SERVER_FILE

echo "const SERVER_IP = '$4.eracnos.ch';" > $CLIENT_FILE