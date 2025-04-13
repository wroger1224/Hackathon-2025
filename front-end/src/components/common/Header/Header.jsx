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
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between overflow-x-auto">
          <img
            src="./assets/0-Primary-Logo.png"
            alt="Logo"
            className="primary-logo"
          />
          <div className="flex items-center gap-8">
            <Navbar onSignOut={handleSignOut} />
            <Button
              onClick={handleSignOut}
              variant="secondary"
              id="sign-out-button"
              className="bg-red-orange text-white px-4 py-2 rounded-md whitespace-nowrap min-[483px]:block hidden"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      {/* Spacer div to prevent content from being hidden under header */}
      <div className="h-[1px]" />
    </>
  );
};

export default Header;
