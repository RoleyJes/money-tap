import { useDispatch } from "react-redux";
import { useState } from "react";
import Error from "../../ui/ErrorInput";
import { updateName } from "./customerSlice";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  function handleLogin(e) {
    e.preventDefault();

    if (!username || username.length < 3) return setError(true);
    dispatch(updateName(username));
    setError(false);

    onLogin();
  }

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="mb-6 text-center text-2xl font-bold">MoneyTap Login</h1>
      <p className="textsm mb-4 text-gray-600">
        Unlock your financial freedom—one click away!
      </p>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div className="pb-3">
          <label className="mb-1 block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your name"
            autoFocus
          />
          {error && (
            <Error message="Username must be at least 3 characters long" />
          )}
        </div>
        {/* <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter email"
          />
        </div> */}
        {/* <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter password"
          />
        </div> */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
