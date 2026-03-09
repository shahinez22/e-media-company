import React from 'react';
import { Users,  Globe, ArrowRight, CheckCircle, Briefcase, Home, Archive, Monitor, Wifi, Clock, Shield } from 'lucide-react';
import logo from "../images/Logo.png"; 
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-indigo-100">
     

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-yellow-100 text-black-600 rounded-full text-sm font-medium mb-6">
                 The Future of Work is Here
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your Companey
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-yellow-600 block">
                Into Digital Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Convert traditional office-based organizations into fully digital  Companey. 
              Enable remote work, eliminate physical office constraints, and embrace the technological evolution 
              with our comprehensive digital transformation platform.
            </p>
            
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Monitor className="h-16 w-16 text-blue-500 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Wifi className="h-20 w-20 text-purple-500 animate-bounce" />
        </div>
      </section>

      {/* Digital Office Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Complete Digital Office Ecosystem</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything your traditional office has, now available digitally with enhanced capabilities
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Digital Meeting Rooms */}
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">Digital Meeting Rooms</h4>
              <p className="text-gray-600 mb-4">
                High-quality virtual conference spaces with advanced collaboration tools, 
                screen sharing, and seamless integration with your workflow.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• HD Video Conferencing</li>
                <li>• Screen Sharing & Recording</li>
                <li>• Interactive Whiteboards</li>
              </ul>
            </div>
            
            {/* Digital Archives */}
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Archive className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">Digital Archives</h4>
              <p className="text-gray-600 mb-4">
                Secure, searchable document storage with version control, 
                automated backups, and enterprise-grade security protocols.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Cloud Storage & Backup</li>
                <li>• Advanced Search</li>
                <li>• Version Control</li>
              </ul>
            </div>
            
            {/* Freelancer Management */}
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-200 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-2xl font-semibold text-gray-900 mb-3">Freelancer Hub</h4>
              <p className="text-gray-600 mb-4">
                Comprehensive platform for managing remote employees and freelancers 
                with project tracking, time management, and payment integration.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Project Management</li>
                <li>• Time Tracking</li>
                <li>• Payment Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Stats */}
      <section className="py-20 bg-gradient-to-r from-yellow-300 to-yellow-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="items-center">
            <div>
              <h3 className="text-4xl font-bold text-black mb-8">Why Go Digital?</h3>
              <div className="space-y-6">
                <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-4">
                  <CheckCircle className="h-8 w-8 text-black-400 mr-4 flex-shrink-0" />
                  <div className="text-black ">
                    <h4 className="font-semibold text-lg">Reduce Costs by 60%</h4>
                    <p className="text-black-100">Eliminate office rent, utilities, and maintenance expenses</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-4">
                  <Globe className="h-8 w-8 text-black-400 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className=" font-semibold text-lg">Access Global Talent</h4>
                    <p className="text-black-100">Hire the best professionals from anywhere in the world</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-4">
                  <Clock className="h-8 w-8 text-black-400 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">24/7 Productivity</h4>
                    <p className="text-black-100">Work across time zones with seamless collaboration</p>
                  </div>
                </div>
                
                <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-4">
                  <Shield className="h-8 w-8 text-black-400 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className=" font-semibold text-lg">Enterprise Security</h4>
                    <p className="text-black-100">Bank-level security with encrypted communications</p>
                  </div>
                </div>
              </div>
            </div>
            
           
           
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      

      {/* Footer */}
      <footer className=" bg-gradient-to-br from-yellow-50 to-yellow-100 text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                < img src={logo} alt="Logo"  className="h-8 w-8 text-black-400" />
                <span className="text-2xl font-bold">  e-Media Company</span>
              </div>
              <p className="text-black-400 mb-4 max-w-md">
                Transforming traditional Companeys into digital excellence. 
                Empowering organizations to thrive in the modern digital landscape.
              </p>
              <div className="flex space-x-4">
                <div className="bg-yellow-600 p-2 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <div className="bg-yellow-600 p-2 rounded-lg">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="bg-yellow-600 p-2 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-black-400">
                <li>Digital Transformation</li>
                <li>Virtual Office Setup</li>
                <li>Cloud Integration</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-black-400">
                <li>shahinezmorsli@gmail.com</li>
                <li>+213558578269</li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 text-center items-center">
            <div className="text-black-400 ">
              © 2025 DigitalOffice. All rights reserved.
            </div>
            <div className="text-sm text-black-500">
              Founded by <span className="text-orange-400 font-medium">Morsli chahinez</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}