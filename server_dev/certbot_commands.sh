#!/bin/bash

# Suivre ce guide pour installer certbot : https://memo-linux.com/installer-certbot-sous-debian/

certbot certonly --standalone -d matthieu.eracnos.ch --rsa-key-size 4096
certbot certonly --standalone -d mayron.eracnos.ch --rsa-key-size 4096
certbot certonly --standalone -d nathanael.eracnos.ch --rsa-key-size 4096
certbot certonly --standalone -d nicolas.eracnos.ch --rsa-key-size 4096
certbot certonly --standalone -d raed.eracnos.ch --rsa-key-size 4096
certbot certonly --standalone -d steven.eracnos.ch --rsa-key-size 4096
