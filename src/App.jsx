import { useState } from "react";
import LoginForm from "./features/customer/Login";
import Sidebar from "./ui/Sidebar";
import MainDashboard from "./ui/MainDashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeAction, setActiveAction] = useState("deposit"); // "deposit", "withdraw", "request loan", "repay loan"

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="flex flex-1 items-center justify-center p-4">
          <LoginForm onLogin={() => setIsAuthenticated(true)} />
        </div>
      ) : (
        <div className={`flex w-full flex-col md:flex-row`}>
          <Sidebar
            onLogout={() => setIsAuthenticated(false)}
            activeAction={activeAction}
            setActiveAction={setActiveAction}
          />
          <MainDashboard activeAction={activeAction} />
        </div>
      )}
    </div>
  );
}
