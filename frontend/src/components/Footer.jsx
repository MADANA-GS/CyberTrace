import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
 

  return (
    <footer className={`bg-transparent  py-4 mt-5 border-t border-gray-700`}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-1">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="font text-white text-sm">
            CYBER<span className="text-blue-400">TRACE</span>
          </h1>
        </div>
        <p className="text-xs text-gray-400">Tracking the Digital Evolution</p>
        <p className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} CyberTrade. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
