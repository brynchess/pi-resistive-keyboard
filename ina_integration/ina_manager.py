from ina219 import INA219
from settings.utils import get_config
import time
import threading

class Ina_Manager:
    def __init__(self) -> None:
        self.init = False
        if (self.init is False):
            self.configure()
        pass

    def configure(self):
        self.init = True
        print(self.init)
        self.init_ina()
        self.init_loop_thread()

    def init_ina(self):
        self.import_options()
        self.ina = INA219(self.shunt_ohms)
        self.ina.configure()

    def import_options(self):
        config = get_config()
        options = config.get_options()
        self.shunt_ohms = float(options.get("shunt_ohms", 0.1))
        self.base_voltage = float(options.get("base_voltage", 5))
        self.maximum_value = float(options.get("maximum_value", 1024))
        self.zero_level_offset = float(options.get("zero_level_offset", 40))
        self.buttons_tolerance = float(options.get("buttons_tolerance", 20))
        self.long_press_time = float(options.get("long_press_time", 200))
        self.double_click_interval = float(options.get("double_click_interval", 40))
        self.read_delay = float(options.get("read_delay", 20))
        self.base_value = float(options.get("base_value", 560))

    def get_value(self):
        return self.base_value - (self.ina.voltage() * self.maximum_value / self.base_voltage - self.zero_level_offset)
    
    def init_loop_thread(self):
        self.loop_thread = threading.Thread(name = "loop_thread", target=self.main_loop)
        self.loop_thread.daemon = True
        self.loop_thread.start()
    
    def main_loop(self):
        while True:
            time.sleep(1)
            print(self.get_value())