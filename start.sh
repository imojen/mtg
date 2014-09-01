cpt=`pgrep nodejs | wc -l`
if [ "$cpt" -lt 1 ]; then
    nohup nodejs /home/pi/gitRepo/mtg/server.js &
else
    exit 0
fi