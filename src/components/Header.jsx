import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <header>
      <nav className="navigator">
        <div className="navigator-components">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todolist">TodoList</Link>
          </li>
        </div>
        <div className="navigator-components">
          {user ? (
            <>
              <li>안녕하세요, {user.email}님</li>
              <li>
                <button onClick={onLogout}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">로그인</Link>
              </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
