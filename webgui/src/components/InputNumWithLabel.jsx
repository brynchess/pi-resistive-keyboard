import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const InputNumWithLabel = ({ data = {}, label = "", changeData = () => null, tooltip = "", options }) => (
    <span className="p-float-label">
        {
            options ?
                <Dropdown id={label} options={options} value={data[label]} onChange={(e) => changeData(label, e.value)} tooltip={tooltip}/> :
                <InputText id={label} value={data[label]} onChange={(e) => changeData(label, e.target.value)} tooltip={tooltip} keyfilter="num" />
        }
        <label htmlFor={label}>{label}</label>
    </span>
)

export default InputNumWithLabel;