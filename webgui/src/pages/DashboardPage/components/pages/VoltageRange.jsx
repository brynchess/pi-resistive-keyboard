import { useContext, useEffect } from "react"
import { MainContext } from "../../../../../context/MainContext"
import { InputText } from "primereact/inputtext"

function VoltageRange ({ data, changeData = () => null, patchData = () => null }) {
    const { voltageWebsocketValue, setVoltageShouldConnect, voltageSendCloseWebsocketMessage } = useContext(MainContext)
    const handleClose = () => {
        setVoltageShouldConnect(false)
        voltageSendCloseWebsocketMessage()
    }

    const setLowestValue = () => {
        if (!data.minimum_voltage || !voltageWebsocketValue) return null
        if (data?.minimum_voltage > voltageWebsocketValue) {
            changeData("minimum_voltage", voltageWebsocketValue)
        }
    }

    const setHighestValue = () => {
        if (!data.minimum_voltage || !voltageWebsocketValue) return null
        if (data?.maximum_voltage < voltageWebsocketValue) {
            changeData("maximum_voltage", voltageWebsocketValue)
        }
    }

    useEffect(() => {
        changeData("maximum_voltage", 0)
        changeData("minimum_voltage", 100)
        setVoltageShouldConnect(true)
        return () => handleClose()
    }
    ,[])

    useEffect(() => {
        setLowestValue()
        setHighestValue()
    },[voltageWebsocketValue])

    return (
        <div className="wizard-page">
            {
            voltageWebsocketValue ?
            <>
            Press every button on your steering wheel, one by one, then click Next
            <div className="wizard-field">
                {
                    <InputText disabled={true} value={voltageWebsocketValue} />
                }
            </div>
            </> :
            <>
            Reading value, please wait
            <div className="icon"><i className="pi pi-spin pi-spinner" /></div>
            </>
            }
        </div>
    )
}

export default VoltageRange;