#!/bin/sh

alias python=$(which python3)

echo Init venv
python -m venv 309project
. ./309project/bin/activate

echo Install update

alias python=$(which python3)
python -m pip install --upgrade pip

echo Install requirements
pip install django==4.1.2
pip install djangorestframework django-filter Pillow

echo Make migrations
cd ./PB
python manage.py makemigrations
python manage.py migrate --run-syncdb

