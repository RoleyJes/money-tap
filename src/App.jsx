import { useState } from "react";
import LoginForm from "./features/customer/Login";
import Sidebar from "./ui/Sidebar";
import MainDashboard from "./ui/MainDashboard";
import MobileNav from "./ui/MobileNav";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [activeAction, setActiveAction] = useState("deposit"); // "deposit", "withdraw", "request loan", "repay loan"

  function handleMobileMenu() {
    setShowMobileNav(true);
  }

  function handleCloseMobileMenu() {
    setShowMobileNav(false);
  }

  function handleDesktopNav(action) {
    setActiveAction(action);
    setShowMobileNav(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="flex flex-1 items-center justify-center p-4">
          <LoginForm onLogin={() => setIsAuthenticated(true)} />
        </div>
      ) : (
        <div
          className={`w-full md:grid md:grid-cols-[256px_1fr]`}
          // className={`flex w-full flex-col md:grid md:grid-cols-[256px_1fr]`}
        >
          <Sidebar
            onLogout={() => setIsAuthenticated(false)}
            activeAction={activeAction}
            setActiveAction={setActiveAction}
            showMobileNav={showMobileNav}
            onCloseMobileMenu={handleCloseMobileMenu}
            onDesktopNav={handleDesktopNav}
          />
          <MainDashboard
            activeAction={activeAction}
            handleMobileMenu={handleMobileMenu}
          />

          {/* <MobileNav
            activeAction={activeAction}
            setActiveAction={setActiveAction}
          /> */}
        </div>
      )}
    </div>
  );
}
