import InputNumWithLabel from "./InputNumWithLabel";
import './SettingForm.css'

function generateInputComponents(data, changeData) {

    const additionalInfo = {
        "shunt_ohms": {
            tooltip: "Check INA219 documentation for more info"
        },
        "base_voltage": {
            tooltip: "Voltage you're using in your steering wheel"
        }
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