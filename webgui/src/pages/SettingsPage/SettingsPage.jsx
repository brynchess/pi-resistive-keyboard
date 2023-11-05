import { Toolbar } from "primereact/toolbar";
import useSettingsEndpoint from "../../hooks/useSettingsEndpoint";
import SettingsForm from "../../components/SettingsForm";
import TouchScreenModeSwitch from "../../components/TouchScreenModeSwitch";

function SettingsPage () {
    const {data, isLoading, changeData, SaveButton, UndoButton} = useSettingsEndpoint()

    return(
        <>
            <div className="content">
                {isLoading ? <i className="pi pi-spin pi-spinner" /> : <SettingsForm data={data} changeData={changeData}/>}
            </div>
            <TouchScreenModeSwitch />
            <Toolbar
            end={
                <div className="toolbar-buttons">
                    <SaveButton />
                    <UndoButton />
                </div>
            }
            />
        </>
    )
}

export default SettingsPage;