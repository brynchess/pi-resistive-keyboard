import { useEffect, useState } from "react"

function validate(changedValues) {
    const errors = []
    let valid = true
    if (is_minimum_voltage_higher_than_maximum(changedValues)) {
        errors.push("Voltage range is not set. Maybe something is not right with connection of INA and your steering wheel?")
        valid = false
    }
    return {
        valid,
        errors
    }
}

function is_minimum_voltage_higher_than_maximum(changedValues) {
    const { maximum_voltage, minimum_voltage } = changedValues
    return maximum_voltage < minimum_voltage
}

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
                errors}
        </div>
    )
}

export default SaveConfig;