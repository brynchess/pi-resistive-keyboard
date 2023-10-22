import { Dropdown } from "primereact/dropdown";

function KeyOptionsDropdown ({options = [], changeButton = () => null, action = "single", rowData, rowOptions}) {
    const {rowIndex = 0} = rowOptions
    
    const handleChange = (e) => {
        const _rowData = {...rowData}
        _rowData[action] = e.value
        changeButton(rowIndex, _rowData)
    }

    return (
        <Dropdown options={options} optionLabel="function" optionValue="id" placeholder="Pick an action" value={rowData[action]} onChange={handleChange} />
    )
}

export default KeyOptionsDropdown;