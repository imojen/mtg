#!/bin/bash
#!/usr/local/bin/node

#cpt=`pgrep node | wc -l`
#if [ "$cpt" -lt 1 ]; then
    nohup /usr/local/bin/node /home/pi/gitRepo/mtg/server.js &
    exit 0
#else
#    exit 0
#fi
#exit 0
