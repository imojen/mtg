cpt=`pgrep node | wc -l`
if [ "$cpt" -lt 1 ]; then
    nohup node /home/pi/gitRepo/mtg/server.js &
else
    exit 0
fi
