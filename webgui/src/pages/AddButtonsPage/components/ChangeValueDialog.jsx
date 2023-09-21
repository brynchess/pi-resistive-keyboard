import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { useEffect, useState } from "react"

const button_names = [
    "Vol+",
    "Vol-",
    "Next",
    "Prev",
    "Mode",
    "Up",
    "Down",
    "Left",
    "Right",
    "Plus",
    "Minus",
    "Mute",
    "Home"
]

const ChangeValueDialog = ({ onOpen = () => null, onClose = () => null, value = 0, name = "", visible = false, setVisible = () => null, currentRowData = {} }) => {
    const [newName, setNewName] = useState(name)
    const [newValue, setNewValue] = useState(value)

    useEffect(() => {
        onOpen()
    }, [])

    const onHide = () => {
        onClose()
        setVisible(false)
    }

    return (
        <Dialog
            header={`Change value of ${currentRowData?.name?.toLowerCase()} button`} visible={visible} onHide={onHide}
            footer={
                <Button icon="pi pi-save" label="Save" />
            }
        >
            {`Press and hold ${currentRowData?.name?.toLowerCase()} button on keyboard, then click save to assign a value`}
            <div className="button-value">
                <InputText disabled value={value} keyfilter="int" />
            </div>
            <div className="button-name">
                <Dropdown editable placeholder="Button name" value={newName} onChange={(e) => {setNewName(e.value)}} options={button_names} />
            </div>
        </Dialog>
    )
}

export default ChangeValueDialog