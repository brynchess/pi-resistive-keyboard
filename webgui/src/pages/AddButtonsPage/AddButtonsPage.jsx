import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { uuidv4 } from "../../tools/uuidv4";
import { trash_element } from "../../tools/trash_element";
import { Toolbar } from 'primereact/toolbar';
import ChangeValueDialog from "./components/ChangeValueDialog";
import ActionButtons from "./components/ActionButtons";


const value = [
    { button_value: 358, name: "Vol+", tooltip: "", uuid: uuidv4() },
    { button_value: 233, name: "Vol-", tooltip: "", uuid: uuidv4() },
    { button_value: 121, name: "Next", tooltip: "", uuid: uuidv4() },
    { button_value: 21, name: "Prev", tooltip: "", uuid: uuidv4() },
]

function AddButtonsPage() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentRowData, setCurrentRowData] = useState()
    const [buttons, setButtons] = useState(value)

    const addValue = () => {
        setButtons((prevState) => ([...prevState, { button_value: 0, name: "", uuid: uuidv4() }]))
    }

    const removeValue = (index) => {
        setButtons((prevState) => (trash_element(prevState, index)))
    }

    return (
        <>
            <DataTable value={buttons}>
                <Column header="Value" field="button_value" />
                <Column header="Button" field="name" />
                <Column header="Actions" body={(rowData, rowDetails) => <ActionButtons rowData={rowData} rowDetails={rowDetails} onEdit={() => { setDialogOpen(true); setCurrentRowData(rowData) }} onRemove={removeValue} />} />
            </DataTable>
            <Toolbar
                start={
                    <Button label="Add" icon="pi pi-plus" severity="success" onClick={addValue} />
                }
                end={
                    <Button label="Save" icon="pi pi-save" />
                }
            />
            <ChangeValueDialog visible={dialogOpen} setVisible={setDialogOpen} currentRowData={currentRowData} />
        </>
    )
}

export default AddButtonsPage;