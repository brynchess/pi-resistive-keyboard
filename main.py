#to run headless on devrpi
#DISPLAY=":0" .venv/bin/python3 main.py
import requests
import webbrowser

SETTINGS_URL = "http://localhost:8000/settings/"
BASE_URL = "http://localhost:8000/"

def app_is_down():
    try:
        response = requests.get(SETTINGS_URL)
        if response.status_code == 200:
            print("ERROR: App is already running, opening config page")
            webbrowser.open(BASE_URL)
            return False
    except requests.exceptions.RequestException as e:
            print("INFO: Running the app...")
            return True

def configure():
    import uvicorn
    from ina_integration.utils import ina
    uvicorn.run("fastapiconfig:endpointsApp", host="0.0.0.0", port=8000, log_level="info", reload=False)

if __name__ == "__main__" and app_is_down():
     configure()