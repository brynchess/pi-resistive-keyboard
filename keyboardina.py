#!/usr/bin/env python
from ina219 import INA219
from ina219 import DeviceRangeError
import time
from pynput.keyboard import Key, Controller

SHUNT_OHMS = 0.2
BASE_VOLTAGE = 5.0 #5 or 3.3
MAXIMUM_VALUE = 1024
ZERO_LEVEL_OFFSET = 40
BUTTONS_TOLERANCE = 20
LONG_PRESS_TIME = 800/1000
DOUBLE_CLICK_INTERVAL = 100/1000
READ_DELAY = 20/1000
VERBOSE = True
BASE_VALUE = 560
CHECK_VALUES = False

BUTTONS = [
    #[value, single click, double click, long press]
    [213, 15, 8, 9], # CH+
    [332, 16, 19, 13], # CH-
    [439, 22, 22, 14], # VOL+
    [547, 21, 21, 25], # VOL-
    [112, 10, 17, 4]   # MODE
]
FUNCTIONS = [
    [Key.up],           # 0  Up
    [Key.down],         # 1  Down
    [Key.right],        # 2  Right
    [Key.left],         # 3  Left
    [Key.enter],        # 4  Select
    [Key.esc],          # 5  Back
    ['1'],              # 6  Scroll/rotate left
    ['2'],              # 7  Scroll/rotate right
    ['f'],              # 8  Navigation
    ['g'],              # 9  Answer call
    ['h'],              # 10 Home
    ['j'],              # 11 Media
    ['p'],              # 12 Answer phone
    ['o'],              # 13 End call
    ['b'],              # 14 Toggle play
    ['n'],              # 15 Next track
    ['v'],              # 16 Previous track
    ['m'],              # 17 Google assistant
    [Key.f2],           # 18 Toggle night mode
    [Key.ctrl, Key.f3], # 19 Mode/toggle between active applications
    [Key.f6],           # 20 Expand/collapse top bar
    [Key.f7],           # 21 Volume down
    [Key.f8],           # 22 Volume up
    [Key.f9],           # 23 Brightness down
    [Key.f10],          # 24 Brightness up
    [Key.ctrl, Key.f11],# 25 Toggle mute
    [Key.f12]           # 26 Bring OpenAuto to front
]

keyboard = Controller()
ina = INA219(SHUNT_OHMS)

def printLog(message, parameter):
    if VERBOSE:
        print(message, parameter)

def get_value():
    return BASE_VALUE - (ina.voltage() * MAXIMUM_VALUE / BASE_VOLTAGE - ZERO_LEVEL_OFFSET)

def readPressedButton(analogValue):
    button = -1
    for i in range(len(BUTTONS)):
        button = BUTTONS[i][0]
        if analogValue > button - BUTTONS_TOLERANCE and analogValue < button + BUTTONS_TOLERANCE:
            return i
    return -1

def pressTime(pressedButton):
    pressedTimeStart = time.time()
    currentPressedButton = pressedButton
    analogReadValue = 0
    while (currentPressedButton == pressedButton):
        time.sleep(READ_DELAY/2)
        analogReadValue = get_value()
        currentPressedButton = readPressedButton(analogReadValue)
    pressedTime = time.time() - pressedTimeStart
    printLog("Pressed button: ", pressedButton)
    return pressedTime

def detectAction(analogReadValue):
    pressedButton = readPressedButton(get_value())
    currentPressedButton = pressedButton
    action = -1
    pressTimeValue = pressTime(pressedButton)
    doubleClicked = False
    printLog("Pressed time: ", pressTimeValue)
    pressedTimeEnd = time.time()
    if pressedButton == -1:
        return -1
    if pressTimeValue > LONG_PRESS_TIME:
        action = BUTTONS[pressedButton][3]
        printLog("Long press: ", action)
        return action
    else:
        while (time.time() - pressedTimeEnd < DOUBLE_CLICK_INTERVAL):
            time.sleep(READ_DELAY)
            currentPressedButton = readPressedButton(get_value())
            if currentPressedButton == pressedButton:
                action = BUTTONS[pressedButton][2]
                doubleClicked = True
                printLog("Double click: ", action)
                while(currentPressedButton == pressedButton):
                    currentPressedButton = readPressedButton(get_value())
                return action
    if not doubleClicked:
        action = BUTTONS[pressedButton][1]
        printLog("Single click: ", action)
    return action
            

def configure():
    ina.configure()

def checkValuesLoop():
    while True:
        time.sleep(READ_DELAY)
        printLog("Analog read value: ", get_value())

def loop():
    if get_value() > BUTTONS_TOLERANCE:
        time.sleep(READ_DELAY)
        analogReadValue = get_value()
        printLog("Analog read value: ", analogReadValue)
        action = detectAction(analogReadValue)
        printLog("Action: ", action)
        if action >= 0:
            keyboard.press(FUNCTIONS[action][0])
            if (len(FUNCTIONS[action]) > 1):
                keyboard.press(FUNCTIONS[action][1])
                keyboard.release(FUNCTIONS[action][1])
            keyboard.release(FUNCTIONS[action][0])


if __name__ == "__main__":
    configure()
    if CHECK_VALUES:
        checkValuesLoop()
    while 1:
        loop()

