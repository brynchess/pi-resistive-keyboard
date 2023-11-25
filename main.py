#to run headless on devrpi
#DISPLAY=":0" .venv/bin/python3 main.py
import requests
import webbrowser
import argparse
from external_apps.utils import apps_manager

SETTINGS_URL = "http://localhost:8000/settings/"
BASE_URL = "http://localhost:8000/"

parser = argparse.ArgumentParser(description="Installation script")
parser.add_argument("--install", action="store_true", help="Adding app in OA external apps")
args = parser.parse_args()

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
    if args.install:
        webbrowser.open(BASE_URL)
        apps_manager.install_this_app()

if __name__ == "__main__" and app_is_down():
     configure()