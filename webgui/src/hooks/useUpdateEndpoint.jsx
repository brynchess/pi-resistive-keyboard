import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { update_url } from "../config";
import { Button } from "primereact/button";

function useUpdateEndpoint () {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState()

    const { showError, showSuccess } = useContext(MainContext);

    const fetchData = () => {
        setIsLoading(true)
        fetch(update_url)
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
                return -1
            })
            .then(response => {
                if (response !== -1){
                    setData(response)
                }
                setIsLoading(false)
            })
    }

    const patchData = () => {
        const request = {
            method: "PATCH",
            headers: {
                'Content-type': `application/json`
            }
        }

        setIsLoading(true)
        fetch(update_url, request)
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

    const UpdateButton = ({onClick = () => null}) => (
        <Button disabled={!data} label={data ? "Install pending update" : "No updates"} icon="pi pi-wrench" onClick={() => {
            patchData()
            onClick()
        }} />
    )

    return {data, error, isLoading, UpdateButton}
}

export default useUpdateEndpoint;