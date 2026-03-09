import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/Logo.png"; 
export default function EMCDigitalMedia() {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center relative overflow-hidden">
      {/* Yellow Circle Background */}
      <div 
        className="absolute w-full h-full bg-yellow-300 z-[-1]"
        style={{
          clipPath: 'circle(40% at right 70%)'
        }}
      ></div>

      {/* Main Container */}
      <div className="w-4/5 h-4/5 bg-gray-400 bg-opacity-50 border-black rounded-3xl overflow-hidden relative z-20">
        
       

        {/* Content Section */}
        <div className="flex justify-between items-center h-full w-4/5 mx-auto">
          
          {/* Text Content */}
          <div className="text-black w-2/5">
            <h2 className="text-4xl uppercase font-bold tracking-wider leading-tight">
              Welcome to our digital Media Company
            </h2>
            
            <p className="text-lg leading-6 my-2.5 tracking-wide">
              e-Media Company
            </p>
            
             <button  type="submit"
            className="w-full bg-yellow-300 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
            
            <Link
              to="/signin"
            >
              Sign In
            </Link>
          </button >
          </div>
<div>
   <img src={logo} alt="Logo"  />
</div>
         
     
    </div>
    </div>
    </div>
  );
}