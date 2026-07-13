import FormPage from "./pages/FormPage";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddProductForm from "./components/AddProductForm";
import LocalStorageForm from "./pages/LocalStorageForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="/local-storage" element={<LocalStorageForm />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </BrowserRouter>
  );
}

export default App;