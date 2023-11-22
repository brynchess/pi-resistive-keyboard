import configparser
import os

class ConfigManager:
    CONFIG_URL = "./config.ini"
    EXAMPLE_CONFIG_URL = "./default_cfgs/example_config.ini"

    def __init__(self) -> None:
        self.working_config = configparser.ConfigParser()
        self.buttons = []
        self.options = {}
        self.buttons_dict = {}
        self.import_config()
        pass

    def import_config(self):
        self.config = configparser.ConfigParser()
        if os.path.exists(self.CONFIG_URL):
            self.config.read(self.CONFIG_URL)
        else:
            self.config.read(self.EXAMPLE_CONFIG_URL)
            example_config = True
        self.functions = {}
        if self.config.has_section("options"):
            self.options = dict(self.config.items("options"))
        if self.config.has_section("buttons"):
            self.buttons_dict = dict(self.config.items("buttons"))
            self.buttons = [{"key": key, "value": value} for key, value in self.config.items("buttons")]
        if self.config.has_section('functions'):
            self.functions = {}
            for key, value in self.config.items("functions"):
                single, double, long = map(int, value.split())
                self.functions[key] = {"single": single, "double": double, "long": long}
        if example_config:
            self.save_config()        
        return self

    def get_options(self):
        return self.options
    
    def get_buttons(self):
        return self.buttons
    
    def get_functions(self):
        return self.functions
    
    def get_buttons_dict(self):
        return self.buttons_dict
    
    def set_option(self, option_name, value):
        self.options[option_name] = value
        return self.options
    
    def set_options(self, patch_data):
        self.options.update(patch_data.dict(exclude_unset=True))
        self.save_config()
        return self

    def set_buttons(self, buttons):
        buttons_dict = {}
        for item in buttons:
            key = item["key"]
            value = item["value"]
            buttons_dict[key] = value
        self.buttons_dict = buttons_dict
        self.save_config()
        return self
    
    def zero_buttons_values(self):
        buttons_dict = {}
        for item in self.buttons:
            key = item["key"]
            buttons_dict[key] = -1000
        self.buttons_dict = buttons_dict
        self.save_config()
        return self
    
    def set_functions(self, functions):
        self.functions_dict = {}
        self.functions = {}
        for entry in functions:
            key = entry["key"]
            single = entry.get("single", 0)
            double = entry.get("double", 0)
            long = entry.get("long", 0)
            self.functions_dict[key] = {"single": single, "double": double, "long": long}
            self.functions = {}
        for item in functions:
            key = item["key"]
            single = item.get("single", None)
            double = item.get("double", None)
            long = item.get("long", None)
            function_data = {}
            if single is not None:
                function_data["single"] = single
            else:
                function_data['single'] = -1
            if double is not None:
                function_data["double"] = double
            else:
                function_data['double'] = -1
            if long is not None:
                function_data["long"] = long
            else:
                function_data['long'] = -1
            self.functions[key] = function_data
        self.save_config()    
        return self
    
    def add_section_to_working_config(self, section_name, elements):
        self.working_config.add_section(section_name)
        for key, value in elements.items():
            self.working_config.set(section_name, key, str(value))
        return self
    
    def add_functions_section_to_working_config(self):
        self.working_config.add_section("functions")
        for key, values in self.functions.items():
            value_str = " ".join(str(values[action]) for action in ["single", "double", "long"])
            self.working_config["functions"][key] = value_str
    
    def clean_working_config(self):
        self.working_config = configparser.ConfigParser()
        return self

    def save_config(self):
        self.add_section_to_working_config('options', self.options)
        self.add_section_to_working_config('buttons', self.buttons_dict)
        self.add_functions_section_to_working_config()
        
        with open(self.CONFIG_URL, 'w') as config_file:
            self.working_config.write(config_file)
        self.clean_working_config()
        self.import_config()
        return self