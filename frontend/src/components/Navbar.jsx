import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-accent/30 h-15 flex items-center px-9">
      <div className="w-full flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-semibold text-ink tracking-tight">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          Notes
        </Link>

        {/* Right side — only when logged in */}
        {user && (
          <div className="flex items-center gap-4">
            {/* Avatar + username */}
            <div className="flex items-center gap-2 text-sm text-ink-muted">
              <div className="w-7.5 h-[30px] rounded-full bg-accent-light border border-accent/30 flex items-center justify-center text-xs font-medium text-accent uppercase">
                {user.username?.[0]}
              </div>
              <span>{user.username}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm text-ink-muted border border-subtle rounded-lg hover:border-red-400 hover:text-red-500 transition-colors duration-150"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;