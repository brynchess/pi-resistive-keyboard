import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Steps } from "primereact/steps";
import { useState } from "react";
import useSettingsEndpoint from "../../../hooks/useSettingsEndpoint";
import VoltageRange from "./pages/VoltageRange";



function ConfigWizardDialog({ visible = false, onHide = () => null}) {
    const [activeStep, setActiveStep] = useState(0)
    const onSelect = (e) => {setActiveStep(e.index)}
    const { data, changeData, patchData } = useSettingsEndpoint()
    const pageProps = { data, changeData, patchData }

    const pages = [
        {
            title: 'Welcome',
            component: <>Welcome to the configuration and calibration wizard</>,
            command: () => null
        },
        {
            label: 'Voltage range',
            component: <VoltageRange {...pageProps} />
        },
        {
            label: 'Read delay'
        },
        {
            label: 'Maximum value'
        },
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

    const NextButton = () => <Button label="Next" icon="pi pi-chevron-right" disabled={activeStep >= pages?.length-1} onClick={() => handleClick("next")} />
    const PrevButton = () => <Button icon="pi pi-chevron-left" disabled={activeStep <= 0} onClick={() => handleClick("previous")} />

    const Footer = () => <><PrevButton /><NextButton /></>

    return (
            visible ?
            <Dialog header={<Steps model={pages} activeIndex={activeStep} onSelect={onSelect} />} footer={<Footer />} visible={visible} onHide={onHide}>
                {pages[activeStep]?.component}
            </Dialog> :
            <></>
    )
}

export default ConfigWizardDialog;