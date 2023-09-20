import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const ActionButtons = ({onEdit = () => null}) => {
    const handleRemove = () => null
    const handleEdit = () => {onEdit()}
    return (
        <>
            <Button severity="danger" icon="pi pi-trash" onClick={handleRemove} tooltip="Remove button" />
            <Button severity="success" icon="pi pi-pencil" onClick={handleEdit} tooltip="Change value" />
        </>
    )
}

const ChangeValueDialog = ({onOpen = () => null, onClose = () => null, value = 0, visible = false, setVisible = () => null, currentRowData = {} }) => {

    useEffect(() => {
        onOpen()
    }, [])

    const onHide = () => {
        onClose()
        setVisible(false)
    }

    return (
        <Dialog header={`Change value of ${currentRowData?.name?.toLowerCase()} button`} visible={visible} onHide={onHide}>
            {`Press and hold ${currentRowData?.name?.toLowerCase()} button on keyboard, then click save to assign a value`}
            <div className="button-value">
                <InputText disabled value={value} keyfilter="int" />
            </div>
            <Button icon="pi pi-save" label="Save" />
        </Dialog>
    )
}

function AddButtonsPage () {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentRowData, setCurrentRowData] = useState()

    const value = [
        {button_value: 358, name: "Vol+", tooltip: ""},
        {button_value: 233, name: "Vol-", tooltip: ""},
        {button_value: 121, name: "Next", tooltip: ""},
        {button_value: 21, name: "Next", tooltip: ""},
    ]

    return(
        <>
            <DataTable value={value}>
                <Column header="Value" field="button_value" />
                <Column header="Button" field="name" />
                <Column header="Actions" body={(rowData) => <ActionButtons rowData={rowData} onEdit={() => {setDialogOpen(true); setCurrentRowData(rowData)}} />} />
            </DataTable>
            <ChangeValueDialog visible={dialogOpen} setVisible={setDialogOpen} currentRowData={currentRowData} />
        </>
    )
}

export default AddButtonsPage;