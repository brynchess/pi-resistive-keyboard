import { useEffect, useState } from "react"
import { validate } from "../utils/validate"
import { Message } from 'primereact/message';

function ChangedValues({ changedValues = {} }) {

    return (
        <>
            <h2>Changed values:</h2>
            <ul>
                {Object.entries(changedValues).map(([key, value]) => (
                    <li key={key}>
                        {key}: {value}
                    </li>
                ))}
            </ul>
        </>
    )
}

function SaveConfig({ changedValues = {} }) {
    const [valid, setValid] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const cleared_data = validate(changedValues)
        setValid(cleared_data.valid)
        setErrors(cleared_data.errors)
    }, [])

    return (
        <div className="wizard-page">
            {valid ?
                <ChangedValues changedValues={changedValues} /> :
                errors.map((error, index) => {
                    return (
                        <Message text={`ERROR: ${error}`} severity="error" key={index} />
                    )
                })}
            <div className="wizard-warning">
                <Message severity="warn" text="Saving the wizard settings will result in the removal of all values assigned to the buttons. You will retain the assigned functions, but you will need to set the values again." />
            </div>
        </div>
    )
}

export default SaveConfig;