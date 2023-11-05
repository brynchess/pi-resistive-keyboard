import { Knob } from 'primereact/knob';

const KnobNumWithLabel = ({data = {}, label = "", changeData = () => null, tooltip = "", min, max, step}) => (
    <span className="knob-input">
        <span className="p-float-label">
            <Knob id={label} value={data[label]} onChange={(e) => changeData(label, e.value)} tooltip={tooltip} min={min} max={max} step={step} />
            <label htmlFor={label}>{label}</label>
        </span>
    </span>
)

export default KnobNumWithLabel;