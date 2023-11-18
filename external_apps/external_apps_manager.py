import os
import configparser

class External_Apps_Manager:
    CONFIG_URL = "/home/pi/.openauto/config/openauto_applications.ini"
    EXAMPLE_CONFIG_URL = "./default_cfgs/example_openauto_applications.ini"

    def __init__(self) -> None:
        self.reset_working_config()
        self.import_config()

    def import_config(self):
        self.applications = []
        self.config = configparser.ConfigParser()
        if os.path.exists(self.CONFIG_URL):
            self.config.read(self.CONFIG_URL)
        else:
            self.config.read(self.EXAMPLE_CONFIG_URL)
        self.import_applications()

    def count_applications(self, config):
        return sum(1 for section in config.sections() if section.startswith('Application_'))
    
    def import_applications(self):
        config = self.config
        for section in config.sections():
            if section.startswith('Application_'):
                app_info = {
                    'Name': config.get(section, 'Name', fallback=''),
                    'Path': config.get(section, 'Path', fallback=''),
                    'IconPath': config.get(section, 'IconPath', fallback=''),
                    'Arguments': config.get(section, 'Arguments', fallback=''),
                    'Autostart': config.getboolean(section, 'Autostart', fallback=False),
                }
                self.applications.append(app_info)

    def get_applications(self):
        self.import_config()
        return self.applications
    
    def set_applications(self, applications):
        count = 0
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
        self.working_config["Applications"] = {"Count": count}
        return True
        
    def reset_working_config(self):
        self.working_config = configparser.ConfigParser()