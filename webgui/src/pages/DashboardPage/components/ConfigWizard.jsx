import { Button } from "primereact/button";
import { useState } from "react";
import ConfigWizardDialog from "./ConfigWizardDialog";

function ConfigWizard () {
    const [ visible, setVisible ] = useState(false)
    const onHide = () => {
        setVisible(false)
    }
    
    return(
        <>
            <Button label="Run config wizard" icon="pi pi-wrench" onClick={() => setVisible(true)} />
            {visible ?
            <ConfigWizardDialog visible={visible} onHide={onHide} />
            : <></>}
        </>
    )
}

export default ConfigWizard;