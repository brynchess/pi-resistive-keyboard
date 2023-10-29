import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import useKeyOptionsEndpoint from "../../hooks/useKeyOptionsEndpoint";
import KeyOptionsDropdown from "../../components/KeyOptionsDropdown";
import useFunctionsEndpoint from "../../hooks/useFunctionsEndpoint";
import { Toolbar } from "primereact/toolbar";

function ManageButtonsPage () {
    const { data: options, isLoading: isLoadingData } = useKeyOptionsEndpoint()
    const { data, isLoading: isLoadingFunctions, SaveButton, UndoButton, changeButton } = useFunctionsEndpoint()

    const props = {
        options,
        changeButton
    }

    const isLoading = isLoadingData || isLoadingFunctions
    return(
        <div className="content">
            <DataTable value={data} loading={isLoading}>
                <Column header="Button" field="key" />
                <Column header="Single click" body={(rowData, rowOptions) => <KeyOptionsDropdown {...props} rowData={rowData} rowOptions={rowOptions} action="single" />} />
                <Column header="Double click" body={(rowData, rowOptions) => <KeyOptionsDropdown {...props} rowData={rowData} rowOptions={rowOptions} action="double" />} />
                <Column header="Long press" body={(rowData, rowOptions) => <KeyOptionsDropdown {...props} rowData={rowData} rowOptions={rowOptions} action="long" />} />
            </DataTable>
            <Toolbar
                end={
                    <div className="toolbar-buttons">
                        <SaveButton />
                        <UndoButton />
                    </div>
                    
                }
            />
        </div>
    )
}

export default ManageButtonsPage;