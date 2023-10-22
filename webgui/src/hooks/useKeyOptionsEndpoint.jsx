import { useContext, useEffect, useState } from "react";
import { key_options } from "../config";
import { MainContext } from "../../context/MainContext";

function useKeyOptionsEndpoint() {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])

    const { showError } = useContext(MainContext);

    const fetchData = () => {
        setIsLoading(true)
        fetch(key_options)
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

    useEffect(() => {
        fetchData()
    }, [])




    return { isLoading, error, data }
}

export default useKeyOptionsEndpoint;