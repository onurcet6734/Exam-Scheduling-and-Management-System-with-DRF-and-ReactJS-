Projeyi klonlayıp çalıştırmadan önce Postgresql vs Python i bilgisayarlarınıza kurun

projeyi çalıitırmak için 

git clone https://github.com/onurcet6734/SDAEsandMS.git

cd SDAEsandMS
________________________________________
Windows ta 

pip install virtualenvwrapper-win

mkvirtualenv myenv veya .\env\Scripts\activate 
_________________________________________
Mac te 

python -m venv env

source env/bin/activate
__________________________________________
cd esandms

pip install -r requirements.txt 

python manage.py makemigrations 

python manage.py migrate 

python manage.py runserver 
