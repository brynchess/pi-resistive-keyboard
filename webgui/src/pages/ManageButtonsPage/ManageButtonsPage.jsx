import { DataTable } from "primereact/datatable";
import useButtonsEndpoint from "../../hooks/useButtonsEndpoint";
import { Column } from "primereact/column";

function ManageButtonsPage () {
    const { data, isLoading } = useButtonsEndpoint()
    return(
        <>
            <DataTable value={data} loading={isLoading}>
                <Column header="Button" field="key" />
            </DataTable>
        </>
    )
}

export default ManageButtonsPage;