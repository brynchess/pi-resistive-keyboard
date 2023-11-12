export function validate(changedValues) {
    const errors = []
    let valid = true
    if (is_minimum_voltage_higher_than_maximum(changedValues)) {
        errors.push("Voltage range is not set. Maybe something is not right with connection between INA219 and your steering wheel?")
        valid = false
    }
    if (is_range_too_small(changedValues)) {
        errors.push("Difference between maximum and minimum voltage seems to be too low. Did you press every button on the steering wheel?")
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

function is_range_too_small(changedValues) {
    const { maximum_voltage, minimum_voltage } = changedValues
    return Math.abs(maximum_voltage - minimum_voltage) < 1
}