import importedData from "../Js/importedData";
import react_icon from "../assets/Images/react.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContextGlobally } from "./StateProvider";
import { auth } from "../Js/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const { down, bag, user, logout } = importedData;
  const [account, setAccount] = useState("hidden");
  const [userName, setUserName] = useState("");
  const { toogleTrue, cart, toogle, isLoggedIn } = useContextGlobally();

  const notifySignin = () =>
    toast.warning("Sign in to your Gamestore account first");

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, [localStorage.getItem("userName")]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      //firebaseLogout();
      localStorage.removeItem("userName");
      localStorage.removeItem("userID");
      window.location.reload(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const checkLogin = () => {
    isLoggedIn ? null : notifySignin();
  };

  return (
    <div className="fixed  w-full h-20  md:h-[70px] bg-gradient-to-r from-slate-950 via-slate-800 to-red-950 pt-[11px]">
      <div className="mb-16 md:mb-2 mx-5  flex">
        <div className=" relative w-[100%]   flex justify-between  ">
          {/* Game Store Logo */}
          <Link to={"/"}>
            <div className="h-12 w-40 md:w-44  gap-2 flex items-center transform transition-transform duration-300 hover:scale-105">
              <div className="w-6">
                <img src={react_icon} alt="react-icon" />
              </div>
              <div className=" text-xl md:text-2xl font-bold text-white">
                GameStore
              </div>
            </div>
          </Link>

          {/* Shopping Cart Icon */}
          <div className="flex items-center md:gap-1 ">
            <div
              className="flex z-20 hover:cursor-pointer w-[120px] h-9 gap-2 justify-center rounded-full  top-5 mt-1 items-center py-1 font-bold text-white text-base bg-blue-950 border-2 border-blue-500 transform transition-transform duration-500 hover:scale-110"
              onClick={() => toogleTrue()}
            >
              <img
                className="text-white w-5"
                src={bag}
                alt="shopping-bag-icon"
              />
              <div className="text-white text-sm md:text-base">Cart</div>

              {/* Display the number of items in the cart */}
              <div className="  flex text-sm w-5 h-5 md:w-6 md:h-6 md:text-lg font-bold bg-white text-black rounded-full justify-center items-center">
                {cart.length}
              </div>
            </div>

            <button
              onClick={() =>
                setAccount(account == "block" ? "hidden" : "block")
              }
              className="group flex z-10 gap-1 w-fit ml-2 items-center transform transition-transform duration-500 hover:scale-110"
            >
              <img
                src={user}
                className="w-[30px]  border-2 border-slate-400 focus:outline-none group-focus:border-white rounded-full"
                alt="user-icon"
              />
              <img src={down} className="w-5" alt="arrow-down-icon" />
            </button>

            <div
              className={`${account} z-50  w-72 absolute end-3 top-14 bg-slate-800 rounded-lg shadow-2xl`}
            >
              <div className="flex px-5 py-3 text-center text-white text-sm md:text-base">
                <img
                  src={user}
                  className="w-[30px]  border-2 border-slate-400 focus:outline-none group-focus:border-white rounded-full"
                  alt="user-icon"
                />
                <div className="pl-3 pr-2">
                  {userName ? userName : "Login to an account"}
                </div>
              </div>
              <div
                
                className="flex pl-5 py-3 items-center text-white text-sm  cursor-pointer  gap-2 "
              >
                <Link to={"/"}>
                  <div className="transform transition-transform duration-300 hover:scale-125">
                    Home
                  </div>
                </Link>
              </div>
              <Link to={"/orders"}>
                <div
                  onClick={() => checkLogin()}
                  className="flex pl-5 py-3 items-center text-white text-sm  cursor-pointer  gap-2 "
                >
                  <div className="transform transition-transform duration-300 hover:scale-125">
                    My Games
                  </div>
                </div>
              </Link>

              <div
                onClick={() => checkLogin()}
                className="flex pl-5 py-3 items-center text-white text-sm  cursor-pointer  gap-2 "
              >
                <Link to={"/pay"}>
                  <div className="transform transition-transform duration-300 hover:scale-125">
                    Checkout
                  </div>
                </Link>
              </div>

              {userName === null ? (
                <Link to={"/login"} className="z-30">
                  <div className="flex pl-5 py-3 items-center text-white text-sm  cursor-pointer bg-gradient-to-tl from-blue-700 gap-2 to-blue-900 rounded-b-lg ">
                    <img className="w-4" src={logout} alt="login-icon" />
                    <div className="transform transition-transform duration-300 hover:scale-105">
                      Login to your account
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to={"/"}>
                  <div
                    onClick={() => handleSignOut()}
                    className="flex pl-5 py-3  items-center text-white text-sm  cursor-pointer bg-gradient-to-tl from-red-700 to-red-900 gap-3 rounded-b-lg"
                  >
                    <img
                      className="w-4 object-contain"
                      src={logout}
                      alt="logout-icon"
                    />
                    <div className="transform transition-transform duration-300 hover:scale-105">
                      Logout from your account
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "#334155", color: "white" }}
      />
    </div>
  );
}

export default Header;
