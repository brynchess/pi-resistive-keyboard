import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import { Toolbar } from 'primereact/toolbar';
import ChangeValueDialog from "./components/ChangeValueDialog";
import ActionButtons from "./components/ActionButtons";
import useButtonsEndpoint from "../../hooks/useButtonsEndpoint";


function AddButtonsPage() {
    const {isLoading, data, removeButton, changeButton, SaveButton, UndoButton, AddButton} = useButtonsEndpoint()
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
                    <AddButton />
                }
                end={
                    <div className="toolbar-buttons">
                        <SaveButton />
                        <UndoButton />
                    </div>
                    
                }
            />
            <ChangeValueDialog visible={dialogOpen} setVisible={setDialogOpen} currentRowData={currentRowData} currentRowDetails={currentRowDetails} changeButton={changeButton} />
        </>
    )
}

export default AddButtonsPage;