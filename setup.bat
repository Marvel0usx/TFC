:: Create virtual environment with Django 4.1.2

@echo off
echo Setup virtual environment...
pip install update
python -m venv 309project
call .\309project\Scripts\activate.bat
echo Install Django...
pip install django==4.1.2 djangorestframework Pillow django-filter djangorestframework-simplejwt
pip install django-cors-headers
cd .\PB
echo Make migrations
python manage.py makemigrations
python manage.py migrate --run-syncdb

cd ..
cd .\PF
cd .\pf
npm install react-router-dom
npm install materialize-css@next 
npm run build

pause
