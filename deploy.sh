#!/bin/bash
cd /var/www/subdomains/codebnb/kodeist/front-end/public_html
git pull https://stdevteam:987%23321bHH@github.com/stdevteam/kodeist.git
npm install
ng build --prod
sudo /etc/init.d/nginx restart
