import { useState } from "react";
import LoginForm from "./features/auth/Login";
import Sidebar from "./ui/Sidebar";
import MainDashboard from "./ui/MainDashboard";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { logout, restoreSession } from "./features/auth/authSlice";
import { resetAccount, loadAccount } from "./features/accounts/accountSlice";

export default function App() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [activeAction, setActiveAction] = useState("deposit"); // "deposit", "withdraw", "request loan", "repay loan"

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

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

  function handleLogout() {
    setActiveAction("deposit");
    setShowMobileNav(false);

    localStorage.removeItem("moneyTapUser");
    localStorage.removeItem(`moneyTapAccount_${user.username}`);

    dispatch(logout());
    dispatch(resetAccount());
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("moneyTapUser");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(loadAccount(user.username));
      dispatch(restoreSession(user));
    }
  }, [dispatch]);

  return (
    <div
      className={`flex min-h-screen transition-all ${isAuthenticated ? "bg-gray-100" : "bg-black/40 bg-[url(/dollarBg.webp)] bg-cover bg-center bg-no-repeat bg-blend-multiply"}`}
    >
      {!isAuthenticated ? (
        <div className="flex flex-1 items-center justify-center p-4">
          <LoginForm />
        </div>
      ) : (
        <div className={`w-full md:grid md:grid-cols-[256px_1fr]`}>
          <Sidebar
            onLogout={handleLogout}
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
// import { useState } from "react";
// import LoginForm from "./features/customer/Login";
// import Sidebar from "./ui/Sidebar";
// import MainDashboard from "./ui/MainDashboard";
// import { useDispatch } from "react-redux";
// import { logOut } from "./features/accounts/accountSlice";

// export default function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showMobileNav, setShowMobileNav] = useState(false);
//   const [activeAction, setActiveAction] = useState("deposit"); // "deposit", "withdraw", "request loan", "repay loan"

//   const dispatch = useDispatch();

//   function handleMobileMenu() {
//     setShowMobileNav(true);
//   }

//   function handleCloseMobileMenu() {
//     setShowMobileNav(false);
//   }

//   function handleDesktopNav(action) {
//     setActiveAction(action);
//     setShowMobileNav(false);
//   }

//   function handleLogout() {
//     setIsAuthenticated(false);
//     setActiveAction("deposit");
//     setShowMobileNav(false);

//     dispatch(logOut());
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {!isAuthenticated ? (
//         <div className="flex flex-1 items-center justify-center p-4">
//           <LoginForm onLogin={() => setIsAuthenticated(true)} />
//         </div>
//       ) : (
//         <div className={`w-full md:grid md:grid-cols-[256px_1fr]`}>
//           <Sidebar
//             onLogout={handleLogout}
//             activeAction={activeAction}
//             setActiveAction={setActiveAction}
//             showMobileNav={showMobileNav}
//             onCloseMobileMenu={handleCloseMobileMenu}
//             onDesktopNav={handleDesktopNav}
//           />
//           <MainDashboard
//             activeAction={activeAction}
//             handleMobileMenu={handleMobileMenu}
//           />

//           {/* <MobileNav
//             activeAction={activeAction}
//             setActiveAction={setActiveAction}
//           /> */}
//         </div>
//       )}
//     </div>
//   );
// }
