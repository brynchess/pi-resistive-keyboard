# pi-resistive-keyboard
INA219 steering wheel interface for DIY car headunit using OpenAuto Pro


## Features

- webgui
- OpenAuto Pro external apps editor
- easy to install
- low cost
- calibration wizard
- assing actions to single, double and long press of every button
## Installation



```bash
  wget https://github.com/brynchess/pi-resistive-keyboard/releases/v0.0.2/download/install.sh
  chmod +x ./install.sh
  ./install.sh
```
When the installation is completed, a browser window with webgui will open.
First, click the install button if it is active (this will add the application to OpenAuto Pro and make it run automatically. If the button is inactive, it means that the installer has successfully done it for you). Then launch the Wizard and complete the calibration.
If the base value is higher than the value after pressing the button, after completing the wizard, go to the Settings section and select the descending mode option.
Now you can add buttons and assign them values, then go to the functions section and assign actions to each button (the application supports single, double and long presses)
## Related
The application was designed to work with [OpenAuto Pro](https://bluewavestudio.io/index.php/bluewave-shop/openauto-pro-detail)


## Wiring diagram

You need to find the cable responsible for transmitting data from the steering wheel and connect it to the connector marked in the diagram.
The INA219 module should be connected to the Raspberry Pi i2c bus.
If you are already using the i2c pins, don't worry, the bus allows you to connect many devices to it in parallel.

![steering wheel](https://github.com/brynchess/pi-resistive-keyboard/assets/57867982/020d7f24-393b-47ae-8f44-3593d1fd1a80)

## Screenshots

![Zrzut ekranu 2023-11-29 200620](https://github.com/brynchess/pi-resistive-keyboard/assets/57867982/0c39f1e2-602a-441f-a3ca-5cbef505c838)
![Zrzut ekranu 2023-11-29 200611](https://github.com/brynchess/pi-resistive-keyboard/assets/57867982/ebfa6324-2ba7-4ab7-9838-581b625b7366)
![Zrzut ekranu 2023-11-29 200602](https://github.com/brynchess/pi-resistive-keyboard/assets/57867982/a3bd9acb-7258-4238-806b-098daeb85ac4)
![Zrzut ekranu 2023-11-29 200547](https://github.com/brynchess/pi-resistive-keyboard/assets/57867982/5ec9e697-b6b1-45bc-9e17-da873baa5e97)
![Zrzut ekranu 2023-11-29 200627](https://github.com/brynchess/pi-resistive-keyboard/assets/57867982/25b19bf3-67ee-40f8-a896-e145c0a1e317)
