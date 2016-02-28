#!/bin/bash
cd ~/github/sensors-client/
forever stop sensors-client.js
forever start -l /home/suslik/log/sensors/out-client -p /home/suslik -a -d sensors-client.js prod