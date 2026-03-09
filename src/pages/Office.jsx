import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Monitor, Phone, PhoneOff, Users, MessageCircle, Send, Settings, Volume2, Coffee, Lightbulb, Calendar, FileText, Presentation } from 'lucide-react';

const Office = () => {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [selectedDesk, setSelectedDesk] = useState(1);
  const [lightingMode, setLightingMode] = useState('day');
  const [messages, setMessages] = useState([
    { id: 1, user: 'douaa', message: 'Good morning everyone! Ready for the standup?', time: '9:00 AM', desk: 2 },
    { id: 2, user: 'fatima', message: 'Coffee first! ☕', time: '9:01 AM', desk: 3 }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [officeStaff, setOfficeStaff] = useState([
    { id: 1, name: 'You', desk: 1, status: 'online', video: false, audio: false, avatar: '👨‍💻' },
    { id: 2, name: 'amina boutouil', desk: 2, status: 'online', video: true, audio: true, avatar: '👩‍💼' },
    { id: 3, name: 'douaa', desk: 3, status: 'busy', video: false, audio: true, avatar: '👨‍🎨' },
    { id: 4, name: 'fatima', desk: 4, status: 'away', video: false, audio: false, avatar: '👩‍💻' },
    { id: 5, name: 'adem', desk: 5, status: 'online', video: true, audio: false, avatar: '👨‍📊' },
    { id: 6, name: 'aicha', desk: 6, status: 'meeting', video: true, audio: true, avatar: '👩‍🔬' }
  ]);

  const videoRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsVideoOn(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsVideoOn(false);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        desk: selectedDesk
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const moveToDesk = (deskId) => {
    setSelectedDesk(deskId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-red-400';
      case 'away': return 'bg-yellow-400';
      case 'meeting': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-1000`}>
      
     
     
        
     

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 xl:grid-cols-5 gap-6">
        
        {/* Office Floor Plan */}
        <div className="xl:col-span-4">
          <div className={`rounded-2xl p-8 border-4 shadow-2xl ${
            lightingMode === 'day' 
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200' 
              : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600'
          }`}>
            
            {/* Office Layout Grid */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              
              {/* Row 1 - Executive Area */}
              <div className="col-span-3 mb-6">
                <h3 className={`text-lg font-semibold mb-4 ${
                  lightingMode === 'day' ? 'text-gray-800' : 'text-white'
                }`}>
                  Executive Floor
                </h3>
                <div className="flex justify-center gap-8">
                  {/* Conference Room */}
                  <div className={`w-64 h-32 rounded-xl relative transform hover:scale-105 transition-all cursor-pointer shadow-lg ${
                    lightingMode === 'day' 
                      ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-300' 
                      : 'bg-gradient-to-br from-yellow-900 to-yellow-800 border-2 border-yellow-600'
                  }`}>
                    <div className="absolute inset-2 bg-white/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Presentation className={`w-8 h-8 mx-auto mb-2 ${
                          lightingMode === 'day' ? 'text-black-700' : 'text-black-300'
                        }`} />
                        <p className={`text-sm font-medium ${
                          lightingMode === 'day' ? 'text-black-800' : 'text-black-200'
                        }`}>
                          Conference Room
                        </p>
                        <p className={`text-xs ${
                          lightingMode === 'day' ? 'text-black-600' : 'text-black-400'
                        }`}>
                          Meeting in progress
                        </p>
                      </div>
                    </div>
                    {/* Meeting participants */}
                    <div className="absolute bottom-2 left-2 flex -space-x-1">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-white">{i}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 - Work Desks */}
              {[1,2,3,4,5,6].map((deskNum) => {
                const staff = officeStaff.find(s => s.desk === deskNum);
                const isSelected = selectedDesk === deskNum;
                return (
                  <div key={deskNum} className="flex justify-center">
                    <div 
                      onClick={() => moveToDesk(deskNum)}
                      className={`w-40 h-32 rounded-xl relative cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-xl ${
                        isSelected 
                          ? (lightingMode === 'day' 
                              ? 'bg-gradient-to-br from-yellow-200 to-yellow-300 border-4 border-yellow-500' 
                              : 'bg-gradient-to-br from-yellow-700 to-yellow-800 border-4 border-yellow-400')
                          : (lightingMode === 'day' 
                              ? 'bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-gray-400' 
                              : 'bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-gray-500')
                      }`}
                    >
                      {/* Desk */}
                      <div className={`absolute inset-2 rounded-lg ${
                        lightingMode === 'day' ? 'bg-amber-100' : 'bg-gray-600'
                      }`}>
                        {/* Computer */}
                        <div className={`absolute top-1 left-1 w-8 h-6 rounded ${
                          staff?.status === 'online' || staff?.status === 'busy' || staff?.status === 'meeting'
                            ? (lightingMode === 'day' ? 'bg-blue-400' : 'bg-blue-500')
                            : (lightingMode === 'day' ? 'bg-gray-400' : 'bg-gray-600')
                        }`}></div>
                        
                        {/* Chair */}
                        <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-4 rounded-full ${
                          staff?.status === 'away' 
                            ? (lightingMode === 'day' ? 'bg-yellow-300' : 'bg-yellow-600')
                            : (lightingMode === 'day' ? 'bg-red-400' : 'bg-red-600')
                        }`}></div>
                      </div>
                      
                      {/* Person Avatar */}
                      {staff && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-3 ${
                            isSelected 
                              ? 'border-yellow-300 bg-yellow-100' 
                              : 'border-white bg-white'
                          }`}>
                            {staff.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            getStatusColor(staff.status)
                          }`}></div>
                        </div>
                      )}
                      
                      {/* Desk Number */}
                      <div className="absolute top-1 right-1">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          lightingMode === 'day' 
                            ? 'bg-white text-gray-600' 
                            : 'bg-gray-900 text-white'
                        }`}>
                          {deskNum}
                        </span>
                      </div>
                      
                      {/* Name */}
                      {staff && (
                        <div className="absolute bottom-1 left-1 right-1">
                          <p className={`text-xs font-medium text-center truncate ${
                            lightingMode === 'day' ? 'text-gray-700' : 'text-gray-200'
                          }`}>
                            {staff.name}
                          </p>
                        </div>
                      )}
                      
                      {/* Active Indicators */}
                      {staff && (staff.video || staff.audio) && (
                        <div className="absolute top-1 left-1 flex gap-1">
                          {staff.video && <Video className="w-3 h-3 text-green-500" />}
                          {staff.audio && <Mic className="w-3 h-3 text-blue-500" />}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coffee Area */}
            <div className="flex justify-center mb-8">
              <div className={`w-32 h-20 rounded-xl relative ${
                lightingMode === 'day' 
                  ? 'bg-gradient-to-br from-amber-200 to-amber-300 border-2 border-amber-400' 
                  : 'bg-gradient-to-br from-amber-800 to-amber-900 border-2 border-amber-600'
              }`}>
                <div className="absolute inset-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Coffee className={`w-6 h-6 mx-auto mb-1 ${
                      lightingMode === 'day' ? 'text-amber-700' : 'text-amber-300'
                    }`} />
                    <p className={`text-xs font-medium ${
                      lightingMode === 'day' ? 'text-amber-800' : 'text-amber-200'
                    }`}>
                      Coffee Bar
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Call Controls */}
            <div className={`rounded-xl p-4 ${
              lightingMode === 'day' 
                ? 'bg-white/80 border border-gray-300' 
                : 'bg-gray-800/80 border border-gray-600'
            }`}>
              <h4 className={`font-semibold mb-3 ${
                lightingMode === 'day' ? 'text-gray-800' : 'text-white'
              }`}>
                Your Workspace - Desk {selectedDesk}
              </h4>
              
              {/* Video Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  {isVideoOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          👨‍💻
                        </div>
                        <p className="text-sm">Camera Off</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`rounded-lg p-4 ${
                  lightingMode === 'day' ? 'bg-gray-100' : 'bg-gray-700'
                }`}>
                  <h5 className={`font-medium mb-2 ${
                    lightingMode === 'day' ? 'text-gray-800' : 'text-white'
                  }`}>
                    Today's Tasks
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className={`flex items-center gap-2 ${
                      lightingMode === 'day' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Team standup - 9:30 AM
                    </div>
                    <div className={`flex items-center gap-2 ${
                      lightingMode === 'day' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      Code review - 2:00 PM
                    </div>
                    <div className={`flex items-center gap-2 ${
                      lightingMode === 'day' ? 'text-gray-600' : 'text-gray-300'
                    }`}>
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Client demo - 4:00 PM
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={isVideoOn ? stopVideo : startVideo}
                  className={`p-3 rounded-full transition-all ${
                    isVideoOn 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`p-3 rounded-full transition-all ${
                    isAudioOn 
                      ? 'bg-green-500 hover:bg-green-600 text-white' 
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className={`p-3 rounded-full transition-all ${
                    isScreenSharing 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsInCall(!isInCall)}
                  className={`p-3 rounded-full transition-all ${
                    isInCall 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isInCall ? <PhoneOff className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Office Directory */}
          <div className={`rounded-2xl p-6 border-2 shadow-lg ${
            lightingMode === 'day' 
              ? 'bg-white border-gray-200' 
              : 'bg-gray-800 border-gray-600'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              lightingMode === 'day' ? 'text-gray-800' : 'text-white'
            }`}>
              <Users className="w-5 h-5" />
              Office Staff
            </h3>
            <div className="space-y-3">
              {officeStaff.map((person) => (
                <div 
                  key={person.id} 
                  onClick={() => moveToDesk(person.desk)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all hover:bg-opacity-50 ${
                    selectedDesk === person.desk 
                      ? (lightingMode === 'day' ? 'bg-yellow-300' : 'bg-yellow-600')
                      : (lightingMode === 'day' ? 'hover:bg-gray-100' : 'hover:bg-gray-700')
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="text-2xl">{person.avatar}</span>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white ${
                        getStatusColor(person.status)
                      }`} />
                    </div>
                    <div>
                      <span className={`text-sm font-medium ${
                        lightingMode === 'day' ? 'text-gray-800' : 'text-white'
                      }`}>
                        {person.name}
                      </span>
                      <p className={`text-xs capitalize ${
                        lightingMode === 'day' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        Desk {person.desk} • {person.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {person.audio && <Mic className="w-3 h-3 text-green-500" />}
                    {person.video && <Video className="w-3 h-3 text-blue-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Office Chat */}
          <div className={`rounded-3xl p-9 border-5  shadow-lg flex flex-col h-100  ${
            lightingMode === 'day' 
              ? 'bg-white border-gray-200' 
              : 'bg-gray-800 border-gray-600'
          }`}>
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
              lightingMode === 'day' ? 'text-gray-800' : 'text-white'
            }`}>
              <MessageCircle className="w-5 h-5" />
              Office Chat
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages.map((message) => (
                <div key={message.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-semibold ${
                      lightingMode === 'day' ? 'text-blue-600' : 'text-blue-400'
                    }`}>
                      {message.user}
                    </span>
                    <span className={`text-xs px-1 py-0.5 rounded ${
                      lightingMode === 'day' ? 'bg-gray-200 text-gray-600' : 'bg-gray-700 text-gray-400'
                    }`}>
                      Desk {message.desk}
                    </span>
                    <span className={`text-xs ${
                      lightingMode === 'day' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {message.time}
                    </span>
                  </div>
                  <p className={`${
                    lightingMode === 'day' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {message.message}
                  </p>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="flex gap-0">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className={`flex-1 border rounded-lg  py-2 text-sm p-1-1  focus:outline-none focus:ring-2 ${
                  lightingMode === 'day' 
                    ? 'bg-gray-50 border-gray-300 focus:ring-yellow-400' 
                    : 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                }`}
              />
              <button
                onClick={sendMessage}
                className="bg-yellow-300 hover:bg-yellow-600  text-white rounded-lg px-1 py-2 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Office;