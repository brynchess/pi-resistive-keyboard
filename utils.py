from ina_integration.utils import ina
from keyboard.utils import keyboard
from settings.utils import config

def reload_configs():
    ina.import_options()
    keyboard.import_config()
    config.import_config()