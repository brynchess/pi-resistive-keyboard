import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { install_url } from "../config";
import { Button } from "primereact/button";

function useInstallEndpoint () {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState()

    const { showError, showSuccess } = useContext(MainContext);

    const fetchData = () => {
        setIsLoading(true)
        fetch(install_url)
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
            body: JSON.stringify({ item: "install" }),
            headers: {
                'Content-type': `application/json`
            }
        }

        setIsLoading(true)
        fetch(install_url, request)
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

    const InstallButton = ({onClick = () => null}) => (
        <Button disabled={data} label="Install" icon="pi pi-wrench" onClick={() => {
            patchData()
            onClick()
        }} />
    )

    return {data, error, isLoading, InstallButton}
}

export default useInstallEndpoint;