import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />

        <Routes>
          {/* ✅ Use `element` prop with JSX */}
          <Route path="/" element={<Home />} />
          <Route path="/addquantity" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
