import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import { Toolbar } from 'primereact/toolbar';
import ChangeValueDialog from "./components/ChangeValueDialog";
import ActionButtons from "./components/ActionButtons";
import useButtonsEndpoint from "../../hooks/useButtonsEndpoint";
import { MainContext } from "../../../context/MainContext";


function AddButtonsPage() {
    const {isLoading, data, removeButton, changeButton, SaveButton, UndoButton, AddButton} = useButtonsEndpoint()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentRowData, setCurrentRowData] = useState()
    const [currentRowDetails, setCurrentRowDetails] = useState()
    const {setShouldConnect, websocketValue, sendCloseWebsocketMessage} = useContext(MainContext)

    const handleEdit = (rowData, rowDetails) => {
        setDialogOpen(true);
        setCurrentRowData(rowData);
        setCurrentRowDetails(rowDetails)
        setShouldConnect(true)
    }

    const handleClose = () => {
        setShouldConnect(false)
        sendCloseWebsocketMessage()
    }

    return (
        <>
            <DataTable value={data} loading={isLoading}>
                <Column header="Value" field="value" />
                <Column header="Button" field="key" />
                <Column header="Actions" body={(rowData, rowDetails) => <ActionButtons rowData={rowData} rowDetails={rowDetails} onEdit={() => {handleEdit(rowData, rowDetails)}} onRemove={removeButton} />} />
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
            <ChangeValueDialog visible={dialogOpen} setVisible={setDialogOpen} currentRowData={currentRowData} currentRowDetails={currentRowDetails} changeButton={changeButton} websocketValue={websocketValue} onClose={handleClose} />
        </>
    )
}

export default AddButtonsPage;