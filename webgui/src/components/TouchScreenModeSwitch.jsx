import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { InputSwitch } from 'primereact/inputswitch';

const TouchScreenModeSwitch = () => {
    const { touchScreenMode, setTouchScreenMode } = useContext(MainContext);

    return (
        <>
            <InputSwitch inputId="tsm-switch" checked={touchScreenMode} onChange={(e) => setTouchScreenMode(e.value)} />
            <label htmlFor="tsm-switch">Touchscreen mode</label>
        </>
    )
}

export default TouchScreenModeSwitch;