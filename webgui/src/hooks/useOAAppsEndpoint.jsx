import { useContext, useEffect, useState } from "react";
import { apps_url } from "../config";
import { MainContext } from "../../context/MainContext";
import { Button } from "primereact/button";


function useOAAppsEndpoint() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])

    const { showError, showSuccess } = useContext(MainContext);

    const fetchData = () => {
        setIsLoading(true)
        fetch(apps_url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw Error(response.error)
                }
            })
            .catch(error => {
                setError(error)
                showError(error.message)
                setIsLoading(false)
                return -1
            })
            .then(response => {
                if (response !== -1) {
                    setData(response)
                }
                setIsLoading(false)
            })
    }

    const patchData = () => {
        const request = {
            method: "PATCH",
            body: JSON.stringify({item: data}),
            headers: {
                'Content-type': `application/json`
            }
        }

        setIsLoading(true)
        fetch(apps_url, request)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw Error(response.error)
                }
            })
            .catch(error => {
                setError(error)
                showError(error.message)
                setIsLoading(false)
                return -1
            })
            .then(response => {
                if (response !== -1) {
                    showSuccess("Changes successfully saved")
                    setData(response)
                }
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const SaveButton = ({onSave = () => null}) => (
        <Button label="Save" icon="pi pi-save" onClick={() => {
            patchData()
            onSave()
        }} />
    )

    const UndoButton = () => (
        <Button label="Undo changes" icon="pi pi-undo" severity="info" onClick={fetchData} />
    )

    return { isLoading, error, data, refetchData: fetchData, patchData, SaveButton, UndoButton }
}

export default useOAAppsEndpoint;