import { ChakraProvider } from "@chakra-ui/react";
import Form from "./components/Form";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Alert from "./components/Alert";
import "./App.css";
import { AlertProvider } from "./context/alertContext";
function App() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <div className="App">
          <Alert></Alert>
          <Nav></Nav>
          <Hero></Hero>
          <Form></Form>
        </div>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
