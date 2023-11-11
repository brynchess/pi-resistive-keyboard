import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Steps } from "primereact/steps";
import { useState } from "react";
import useSettingsEndpoint from "../../../hooks/useSettingsEndpoint";
import VoltageRange from "./pages/VoltageRange";
import SaveConfig from "./pages/SaveConfig";

const NextButton = ({activeStep, pages, SaveButton, onHide, handleClick}) => {
    if (activeStep >= pages?.length-1) return <SaveButton onSave={onHide} />
    return <Button label="Next" icon="pi pi-chevron-right" onClick={() => handleClick("next")} />
}

const PrevButton = ({activeStep, handleClick}) => <Button icon="pi pi-chevron-left" disabled={activeStep <= 0} onClick={() => handleClick("previous")} />

const Footer = (props) => {   
    return (
        <>
        <PrevButton {...props} />
        <NextButton {...props} />
        </>
    )
}

function ConfigWizardDialog({ visible = false, onHide = () => null}) {
    const [activeStep, setActiveStep] = useState(0)
    const onSelect = (e) => {setActiveStep(e.index)}
    const { data, changeData, patchData, changedValues, SaveButton } = useSettingsEndpoint()
    const pageProps = { data, changeData, patchData, changedValues }

    const pages = [
        {
            label: 'Start',
            component: <>Welcome to the configuration and calibration wizard</>,
            command: () => null
        },
        {
            label: 'Voltage range',
            component: <VoltageRange {...pageProps} />
        },
        {
            label: 'Save config',
            component: <SaveConfig {...pageProps} />
        }
    ]

    const handleClick = (action = "next") => {
        if (action === "next") setActiveStep(prevstate => {
            if (prevstate < pages?.length-1) {return prevstate+1}
            else {return prevstate}
        })
        if (action === "previous") setActiveStep(prevstate => {
            if (prevstate > 0) {return prevstate-1}
            else {return prevstate}
        })
    }


    return (
            visible ?
            <Dialog header={<Steps model={pages} activeIndex={activeStep} onSelect={onSelect} />} footer={<Footer activeStep={activeStep} pages={pages} SaveButton={SaveButton} onHide={onHide} handleClick={handleClick} />} visible={visible} onHide={onHide} maximizable>
                {pages[activeStep]?.component}
            </Dialog> :
            <></>
    )
}

export default ConfigWizardDialog;