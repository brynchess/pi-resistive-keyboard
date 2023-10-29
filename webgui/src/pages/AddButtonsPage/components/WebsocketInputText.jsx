import { InputText } from "primereact/inputtext"
import { useContext } from "react"
import { MainContext } from "../../../../context/MainContext"
import { Button } from "primereact/button"

const StatusButton = ({connectionStatus, onClick = () => null}) => {
    if (connectionStatus === "Open") return (
        <Button icon="pi pi-check" severity="success" onClick={onClick} />
    )
    if (connectionStatus === "Connecting" || connectionStatus === "Closing") return (
        <Button icon="pi pi-spin pi-spinner" disabled />
    )
    if (connectionStatus === "Closed") return (
        <Button icon="pi pi-times" severity="error" disabled />
    )
}

const WebsocketInputText = ({websocketValue = "", setValue = () => null, setAllowEdit = false}) => {
    const {connectionStatus} = useContext(MainContext)
    const handleClick = () => {
        setValue((Math.floor(websocketValue)))
        setAllowEdit(true)
    }
    return (
        <div className="webs-input">
            <InputText disabled value={websocketValue ? websocketValue : ""} />
            <StatusButton connectionStatus={connectionStatus} onClick={handleClick} websocketValue={websocketValue} />
        </div>
    )
}

export default WebsocketInputText;