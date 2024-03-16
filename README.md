projeyi çalıitırmak için 

git clone https://github.com/onurcet6734/SDAEsandMS.git

python -m venv env

.\env\Scripts\activate

pip install -r requirements.txt 

python manage.py makemigrations 

pythonm manage.py migrate 

python manage.py runserver 
