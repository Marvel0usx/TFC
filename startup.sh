#!/bin/sh

alias python=$(which python3)

echo Init venv
python -m venv 309project
. ./309project/bin/activate

echo Install update

alias python=$(which python3)
python -m pip install --upgrade pip

echo Install requirements
pip install django==4.1.2 djangorestframework Pillow django-filter djangorestframework-simplejwt django-cors-headers

cd PB

echo Make migrations
python manage.py makemigrations
python manage.py migrate --run-syncdb

cd ..

cd ./PF/pf

echo Install frontend requirements
npm install react-router-dom
npm install materialize-css@next 
npm run build