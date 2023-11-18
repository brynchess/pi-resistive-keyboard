import { DataTable } from "primereact/datatable";
import useOAAppsEndpoint from "../../hooks/useOAAppsEndpoint";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { ToggleButton } from 'primereact/togglebutton';

function OAAppsManagerPage () {
    const {data, isLoading, SaveButton, UndoButton} = useOAAppsEndpoint()
    const editor = (options) => <InputText value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
    const booleanEditor = (options) => <ToggleButton checked={options.value} onChange={(e) => options.editorCallback(e.value)} />
    const columns = [
        {header: "Name", field: "Name", editor},
        {header: "Path", field: "Path", editor},
        {header: "IconPath", field: "IconPath", editor},
        {header: "Arguments", field: "Arguments", editor},
        {header: "Autostart", field: "Autostart", editor: booleanEditor},
    ]
    return (
        <div className="content">
            <DataTable value={data} loading={isLoading}>
                {columns.map((column, index) => 
                    <Column key={index} {...column} />
                )}
            </DataTable>
            <Toolbar end={
                <div className="toolbar-buttons">
                    <SaveButton />
                    <UndoButton />
                </div>
            } />
        </div>
    )
}

export default OAAppsManagerPage;