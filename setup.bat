:: Create virtual environment with Django 4.1.2

@echo off
echo Setup virtual environment...
pip install update
python -m venv 309project
call .\309project\Scripts\activate.bat
echo Install Django...
pip install django==4.1.2
pause