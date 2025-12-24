import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Error from "../../ui/ErrorInput";
import { login } from "./authSlice";
import FloatingInput from "../../ui/FloatingInput";
import { startLoading, stopLoading } from "../auth/authSlice";
import { loadAccount } from "../accounts/accountSlice";
import { LuLoaderCircle } from "react-icons/lu";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);

  function handleLogin(e) {
    e.preventDefault();

    if (!username || username.length < 3) return setUsernameError(true);
    if (!password || password.length < 3) return setPasswordError(true);

    dispatch(startLoading());

    setTimeout(() => {
      localStorage.setItem(
        "moneyTapUser",
        JSON.stringify({ username, password }),
      );

      dispatch(login({ username, password }));
      dispatch(loadAccount(username));
      dispatch(stopLoading());
      setUsername("");
      setPassword("");
    }, 1500);

    setUsernameError(false);
    setPasswordError(false);
  }

  return (
    <div className="shadowxl w-full max-w-sm rounded-2xl bg-white/70 p-8 backdrop-blur-sm">
      <h1 className="mb-6 text-center text-2xl font-bold">MoneyTap Login</h1>
      <p className="mb-9 text-black">
        Unlock your financial freedom—one click away!
      </p>
      <form className="space-y-6" onSubmit={handleLogin}>
        <FloatingInput
          id="username"
          label="Username"
          value={username}
          onChange={setUsername}
        >
          {usernameError && (
            <Error message="Username must be at least 3 characters long" />
          )}
        </FloatingInput>
        <FloatingInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
        >
          {passwordError && (
            <Error message="Password must be at least 3 characters long" />
          )}
        </FloatingInput>

        <button
          type="submit"
          className={`w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-600`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <LuLoaderCircle className="size-5 animate-spin text-gray-600" />
              Submitting...
            </span>
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
