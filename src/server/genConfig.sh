#!/bin/bash

if [[ $# != 3 ]]; then
    echo "Usage: ./genConfig.sh <secret> <dbName> <serverPort>"
    echo "ex: ./genConfig.sh secret yourquiz 3000"
    exit 1
fi

FILE=config/config.js

# touch config/config2.js
echo "module.exports = {" > $FILE
echo "    'secret': '$1'," >> $FILE
echo "    'dbUrl': 'mongodb://localhost/$2'," >> $FILE
echo "    'serverPort': $3" >> $FILE
echo "}" >> $FILE
