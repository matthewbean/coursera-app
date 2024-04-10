import logo from './logo.svg';
import Form from "./components/Form"
import './App.css';
import {AlertProvider} from './context/alertContext';
function App() {
  return (
    <AlertProvider>
    <div className="App">
      <Form></Form>
    </div>
    </AlertProvider>
  );
}

export default App;
