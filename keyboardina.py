#!/usr/bin/env python
from ast import If
from ina219 import INA219
from ina219 import DeviceRangeError
import time
from pynput.keyboard import Key, Controller
from os import system, name

SHUNT_OHMS = 0.2
BASE_VOLTAGE = 5.0 #5 or 3.3
MAXIMUM_VALUE = 1024
ZERO_LEVEL_OFFSET = 40
BUTTONS_TOLERANCE = 20
LONG_PRESS_TIME = 800/1000
DOUBLE_CLICK_INTERVAL = 250/1000
READ_DELAY = 20/1000
VERBOSE = True

BUTTONS = [
    [872, 2, 12, 20], # CH+
    [825, 3, 13, 17], # CH-
    [767, 7, 18, 10], # VOL+
    [697, 6, 16, 10], # VOL-
    [980, 4, 11, 4]   # MODE
]
FUNCTIONS = [
    [Key.up],           #Up
    [Key.down],         #Down
    [Key.right],        #Right
    [Key.left],         #Left
    [Key.enter],        #Select
    [Key.esc],          #Back
    ['h'],              #Home
    ['p'],              #Answer phone
    ['o'],              #End call
    ['b'],              #Toggle play
    ['n'],              #Next track
    ['m'],              #Google assistant
    [Key.f7],           #Volume down
    [Key.f8],           #Volume up
    [Key.ctrl, Key.f11] #Toggle mute
]

keyboard = Controller()
ina = INA219(SHUNT_OHMS)

def printLog(message, parameter):
    if VERBOSE:
        print(message, parameter)

def get_value():
    return ina.voltage() * MAXIMUM_VALUE / BASE_VOLTAGE - ZERO_LEVEL_OFFSET

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

def loop():
    if get_value() > BUTTONS_TOLERANCE:
        time.sleep(READ_DELAY)
        analogReadValue = get_value()
        action = detectAction(analogReadValue)
        printLog("Action: ", action)
        if action >= 0:
            keyboard.press(FUNCTIONS[action][0])
            if (FUNCTIONS[action][1]):
                keyboard.press(FUNCTIONS[action][1])
                keyboard.release(FUNCTIONS[action][1])
            keyboard.release(FUNCTIONS[action][0])


if __name__ == "__main__":
    configure()
    while 1:
        loop()

