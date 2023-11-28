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

