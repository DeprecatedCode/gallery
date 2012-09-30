#!/bin/bash
cd /home/nate/software/nateferrero/gallery/venv
./bin/activate
sudo /home/nate/software/nateferrero/gallery/venv/bin/uwsgi --master --emperor /etc/uwsgi/apps-enabled --die-on-term --uid www-data --gid www-data --logto /var/log/uwsgi/emperor.log &;sudo chmod 777 /var/www/run/nateferrero.gallery.sock;sudo chown www-data:www-data /var/www/run/nateferrero.gallery.sock
