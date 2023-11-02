import { InputText } from "primereact/inputtext";

const InputNumWithLabel = ({data = {}, label = "", changeData = () => null, tooltip = ""}) => (
    <span className="p-float-label">
        <InputText id={label} value={data[label]} onChange={(e) => changeData(label, e.target.value)} tooltip={tooltip} keyfilter="num" />
        <label htmlFor={label}>{label}</label>
    </span>
)

export default InputNumWithLabel;