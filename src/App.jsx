import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ToDoList from "./pages/ToDoList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import ProductDetail from "./pages/ProductDetail";
import ProductsList from "./pages/ProductsList";

function App() {
  const { user, handleLogin, handleLogout } = useAuth();

  return (
    <BrowserRouter>
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products">
          <Route index element={<ProductsList />} />
          <Route path=":productSlug" element={<ProductDetail />} />
        </Route>
        <Route path="/todolist" element={<ToDoList />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
