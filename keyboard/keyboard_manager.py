from ina_integration.utils import ina
from settings.keys_functions import functions_list
from settings.utils import get_config
import threading, time
from pynput.keyboard import Controller


class KeyboardManager():
    def __init__(self) -> None:
        self.configure()
        self.__destructor_event = threading.Event()
        
    def __del__(self):
        self.__destructor_event.set()

    def configure(self):
        print("INFO: KeyboardManager init...")
        self.import_config()
        self.keyboard = Controller()
        print("INFO: KeyboardManager config imported")
        self.init_loop_thread()
        print("INFO: KeyboardManager main loop initialized")

    def get_value(self):
        return self.maximum_value*(max(ina.get_voltage() - self.minimum_voltage, 0))/self.maximum_voltage
    
    def import_config(self):
        self.config = get_config()
        self.settings_mode = False
        options = self.config.get_options()
        self.buttons = self.config.get_buttons_dict()
        self.functions = self.config.get_functions()
        self.maximum_voltage = float(options.get("maximum_voltage", 5))
        self.maximum_value = float(options.get("maximum_value", 1024))
        self.minimum_voltage = float(options.get("minimum_voltage", 0))
        self.buttons_tolerance = float(options.get("buttons_tolerance", 20))
        self.long_press_time = float(options.get("long_press_time", 200))
        self.double_click_interval = float(options.get("double_click_interval", 40))
        self.read_delay = float(options.get("read_delay", 20))
        self.descending_mode = options.get("descending_mode", False)
        self.min_trigger_value = self.calculate_lowest_trigger_value(self.buttons)
        self.max_trigger_value = self.calculate_highest_trigger_value(self.buttons)

    def set_settingsmode_on(self):
        self.settings_mode = True

    def set_settingsmode_off(self):
        self.settings_mode = False

    def init_loop_thread(self):
        self.loop_thread = threading.Thread(name = "loop_thread", target=self.main_loop)
        self.loop_thread.daemon = True
        self.loop_thread.start()
    
    def main_loop(self):
        while True:
            if (self.value_meets_conditions(self.get_value())):
                self.wait_to_avoid_rebound()
                button = self.button_pressed()
                if (button):
                    action_type = self.pick_action_type(button)
                    function_id = self.get_key_function_id(button, action_type)
                    self.dispatch_button_function(function_id)
                    self.cooldown_after_double_click(action_type)
            if (self.__destructor_event.is_set()):
                print("INFO: Main thread is dead")
                break

    def cooldown_after_double_click(self, action_type):
        if (action_type == "double"):
            time.sleep(self.double_click_interval)

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
            
    def value_is_over_min_trigger_value(self, value):
        return value > self.min_trigger_value
    
    def value_is_below_max_trigger_value(self, value):
        return value < self.max_trigger_value
    
    def value_meets_conditions(self, value):
        if (self.descending_mode):
            return self.value_is_below_max_trigger_value(value)
        return self.value_is_over_min_trigger_value(value)

    def button_pressed(self):
        start_time = time.time()
        button = self.value_meets_buttons_value_adjusted_by_tolerance()
        if (button is None):
            return None
        button_temp = button
        while self.value_meets_buttons_value_adjusted_by_tolerance() == button_temp and self.value_meets_buttons_value_adjusted_by_tolerance() is not None:
            button_temp = self.value_meets_buttons_value_adjusted_by_tolerance()
        else:
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
        if (self.settings_mode):
            return None
        for item in functions_list:
            if item["id"] == function_id:
                keys_list = item["keys"]
                break
        for key in keys_list:
            self.keyboard.press(key)
        for key in keys_list:
            self.keyboard.release(key)
        print("INFO: you just pressed: ", keys_list)
        
    def value_meets_buttons_value_adjusted_by_tolerance(self):
        value = self.get_value()
        tolerance = self.buttons_tolerance
        for key, button_value in self.buttons.items():
            button_value = int(button_value)
            if value - tolerance <= button_value <= value + tolerance:
                return key
        return None
    
    def calculate_lowest_trigger_value(self, buttons):
        return int(min(buttons.values(), key=lambda x: int(x)))-self.buttons_tolerance
    
    def calculate_highest_trigger_value(self, buttons):
        return int(max(buttons.values(), key=lambda x: int(x)))+self.buttons_tolerance