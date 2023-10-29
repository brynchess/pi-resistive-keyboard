from ina_integration.utils import ina
from settings.utils import get_config
import threading


class KeyboardManager():
    def __init__(self) -> None:
        self.configure()
        pass

    def configure(self):
        self.init_loop_thread()
        self.import_config()

    def get_value(self):
        return self.maximum_value*ina.get_voltage()/self.maximum_voltage
    
    def import_config(self):
        config = get_config()
        options = config.get_options()
        self.maximum_voltage = float(options.get("maximum_voltage", 5))
        self.maximum_value = float(options.get("maximum_value", 1024))
        self.minimum_voltage = float(options.get("minimum_voltage", 0))
        self.buttons_tolerance = float(options.get("buttons_tolerance", 20))
        self.long_press_time = float(options.get("long_press_time", 200))
        self.double_click_interval = float(options.get("double_click_interval", 40))
        self.read_delay = float(options.get("read_delay", 20))

    def init_loop_thread(self):
        self.loop_thread = threading.Thread(name = "loop_thread", target=self.main_loop)
        self.loop_thread.daemon = True
        self.loop_thread.start()
    
    def main_loop(self):
        while True:
            pass