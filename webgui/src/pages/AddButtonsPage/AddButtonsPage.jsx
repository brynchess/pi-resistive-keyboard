import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { Toolbar } from 'primereact/toolbar';
import ChangeValueDialog from "./components/ChangeValueDialog";
import ActionButtons from "./components/ActionButtons";
import useButtons from "../../hooks/useButtons";


function AddButtonsPage() {
    const {isLoading, data, addButton, removeButton, changeButton, refetchData, patchData} = useButtons()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentRowData, setCurrentRowData] = useState()
    const [currentRowDetails, setCurrentRowDetails] = useState()

    return (
        <>
            <DataTable value={data} loading={isLoading}>
                <Column header="Value" field="value" />
                <Column header="Button" field="key" />
                <Column header="Actions" body={(rowData, rowDetails) => <ActionButtons rowData={rowData} rowDetails={rowDetails} onEdit={() => { setDialogOpen(true); setCurrentRowData(rowData); setCurrentRowDetails(rowDetails) }} onRemove={removeButton} />} />
            </DataTable>
            <Toolbar
                start={
                    <Button label="Add" icon="pi pi-plus" severity="success" onClick={addButton} />
                }
                end={
                    <>
                        <Button label="Save" icon="pi pi-save" onClick={patchData} />
                        <Button label="Undo changes" icon="pi pi-undo" severity="info" onClick={refetchData} />
                    </>
                    
                }
            />
            <ChangeValueDialog visible={dialogOpen} setVisible={setDialogOpen} currentRowData={currentRowData} currentRowDetails={currentRowDetails} changeButton={changeButton} />
        </>
    )
}

export default AddButtonsPage;