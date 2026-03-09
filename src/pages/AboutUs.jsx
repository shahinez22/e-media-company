import React from 'react';
import { Users, Target, Lightbulb, Building2, Heart, Award, Zap } from 'lucide-react';
import logo from "../images/Logo.png";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-300 to-yellow-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-black mb-6">About e-Media Companey</h2>
          <p className="text-xl text-black-100 max-w-3xl mx-auto">
            We are pioneers in digital transformation, revolutionizing how Companeys operate in the modern world
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <Target className="h-16 w-16 text-yellow-600 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower traditional institutions with cutting-edge digital solutions that eliminate geographical boundaries, 
                reduce operational costs, and create flexible work environments for the modern workforce.
              </p>
            </div>
            
            <div className="text-center">
              <Lightbulb className="h-16 w-16 text-yellow-600 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                A world where every institution can operate seamlessly in the digital realm, 
                connecting global talent and fostering innovation without the constraints of physical offices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h3>
            <p className="text-gray-600 text-lg">How we started and where we're heading</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              e-Media Companey was born from a simple yet powerful observation: traditional Companeys were struggling 
              to adapt to the rapidly evolving digital landscape. We saw organizations limited by physical constraints, 
              missing out on global talent, and facing unnecessary operational costs.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our founder,  Morsli Shahinez , envisioned a platform that could transform any 
              traditional office into a fully digital institution. We believe that every organization deserves 
              the flexibility, efficiency, and global reach that digital transformation can provide.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Today, we continue to innovate and help institutions worldwide embrace the future of work, 
              creating solutions that make remote collaboration as effective as face-to-face interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Founders</h3>
            <p className="text-gray-600 text-lg">The visionaries behind e-Media Companey</p>
          </div>
          
             <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8 text-center">
              <div className="w-20 h-20 bg-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Morsli Shahinez</h4>
              <p className="text-yellow-600 font-medium mb-4">CEO</p>
              <p className="text-gray-600">
                commenication and pr specialist.
              </p>
            </div>
            
            
          
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h4>
              <p className="text-gray-600">
                We strive for excellence in every solution we deliver, ensuring quality and reliability.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h4>
              <p className="text-gray-600">
                Continuous innovation drives our mission to create cutting-edge digital solutions.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-lg">
              <Users className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h4>
              <p className="text-gray-600">
                We believe in the power of collaboration and building strong partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

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
                Transforming traditional  Companeys into digital excellence. 
       
              </p>
              
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