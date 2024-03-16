Projeyi klonlayıp çalıştırmadan önce Postgresql vs Python i bilgisayarlarınıza kurun

projeyi çalıitırmak için 

git clone https://github.com/onurcet6734/SDAEsandMS.git

cd SDAEsandMS
________________________________________
Windows ta 

pip install virtualenvwrapper-win

mkvirtualenv myenv veya .\env\Scripts\activate 

ide de environment aktif ederken hata alıyorsan, "Set-ExecutionPolicy RemoteSigned -Scope Process" komutu sonrası environment aktif edebilirsin
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
