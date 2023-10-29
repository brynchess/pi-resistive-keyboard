/* eslint-disable react/prop-types */
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { Checkbox } from 'primereact/checkbox';
import { useEffect, useState } from "react"
import WebsocketInputText from "./WebsocketInputText";

const button_names = [
    "vol+",
    "vol-",
    "next",
    "prev",
    "mode",
    "up",
    "down",
    "left",
    "right",
    "plus",
    "minus",
    "mute",
    "home"
]

const ChangeValueDialog = ({ onOpen = () => null, onClose = () => null, visible = false, setVisible = () => null, currentRowData = {}, currentRowDetails = {}, changeButton = () => null, websocketValue = "" }) => {
    const [key, setKey] = useState()
    const [value, setValue] = useState()
    const [allowEdit, setAllowEdit] = useState(false)

    useEffect(() => {
        onOpen()
    ,[]})

    useEffect(() => {
        setKey(currentRowData?.key)
        setValue(currentRowData?.value)
    },[currentRowData?.key, currentRowData?.value])

    const onHide = () => {
        onClose()
        setAllowEdit(false)
        setVisible(false)
    }

    return (
        <Dialog
            header={`Change value of ${currentRowData?.key?.toLowerCase()} button`} visible={visible} onHide={onHide}
            footer={
                <Button icon="pi pi-save" label="Save" onClick={() => {
                    onHide();
                    changeButton(currentRowDetails?.rowIndex, {key, value});
                }} />
            }
        >
            {`Press and hold ${currentRowData?.name?.toLowerCase()} button on keyboard, then click check button to assign a value`}
            <div className="manual-edit">
                <label htmlFor="allow">Manual edit:</label>
                <Checkbox onChange={(e) => setAllowEdit(e.checked)} checked={allowEdit} inputId="allow" />
            </div>
            <div className="button-value">
                {
                    allowEdit ?
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} keyfilter="int" />
                    :
                    <WebsocketInputText setAllowEdit={setAllowEdit} setValue={setValue} websocketValue={websocketValue} />
                }
            </div>
            <div className="button-name">
                <Dropdown editable placeholder="Button name" value={key} onChange={(e) => {setKey(e.value)}} options={button_names} />
            </div>
        </Dialog>
    )
}

export default ChangeValueDialog