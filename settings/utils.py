from .config_manager import ConfigManager

config = ConfigManager()

def get_config():
    config.import_config()
    return config