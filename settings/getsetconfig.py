import configparser

class Config:
    config = configparser.ConfigParser()
    options = {}
    CONFIG_URL = "./config.ini"

    def __init__(self) -> None:
        self.init_options()
        pass

    def init_options(self):
        self.config.read(self.CONFIG_URL)
        options = self.config.options('options')
        for option in options:
            self.options[option] = self.config.get('options', option)
        return options
    
    def get_options(self):
        return self.options