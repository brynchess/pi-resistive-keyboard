import TouchScreenModeSwitch from "../../components/TouchScreenModeSwitch";
import ConfigWizard from "../../components/ConfigWizard";
import {Divider} from 'primereact/divider';

function DashboardPage () {

    return (
        <div className="content">
            <div className="switches">
                <TouchScreenModeSwitch />
            </div>
            <Divider />
            <div className="wizard-button">
                <ConfigWizard />
            </div>
        </div>
    )
}

export default DashboardPage;