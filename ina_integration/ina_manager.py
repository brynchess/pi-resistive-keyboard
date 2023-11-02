from ina219 import INA219
from settings.utils import get_config

class Ina_Manager:
    def __init__(self) -> None:
        self.configure()
        pass

    def configure(self):
        self.init_ina()

    def init_ina(self):
        self.import_options()
        self.ina = INA219(self.shunt_ohms)
        self.ina.configure()

    def import_options(self):
        config = get_config()
        options = config.get_options()
        self.shunt_ohms = float(options.get("shunt_ohms", 0.1))

    def get_voltage(self):
        return self.ina.voltage()