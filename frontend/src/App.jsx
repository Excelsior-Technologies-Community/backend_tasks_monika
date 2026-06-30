import FormPage from "./pages/FormPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <FormPage />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;