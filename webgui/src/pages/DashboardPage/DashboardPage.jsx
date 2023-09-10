import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

function DashboardPage () {

    const value = [
        {element: "Main app", status: false, tooltip: ""},
        {element: "Daemon", status: true, tooltip: ""},
        {element : "Buttons", status: false, tooltip: "Add some buttons"}
    ]

    return(
        <>
            <DataTable value={value}>
                <Column header="Element" field="element" />
                <Column header="Status" field="status" body={({status}) => (status ? <i className="pi pi-check" /> : <i className="pi pi-times" /> )} />
            </DataTable>
        </>
    )
}

export default DashboardPage;