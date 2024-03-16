projeyi çalıitırmak için 

git clone https://github.com/onurcet6734/SDAEsandMS.git
________________________________________
Windows ta 

pip install virtualenvwrapper-win

mkvirtualenv myenv veya .\env\Scripts\activate
_________________________________________
Mac te 

python -m venv env

source env/bin/activate
__________________________________________
pip install -r requirements.txt 

python manage.py makemigrations 

pythonm manage.py migrate 

python manage.py runserver 
