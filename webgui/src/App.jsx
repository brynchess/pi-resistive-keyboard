import 'primeicons/primeicons.css';
import MainPage from './MainPage';
import { Toast } from 'primereact/toast';
import { MainContext } from '../context/MainContext';
import useToast from './hooks/useToast';
import { useEffect, useRef, useState } from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import { value_ws } from './config';

function App() {
  const toastRef = useRef()
  const { showError, showInfo, showSuccess, showWarn } = useToast(toastRef)
  const [shouldConnect, setShouldConnect] = useState(false)
  const { lastJsonMessage:websocketValue = "", readyState, sendMessage } = useWebSocket(value_ws,{shouldReconnect: () => shouldConnect, heartbeat: {interval: 1000, message: "open"}},shouldConnect)
  const [ touchScreenMode, setTouchScreenMode ] = useState(false)

  const sendCloseWebsocketMessage = () => {sendMessage("close")}
  
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <>
      <Toast ref={toastRef} />
      <MainContext.Provider value={{
        showError,
        showInfo,
        showSuccess,
        showWarn,
        connectionStatus,
        websocketValue,
        setShouldConnect,
        sendCloseWebsocketMessage,
        touchScreenMode,
        setTouchScreenMode
      }}>
        <MainPage />
      </MainContext.Provider>
    </>
  )
}

export default App
