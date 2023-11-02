import { useContext, useEffect, useState } from "react";
import { buttons_url } from "../config";
import { trash_element } from "../tools/trash_element";
import { uuidv4 } from "../tools/uuidv4";
import { change_element } from "../tools/change_element";
import { MainContext } from "../../context/MainContext";
import { Button } from "primereact/button";

function useButtonsEndpoint() {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])

    const { showError, showSuccess } = useContext(MainContext);

    const fetchData = () => {
        setIsLoading(true)
        fetch(buttons_url)
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
            body: JSON.stringify({ item: data }),
            headers: {
                'Content-type': `application/json`
            }
        }

        setIsLoading(true)
        fetch(buttons_url, request)
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

    const addButton = () => {
        setData((prevState) => ([...prevState, { key: "", value: 0, uuid: uuidv4() }]))
    }

    const removeButton = (index) => {
        setData((prevState) => (trash_element(prevState, index)))
    }

    const changeButton = (index, buttonData) => {
        setData((prevState) => (change_element(prevState, index, buttonData)))
    }

    const SaveButton = () => (
        <Button label="Save" icon="pi pi-save" onClick={patchData} />
    )

    const UndoButton = () => (
        <Button label="Undo changes" icon="pi pi-undo" severity="info" onClick={fetchData} />
    )

    const AddButton = () => (
        <Button label="Add" icon="pi pi-plus" severity="success" onClick={addButton} />
    )

    return { isLoading, error, data, addButton, removeButton, refetchData: fetchData, changeButton, patchData, SaveButton, UndoButton, AddButton }
}

export default useButtonsEndpoint;