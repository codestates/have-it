#!/bin/bash
cd /home/ubuntu/have-it/server
authbind --deep pm2 start app.js
