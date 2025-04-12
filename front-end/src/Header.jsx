function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white">
      <img
        src="./assets/0-Primary-Logo.png"
        alt="Logo"
        className="primary-logo"
      />
      <nav className="flex gap-4">
        <a href="#" className="text-black hover:text-red-orange">
          Home
        </a>
        <a href="#" className="text-black hover:text-red-orange">
          About
        </a>
        <a href="#" className="text-black hover:text-red-orange">
          Team
        </a>
      </nav>
    </header>
  );
}

export default Header;
