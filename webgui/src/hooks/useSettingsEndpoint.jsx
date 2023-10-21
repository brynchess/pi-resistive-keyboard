import { useContext, useEffect, useState } from "react";
import { settings_url } from "../config";
import { MainContext } from "../../context/MainContext";
import { Button } from "primereact/button";


function useSettingsEndpoint () {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState({
        shunt_ohms: 0,
        base_voltage: 0,
        maximum_value: 0,
        zero_level_offset: 0,
        buttons_tolerance: 0,
        long_press_time: 0,
        double_click_interval: 0,
        read_delay: 0,
        base_value: 0,
    })

    const {showError, showSuccess} = useContext(MainContext);

    const fetchData = () => {
        setIsLoading(true)
        fetch(settings_url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw Error(response.error)
            }
        })
        .catch(error => {
            setData()
            setError(error)
            showError(error.message)
            setIsLoading(false)
        })
        .then(response => {
            setData(response)
            setIsLoading(false)
        })
    }

    const patchData = () => {
        const request = {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Content-type': `application/json`
            }
        }

        setIsLoading(true)
        fetch(settings_url, request)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw Error(response.error)
            }
        })
        .catch(error => {
            setData([])
            setError(error)
            showError(error.message)
            setIsLoading(false)
        })
        .then(response => {
            showSuccess("Changes successfully saved")
            setData(response)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    },[])

    const changeData = (field, value) => {
        setData(prevState => (
            {...prevState, [field]: value}
            ))
    }

    const SaveButton = () => (
        <Button label="Save" icon="pi pi-save" onClick={patchData} />
    )

    const UndoButton = () => (
        <Button label="Undo changes" icon="pi pi-undo" severity="info" onClick={fetchData} />
    )

    return {isLoading, error, data, refetchData: fetchData, patchData, changeData, SaveButton, UndoButton}
}

export default useSettingsEndpoint;