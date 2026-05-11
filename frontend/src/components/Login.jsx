import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Server error");
    }
  };

  return (
    /* Full-page cream background with subtle ruled lines via bg pattern */
    <div className="h-[calc(100vh-60px)] bg-cream bg-lined flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] overflow-x-hidden bg-white rounded-[20px] border border-subtle shadow-sm px-12 py-14">

        {/* Eyebrow */}
        <p className="text-[11px] font-medium tracking-[1.5px] uppercase text-accent mb-2">
          Welcome back
        </p>

        {/* Heading */}
        <h1 className="font-serif text-3xl font-semibold text-ink leading-tight mb-2">
          Sign in to your notes
        </h1>
        <p className="text-sm text-ink-muted font-light mb-9">
          Pick up right where you left off.
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-[18px]">
          {/* Email */}
          <div>
            <label className="block text-[11px] font-medium tracking-[0.4px] uppercase text-ink-muted mb-[7px]">
              Email address
            </label>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-cream text-ink text-[15px] rounded-[10px] border-[1.5px] border-transparent placeholder-ink-faint outline-none focus:border-accent focus:bg-white transition-colors duration-150"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-medium tracking-[0.4px] uppercase text-ink-muted mb-[7px]">
              Password
            </label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-cream text-ink text-[15px] rounded-[10px] border-[1.5px] border-transparent placeholder-ink-faint outline-none focus:border-accent focus:bg-white transition-colors duration-150"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-[14px] bg-accent hover:bg-accent-hover text-white text-[15px] font-medium rounded-[10px] transition-colors duration-150 active:scale-[0.985]"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6 text-ink-faint text-xs tracking-wide">
          <span className="flex-1 h-px bg-subtle" />
          or
          <span className="flex-1 h-px bg-subtle" />
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-ink-muted">
          New here?{" "}
          <Link to="/register" className="text-accent font-medium hover:opacity-75 transition-opacity">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
