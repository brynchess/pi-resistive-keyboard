import { useEffect, useState } from "react";

function useToast (toastRef) {
    const [toastRefCurrent, setToastRefCurrent] = useState({show: () => null})
    

    useEffect(() => {
        if(!toastRef.current){
            return null
        }
        setToastRefCurrent(toastRef.current)
        return undefined
    },[toastRef.current])

    const {show} = toastRefCurrent
    
    const showError = (detail = "") => {
        show({ severity: 'error', summary: 'Error', detail: detail ? detail : "There is some error" });
    }

    const showSuccess = (detail = "") => {
        show({ severity: 'success', summary: 'Success', detail: detail ? detail : "Task completed successfully" });
    }

    const showInfo = (detail = "") => {
        show({ severity: 'info', summary: 'Info', detail: detail ? detail : "Some info" });
    }

    const showWarn = (detail = "") => {
        show({ severity: 'warn', summary: 'Warming', detail: detail ? detail : "Some warning" });
    }

    return {showError, showSuccess, showInfo, showWarn}
}

export default useToast;