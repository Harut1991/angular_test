#!/bin/bash
cd /var/www/kodeist/public_html/
git pull https://stdevteam:987%23321bHH@github.com/stdevteam/kodeist.git
npm install
ng build --prod
sudo /etc/init.d/nginx restart

