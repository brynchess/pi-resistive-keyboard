import os
import configparser

class External_Apps_Manager:
    CONFIG_URL = "/home/pi/.openauto/config/openauto_applications.ini"
    EXAMPLE_CONFIG_URL = "./default_cfgs/example_openauto_applications.ini"
    APP_NAME = "Resistive Keyboard"
    THIS_APP = {
        "Name": APP_NAME,
        "Path": "/home/pi/Scripts/pi-resistive-keyboard/launcher.sh",
        "IconPath": "/home/pi/Scripts/pi-resistive-keyboard/assets/logo.png",
        "Arguments": "",
        "Autostart": "True"
    }

    def __init__(self) -> None:
        self.reset_working_config()
        self.import_config()


    def import_config(self):
        self.applications = []
        self.config = configparser.ConfigParser()
        self.config.optionxform = str
        if os.path.exists(self.CONFIG_URL):
            self.config.read(self.CONFIG_URL)
        else:
            self.config.read(self.EXAMPLE_CONFIG_URL)
        self.import_applications()

    def count_applications(self, config):
        return sum(1 for section in config.sections() if section.startswith('Application_'))
    
    def import_applications(self):
        config = self.config
        for i, section in enumerate(config.sections()):
            if section.startswith('Application_'):
                app_info = {
                    'Name': config.get(section, 'Name', fallback=config.get(section, "name", fallback="")),
                    'Path': config.get(section, 'Path', fallback=config.get(section, "path", fallback="")),
                    'IconPath': config.get(section, 'IconPath', fallback=config.get(section, "iconpath", fallback="")),
                    'Arguments': config.get(section, 'Arguments', fallback=config.get(section, "arguments", fallback="")),
                    'Autostart': config.getboolean(section, 'Autostart', fallback=config.get(section, "autostart", fallback=False)),
                }
                self.applications.append(app_info)
            self.count = i

    def get_applications(self):
        self.import_config()
        return self.applications
    
    def set_applications(self, applications):
        count = 0
        self.reset_working_config()
        self.working_config.add_section("Applications")
        for i, app in enumerate(applications):
            section_name = f'Application_{i}'
            self.working_config[section_name] = {
                'Name': app['Name'],
                'Path': app['Path'],
                'IconPath': app['IconPath'],
                'Arguments': app['Arguments'],
                'Autostart': str(app['Autostart']),
            }
            count = i+1
        self.set_count(count)
        with open(self.CONFIG_URL, 'w') as configfile:
            self.working_config.write(configfile)
        self.reload_config()
        return self
        
    def reload_config(self):
        self.reset_working_config()
        self.import_applications()

    def get_count(self):
        if self.config.has_section("Applications"):
            return self.config.options("Application").get("Count", 0)
        
    def set_count(self, count):
        self.working_config.set("Applications", "Count", str(count))
        return True
        
    def reset_working_config(self):
        self.working_config = configparser.ConfigParser()
        self.working_config.optionxform = str

    def check_application_existence(self, application_name):
        for section in self.config.sections():
            if section.startswith('Application_'):
                if self.config.get(section, 'Name', fallback='') == application_name:
                    print(f"{application_name} is on list")
                    return True
        print(f"{application_name} is not on list")
        return False
    
    def add_app(self, app_info):
        self.applications.append(app_info)
        self.set_applications(self.applications)

    def is_this_app_installed(self):
        return self.check_application_existence(self.APP_NAME)

    def install_this_app(self):
        if self.check_application_existence(self.APP_NAME):
            print("App is already installed")
            return
        self.add_app(self.THIS_APP)
        print("Success")
        return True