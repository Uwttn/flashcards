import auth from "../../utils/auth";
import { Link } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };
  return (
    <header className="main-header flex-row align-center mb-4">
      <div className="container-nav flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <img className="logo" src="/FlipIt Logo.png" alt="FlipIt Logo" />
          </Link>
        </div>
        <div className="menu">
          {auth.loggedIn() ? (
            <>
              <Link className="header-link" href="/welcome">
                Create Deck
              </Link>
              <Link className="header-link" href="/decks">
                My Decks
              </Link>
              <Link className="header-link" href="/study">
                Study Mode
              </Link>
              <button className="header-link" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="header-link" href="/login">
                Login
              </Link>
              <Link className="header-link" href="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
