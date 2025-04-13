import { signOutUser } from "../../../services/Firebase/firebaseService";
import Button from "../Button/Button";
import { useNavigate } from "react-router";
import "../../../index.css";
import Navbar from "../NavBar/Navbar";

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
    <header className="bg-white shadow-sm px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <img
        src="./assets/0-Primary-Logo.png"
        alt="Logo"
        className="primary-logo"
      />
      <div className="flex items-center gap-8">
        <Navbar />
        <Button
          onClick={handleSignOut}
          variant="secondary"
          id="sign-out-button"
        >
          Sign Out
        </Button>
      </div>
    </header>
  );
};

export default Header;
