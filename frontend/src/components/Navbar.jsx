import React, { useState } from "react";
import Headroom from "react-headroom";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => {
    setOpen(!open);
  };

  const getActiveClass = (path) => 
    location.pathname === path ? "text-blue-400" : "text-white";

  return (
    <Headroom className="z-50">
      <div className="z-50 flex items-center justify-center">
        <nav className="w-full bg-transparent h-fit py-3 backdrop-blur-sm z-50">
          {/* Desktop Navbar */}
          <div className="hidden md:flex md:px-10 text-white md:w-[90%] mx-auto justify-between shadow-lg items-center h-full">
            <div
              onClick={() => navigate("/")}
              className="flex cursor-pointer items-center justify-center"
            >
              <h1 className="font">
                CYBER<span className="text-blue-400">TRACE</span>
              </h1>
            </div>
            <div className="flex items-center text-lg justify-center gap-5">
              <h1 onClick={() => navigate("/")} className={`cursor-pointer ${getActiveClass("/")}`}>Home</h1>
              <h1 onClick={() => navigate("/timeline")} className={`cursor-pointer ${getActiveClass("/timeline")}`}>Timeline</h1>
              <h1 
                onClick={() => navigate("/news")} 
                className={`cursor-pointer text-red-400 ${getActiveClass("/news")}`}
                style={{
                  animation: "smoothShake 4s infinite ease-in-out"
                }}
              >
                News
              </h1>
              <h1 onClick={() => navigate("/about")} className={`cursor-pointer ${getActiveClass("/about")}`}>About</h1>
            </div>
          </div>
          {/* Mobile Navbar */}
          <div className="md:hidden flex justify-between items-center px-3 py-2">
            <div
              onClick={() => navigate("/")}
              className="flex items-center justify-center"
            >
              <h1 className="font text-white">
                CYBER<span className="text-blue-400">TRACE</span>
              </h1>
            </div>
            <div
              onClick={handleOpen}
              className="flex items-center justify-center cursor-pointer"
            >
              <h1 className="text-white w-full h-full">{open ? "⨉" : "三"}</h1>
            </div>
          </div>
          {/* Mobile Menu (Height limited to first page) */}
          {open && (
            <div
              className="w-full h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 to-black backdrop-blur-md text-2xl gap-5 absolute flex items-center justify-center flex-col top-16 text-white transition-transform duration-300"
            >
              <h1 onClick={() => { navigate("/"); setOpen(false); }} className={`cursor-pointer ${getActiveClass("/")}`}>Home</h1>
              <h1 onClick={() => { navigate("/timeline"); setOpen(false); }} className={`cursor-pointer ${getActiveClass("/timeline")}`}>Timeline</h1>
              <h1 
                onClick={() => { navigate("/news"); setOpen(false); }} 
                className={`cursor-pointer text-red-400 ${getActiveClass("/news")}`}
                style={{
                  animation: "smoothShake 4s infinite ease-in-out"
                }}
              >
                News
              </h1>
              <h1 onClick={() => { navigate("/about"); setOpen(false); }} className={`cursor-pointer ${getActiveClass("/about")}`}>About</h1>
            </div>
          )}
          {/* Custom CSS animation for smoother shaking with pauses */}
          <style jsx>{`
            @keyframes smoothShake {
              0% { transform: translateX(0); opacity: 0.8; }
              
              /* First smooth movement sequence */
              5% { transform: translateX(-3px); opacity: 0.8; }
              10% { transform: translateX(4px); opacity: 0.8; }
              15% { transform: translateX(-4px); opacity: 0.8; }
              20% { transform: translateX(3px); opacity: 0.8; }
              25% { transform: translateX(-2px); opacity: 0.8; }
              30% { transform: translateX(0); opacity: 0.8; }
              
              /* Pause for 1 second (25% of the 4s animation) */
              30.1%, 55% { transform: translateX(0); opacity: 0.7; }
              
              /* Second smooth movement sequence */
              60% { transform: translateX(-3px); opacity: 0.8; }
              65% { transform: translateX(4px); opacity: 0.8; }
              70% { transform: translateX(-4px); opacity: 0.8; }
              75% { transform: translateX(3px); opacity: 0.8; }
              80% { transform: translateX(-2px); opacity: 0.8; }
              85% { transform: translateX(0); opacity: 0.7; }
              100% { transform: translateX(0); opacity: 0.8; }
            }
          `}</style>
        </nav>
      </div>
    </Headroom>
  );
};

export default Navbar;
