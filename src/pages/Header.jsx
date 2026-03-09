import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/Logo.png"; 

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
  
    <header className="w-full bg-white shadow-md px-5 py-3 flex items-center justify-between relative z-50">

      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-14 h-14" />
        <span className="font-bold text-2xl text-black">
          e-Media Company
        </span>
      </div>

   
      <nav className="hidden md:flex">
        <ul className="flex space-x-1">
          {[
            "Home", "Articles", "Scoop", "Office", "Zoom", "Location", 
            "Announcements", "Chat", "Calendar", "Archive", "Employees", "About Us"
          ].map((item) => (
            <li key={item}>
              <Link 
                to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-yellow-300 hover:text-black transition-all duration-200 block"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

     
      <Link 
        to="/eMCDigitalMedia" 
        className="hidden md:block bg-yellow-300 text-black px-4 py-2 rounded-lg shadow hover:bg-yellow-400 text-sm font-semibold transition-colors"
      >
        Sign Out
      </Link>

      {/* زر القائمة للموبايل */}
      <button 
        className="md:hidden p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className="text-xl">{isOpen ? '✕' : '☰'}</span>
      </button>

      {isOpen && (
        <>
 
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
            <nav className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 md:hidden">
            <div className="px-4 py-3 max-h-96 overflow-y-auto">
              <ul className="space-y-1">
                {[
                  "Home", "Chat", "Zoom", "Office", "Scoop", "Location", 
                  "Announcements", "Archive", "Employees", "Articles", "Calendar", "About Us"
                ].map((item) => (
                  <li key={item}>
                    <Link 
                      to={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                      className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-yellow-300 hover:text-black transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
                
            
                <li className="pt-2 border-t border-gray-200">
                  <Link 
                    to="/eMCDigitalMedia" 
                    className="block w-full bg-yellow-300 text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;