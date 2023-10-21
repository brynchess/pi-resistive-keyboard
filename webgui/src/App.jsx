import 'primeicons/primeicons.css';
import MainPage from './MainPage';
import { Toast } from 'primereact/toast';
import { MainContext } from '../context/MainContext';
import useToast from './hooks/useToast';
import { useRef } from 'react';

function App() {
  const toastRef = useRef()
  const {showError, showInfo, showSuccess, showWarn} = useToast(toastRef)

  return (
    <>
      <Toast ref={toastRef} />
      <MainContext.Provider value={{
        showError,
        showInfo,
        showSuccess,
        showWarn
      }}>
         <MainPage />
      </MainContext.Provider>
    </>
  )
}

export default App
