import { createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ToDoList from "./pages/ToDoList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import ProductDetail from "./pages/ProductDetail";
import ProductsList from "./pages/ProductsList";
import Layout from "./components/Layout";
import Cart from "./pages/Cart";

// Create AuthContext
const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const { user, updateUser, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ user, updateUser, handleLogin, handleLogout }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products">
              <Route index element={<ProductsList />} />
              <Route path=":productSlug" element={<ProductDetail />} />
            </Route>
            <Route path="/todolist" element={<ToDoList />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
