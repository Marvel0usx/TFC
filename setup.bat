:: Create virtual environment with Django 4.1.2

@echo off
echo Setup virtual environment...
pip install update
python -m venv 309project
call .\309project\Scripts\activate.bat
echo Install Django...
pip install django==4.1.2 djangorestframework Pillow django-filter djangorestframework-simplejwt
pip install django-cors-headers
<<<<<<< HEAD
<<<<<<< HEAD

cd PB

=======
cd PB
>>>>>>> 9d30f77 (added classescontext.js context)
=======
cd PB
=======

cd PB

>>>>>>> 376c3ab (signup)
>>>>>>> bfff3e5 (signup)
echo Make migrations
python manage.py makemigrations
python manage.py migrate --run-syncdb

pause
