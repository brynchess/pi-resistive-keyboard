import configparser

class ConfigManager:
    CONFIG_URL = "./config.ini"

    def __init__(self) -> None:
        self.config = configparser.ConfigParser()
        self.working_config = configparser.ConfigParser()
        self.import_config()
        pass

    def import_config(self):
        self.config.read(self.CONFIG_URL)
        if self.config.has_section("options"):
            self.options = dict(self.config.items("options"))
        if self.config.has_section("buttons"):
            self.buttons = dict(self.config.items("buttons"))
    
    def get_options(self):
        return self.options
    
    def set_option(self, option_name, value):
        self.options[option_name] = value

    def add_section_to_config(self, section_name, elements):
        self.config.add_section(section_name)
        for key, value in elements.items():
            self.config.set(section_name, key, str(value))

    def save_config(self):
        self.add_section_to_config('options', self.options)
        self.add_section_to_config('buttons', self.buttons)
        with open(self.CONFIG_URL, 'w') as config_file:
            self.working_config.write(config_file)
