#!/bin/bash

# Enter venv
. ./309project/bin/activate

# Run server
cd ./PB
python manage.py runserver &

cd ../PF/pf
npm start &


