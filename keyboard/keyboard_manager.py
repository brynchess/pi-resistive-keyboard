from ina_integration.utils import ina
from settings.utils import get_config
import threading, time


class KeyboardManager():
    def __init__(self) -> None:
        self.configure()
        self.__destructor_event = threading.Event()
        
    def __del__(self):
        self.__destructor_event.set()

    def configure(self):
        print("INFO: KeyboardManager init...")
        self.import_config()
        print("INFO: KeyboardManager config imported")
        self.init_loop_thread()
        print("INFO: KeyboardManager main loop initialized")


    def get_value(self):
        return self.maximum_value*(max(ina.get_voltage() - self.minimum_voltage, 0))/self.maximum_voltage
    
    def import_config(self):
        self.config = get_config()
        options = self.config.get_options()
        self.buttons = self.config.get_buttons_dict()
        self.functions = self.config.get_functions()
        print(self.buttons)
        print(self.functions)
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
            if (self.value_is_over_tolerance(self.get_value())):
                self.wait_to_avoid_rebound()
                button = self.button_pressed()
                action = self.pick_action_type(button)
                print(action, button)
            if (self.__destructor_event.is_set()):
                print("INFO: Main thread is dead")
                break

    def pick_action_type(self, button):
        if (button is None):
            return None
        action = "single"
        if (button.get("duration", 0) > self.long_press_time):
            action = "long"
        elif (self.check_for_double_click(button)):
            action = "double"
        return action

    def wait_to_avoid_rebound(self):
        time.sleep(self.read_delay)
            
    def value_is_over_tolerance(self, value):
        return value > self.buttons_tolerance

    def button_pressed(self):
        start_time = time.time()
        button = self.value_meets_buttons_value_adjusted_by_tolerance()
        if (button is None):
            return
        button_temp = button
        while self.value_meets_buttons_value_adjusted_by_tolerance() == button_temp and self.value_meets_buttons_value_adjusted_by_tolerance() is not None:
            button_temp = self.value_meets_buttons_value_adjusted_by_tolerance()
        else:
            print("INFO: exit button pressed")
            self.wait_to_avoid_rebound()
        duration = time.time() - start_time
        result = {
            "key": button, "duration": duration
        }
        return result
    
    def check_for_double_click(self, button):
        start_time = time.time()
        double_click = self.get_key_function_id(button, "double")
        while time.time() - start_time < self.double_click_interval and double_click:
            pressed_button = self.button_pressed()
            if (pressed_button and button.get("key") == pressed_button.get("key")):
                return True
        return False

    def get_key_functions(self, button):
        key = button.get("key", None)
        return self.functions.get(key, None)

    def get_key_function_id(self, button, function): #function: single, double, long
        functions = self.get_key_functions(button)
        return functions.get(function, None)

    def dispatch_button_function(self, function_id):
        pass
        
    def value_meets_buttons_value_adjusted_by_tolerance(self):
        value = self.get_value()
        tolerance = self.buttons_tolerance
        for key, button_value in self.buttons.items():
            button_value = int(button_value)
            if value - tolerance <= button_value <= value + tolerance:
                return key
        return None