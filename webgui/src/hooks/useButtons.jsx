import { useEffect, useState } from "react";
import { buttons_url } from "../config";
import { trash_element } from "../tools/trash_element";
import { uuidv4 } from "../tools/uuidv4";
import { change_element } from "../tools/change_element";

function useButtons () {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])

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
            body: JSON.stringify({item: data}),
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
            setData([])
            setError(error)
            setIsLoading(false)
        })
        .then(response => {
            setData(response)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    },[])

    const addButton = () => {
        setData((prevState) => ([...prevState, { key: "", value: 0, uuid: uuidv4() }]))
    }

    const removeButton = (index) => {
        setData((prevState) => (trash_element(prevState, index)))
    }

    const changeButton = (index, buttonData) => {
        setData((prevState) => (change_element(prevState, index, buttonData)))
    }

    return {isLoading, error, data, addButton, removeButton, refetchData: fetchData, changeButton, patchData}
}

export default useButtons;