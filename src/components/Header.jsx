import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuthContext } from "../App";
import { useEffect } from "react";

function getLinkStyle({ isActive }) {
  return {
    textDecoration: isActive ? "underline" : "none",
  };
}

const Header = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuthContext();

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  useEffect(() => {}, [user]);

  return (
    <header>
      <nav className="navigator">
        <div className="navigator-components">
          <li>
            <NavLink style={getLinkStyle} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink style={getLinkStyle} to="/todolist">
              TodoList
            </NavLink>
          </li>
          <li>
            <NavLink style={getLinkStyle} to="/products">
              쇼핑몰
            </NavLink>
          </li>
        </div>
        <div className="navigator-components">
          {user ? (
            <>
              <NavLink style={getLinkStyle} to="/cart">
                장바구니
                {user.cart && user.cart.length > 0
                  ? `(${user.cart.length})`
                  : ""}
              </NavLink>
              <li>안녕하세요, {user.email}님</li>
              <li>
                <button onClick={onLogout}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink style={getLinkStyle} to="/login">
                  로그인
                </NavLink>
              </li>
              <li>
                <NavLink style={getLinkStyle} to="/signup">
                  회원가입
                </NavLink>
              </li>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
