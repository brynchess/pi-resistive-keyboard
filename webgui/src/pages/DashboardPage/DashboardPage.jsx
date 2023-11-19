import TouchScreenModeSwitch from "../../components/TouchScreenModeSwitch";
import useInstallEndpoint from "../../hooks/useInstallEndpoint";
import useUpdateEndpoint from "../../hooks/useUpdateEndpoint";
import ConfigWizard from "./components/ConfigWizard";
import {Divider} from 'primereact/divider';
import './DashboardPage.css';

function DashboardPage () {
    const { InstallButton } = useInstallEndpoint()
    const { UpdateButton } = useUpdateEndpoint()

    return (
        <div className="content dashboard">
            <div className="switches">
                <TouchScreenModeSwitch />
            </div>
            <Divider />
            <div className="buttons">
                <div>Install app: <InstallButton /></div>
                <div>Update: <UpdateButton /></div>
            </div>
            <Divider />
            <div className="wizard-button">
                <ConfigWizard />
            </div>
        </div>
    )
}

export default DashboardPage;