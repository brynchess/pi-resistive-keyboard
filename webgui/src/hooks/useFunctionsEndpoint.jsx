import { useContext, useEffect, useState } from "react";
import { functions } from "../config";
import { trash_element } from "../tools/trash_element";
import { uuidv4 } from "../tools/uuidv4";
import { change_element } from "../tools/change_element";
import { MainContext } from "../../context/MainContext";
import { Button } from "primereact/button";
import useButtonsEndpoint from "./useButtonsEndpoint";

const addFunctionsToButtons = (buttons = [], functions = {}) => {
    return buttons.map(button => {
        if (functions[button.key]) {
            return {
                "key": button.key,
                ...functions[button.key]
            }
        } else {
            return button
        }
    })
}

function useFunctionsEndpoint() {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const { data: buttons } = useButtonsEndpoint()
    const [data, setData] = useState([])

    const { showError, showSuccess } = useContext(MainContext);

    const fetchData = () => {
        setIsLoading(true)
        fetch(functions)
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
                    const _response = addFunctionsToButtons(buttons, response)
                    setData(_response)
                }
                setIsLoading(false)
                return response
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
        fetch(functions, request)
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
        if (buttons?.length > 0) {
            fetchData()
        }
    }, [buttons])

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

    return { isLoading, error, data, addButton, removeButton, refetchData: fetchData, changeButton, patchData, SaveButton, UndoButton }
}

export default useFunctionsEndpoint;