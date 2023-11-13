import { useContext } from "react";
import InputNumWithLabel from "./InputNumWithLabel";
import './SettingForm.css';
import KnobNumWithLabel from "./KnobWithLabel";
import { MainContext } from "../../context/MainContext";

function have_options (additionalInfo, key) {
    return additionalInfo[key]?.options
}

function generateInputComponents(data, changeData, touchScreenMode) {
    const additionalInfo = {
        "shunt_ohms": {
            tooltip: "Value of shunt resistor used in your module (eg. R100 = 0.1).",
            min: 0,
            max: 1,
            step: 0.1
        },
        "maximum_voltage": {
            tooltip: "Voltage your steering wheel works with. If you're not sure set it at 5",
            min: 0,
            max: 24,
            step: 0.5
        },
        "buttons_tolerance": {
            tooltip: "It defines range of values that trigger actions of your buttons (100 means +/- 100)",
            min: 0,
            max: 300,
            step: 1
        },
        "maximum_value": {
            tooltip: "Reference value. All values are calculated in relation to it",
            min: 0,
            max: 10000,
            step: 100
        },
        "read_delay": {
            tooltip: "It helps avoid the rebound effect. Set it as small as possible",
            min: 0,
            max: 0.01,
            step: 0.001
        },
        "minimum_voltage": {
            tooltip: "Background voltage. Set so that the values are closest to 0 without the button pressed",
            min: 0,
            max: 12,
            step: 0.01
        },
        "long_press_time": {
            tooltip: "In seconds",
            min: 0,
            max: 1,
            step: 0.1
        },
        "double_click_interval": {
            tooltip: "In seconds",
            min: 0,
            max: 1,
            step: 0.1
        },
        "descending_mode": {
            tooltip: "Set true if your base voltage is higher that the voltage after pressing a button",
            options: [
                {value: true, label: "True"},
                {value: false, label: "False"}
            ]
        }
    }

    const inputComponents = Object.keys(data).map((key) => (
        touchScreenMode && !have_options(additionalInfo, key) ?
            <KnobNumWithLabel
                key={key}
                data={data}
                label={key}
                changeData={changeData}
                {...additionalInfo[key]}
            />
            :
            <InputNumWithLabel
                key={key}
                data={data}
                label={key}
                changeData={changeData}
                {...additionalInfo[key]}
            />
    ))
  
    return inputComponents;
  }

const SettingsForm = ({data = {}, changeData = () => null}) => {
    const { touchScreenMode } = useContext(MainContext)

    return (
    <div className={`${touchScreenMode ? "settings-form-knob" : "settings-form"}`}>
        {generateInputComponents(data, changeData, touchScreenMode)}
    </div>
    )
}

export default SettingsForm;