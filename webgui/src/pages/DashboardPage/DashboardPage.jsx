import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import TouchScreenModeSwitch from "../../components/TouchScreenModeSwitch";

function DashboardPage () {

    return (
        <div className="content">
            <TouchScreenModeSwitch />
        </div>
    )
}

export default DashboardPage;