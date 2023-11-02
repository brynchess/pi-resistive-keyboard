import InputNumWithLabel from "./InputNumWithLabel";
import './SettingForm.css'

function generateInputComponents(data, changeData) {

    const additionalInfo = {
        "shunt_ohms": {
            tooltip: "Value of shunt resistor used in your module (eg. R100 = 0.1)."
        },
        "maximum_voltage": {
            tooltip: "Voltage your steering wheel works with. If you're not sure set it at 5"
        },
        "buttons_tolerance": {
            tooltip: "It defines range of values that trigger actions of your buttons (100 means +/- 100)"
        },
        "maximum_value": {
            tooltip: "Reference value. All values are calculated in relation to it"
        },
        "read_delay": {
            tooltip: "It helps avoid the rebound effect. Set it as small as possible"
        },
        "minimum_voltage": {
            tooltip: "Background voltage. Set so that the values are closest to 0 without the button pressed"
        },
        "long_press_time": {
            tooltip: "In seconds"
        },
        "double_click_interval": {
            tooltip: "In seconds"
        },
    }

    const inputComponents = Object.keys(data).map((key) => (
      <InputNumWithLabel
        key={key}
        data={data}
        label={key}
        changeData={changeData}
        tooltip={additionalInfo[key] ? additionalInfo[key].tooltip : false}
      />
    ));
  
    return inputComponents;
  }

const SettingsForm = ({data = {}, changeData = () => null}) => {

    return (
    <div className="settings-form">
        {generateInputComponents(data, changeData)}
    </div>
    )
}

export default SettingsForm;