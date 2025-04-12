import { signOutUser } from "../../../services/Firebase/firebaseService";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import "../../../index.css";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4 space-y-4 flex justify-evenly items-center content-center">
      <Link to="/">
				<img
					src="./assets/0-Primary-Logo.png"
					alt="Logo"
					className="primary-logo"
				/>
			</Link>
      <nav className="flex gap-4">
        <Link to="/" className="text-black hover:text-red-orange">
          Home
        </Link>
        <Link to="#" className="text-black hover:text-red-orange">
          About
        </Link>
        <Link to="#" className="text-black hover:text-red-orange">
          Team
        </Link>
      </nav>
      <div
        
        className="max-w-7xl pr-4 flex justify-end items-center"
      >
        <Button onClick={handleSignOut} variant="secondary" id="sign-out-button">
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default Header;
