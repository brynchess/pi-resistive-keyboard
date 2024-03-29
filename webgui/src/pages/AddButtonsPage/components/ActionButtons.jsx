import { Button } from "primereact/button"

const ActionButtons = ({ onEdit = () => null, onRemove = () => null, rowDetails = {} }) => {
    const handleRemove = () => { onRemove(rowDetails?.rowIndex) }
    const handleEdit = () => { onEdit() }

    return (
        <span className="toolbar-buttons">
            <Button severity="danger" icon="pi pi-trash" onClick={handleRemove} tooltip="Remove button" />
            <Button severity="success" icon="pi pi-pencil" onClick={handleEdit} tooltip="Change value" />
        </span>
    )
}

export default ActionButtons;