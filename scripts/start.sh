#!/bin/bash
cd /home/ubuntu/pictureStory/server
authbind --deep pm2 -f start app.js