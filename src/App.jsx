import { createContext, useContext, useEffect } from "react";
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
import { supabase } from "./main";

// Create AuthContext
const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

function App() {
  const { user, updateUser, handleLogin, handleLogout } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      let { data: test, error } = await supabase.from("test").select("*");
      console.log(test);
    };
    fetchData();
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout user={user} handleLogout={handleLogout} />}
        >
          <Route index element={<HomePage />} />
          <Route path="products">
            <Route index element={<ProductsList />} />
            <Route path=":productSlug" element={<ProductDetail />} />
          </Route>
          <Route path="/todolist" element={<ToDoList />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
