import { locale } from 'primereact/api';
import 'primeicons/primeicons.css';
import MainPage from './MainPage';

function App() {
  locale('pl')
  return (
    <MainPage />
  )
}

export default App
