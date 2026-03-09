import React, { useState, useEffect, useRef } from 'react';

const Zoom = () => {
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'douaa', avatar: '👨‍💼', isMuted: false, isHost: true },
    { id: 2, name: 'fatima', avatar: '👩‍💻', isMuted: true, isHost: false },
    { id: 3, name: 'adam', avatar: '👨‍🔬', isMuted: false, isHost: false },
    { id: 4, name: 'aicha', avatar: '👩‍🎨', isMuted: true, isHost: false },
  ]);
  const [currentUser] = useState({ 
    id: 1, 
    name: 'shahinez', 
    avatar: '👩‍💼', 
    isHost: true 
  });
  const [meetingId, setMeetingId] = useState('123-456-789');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'douaa', message: 'Hello everyone!', time: '10:30' },
    { id: 2, sender: 'fatima', message: 'Good morning!', time: '10:31' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Simulate getting user media
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        if (isCameraOn && videoRef.current) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: isMicOn 
          });
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        } else if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        }
      } catch (error) {
        console.log('Camera access denied or not available');
      }
    };

    getUserMedia();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn, isMicOn]);

  const joinMeeting = () => {
    setIsInMeeting(true);
  };

  const leaveMeeting = () => {
    setIsInMeeting(false);
    setIsCameraOn(false);
    setIsMicOn(false);
    setIsScreenSharing(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: currentUser.name,
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setChatMessages([...chatMessages, message]); 
      setNewMessage('');
    }
  };

  const copyMeetingLink = () => {
    const meetingLink = `https://yoursite.com/zoom/join/${meetingId}`;
    navigator.clipboard.writeText(meetingLink);
    alert('Meeting link copied to clipboard!');
  };

  if (!isInMeeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white-900 via-white-800 to-indigo-900 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📹</div>
            <h1 className="text-3xl font-bold text-black mb-2">Join Meeting</h1>
            <p className="text-black-200">Connect with your team</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-black-200 text-sm font-medium mb-2">
                Meeting ID
              </label>
              <input
                type="text"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-grey/20 rounded-xl text-black placeholder-black-200 focus:outline-none focus:ring-2 focus:ring-black-400 focus:border-grey backdrop-blur-sm"
                placeholder="Enter Meeting ID"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-grey/10">
                <button
                  onClick={toggleCamera}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isCameraOn 
                      ? 'bg-yellow-300 hover:bg-yellow-600 text-white' 
                      : 'bg-white/20 hover:bg-white/30 text-black-200'
                  }`}
                >
                  {isCameraOn ? '📹 Camera On' : '📷 Camera Off'}
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-grey/10">
                <button
                  onClick={toggleMic}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isMicOn 
                      ? 'bg-yellow-300 hover:bg-yellow-600 text-black' 
                      : 'bg-white/20 hover:bg-white/30 text-black-200'
                  }`}
                >
                  {isMicOn ? '🎤 Mic On' : '🔇 Mic Off'}
                </button>
              </div>
            </div>

            <button
              onClick={joinMeeting}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span className="text-xl">🚀</span>
              Join Meeting
            </button>

            <div className="text-center">
              <button
                onClick={copyMeetingLink}
                className="text-yellow-300 hover:text-yellow transition-colors text-sm underline"
              >
                Copy meeting invitation link
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl">📹</div>
          <div>
            <h1 className="text-white font-semibold">Meeting ID: {meetingId}</h1>
            <p className="text-gray-400 text-sm">{participants.length} participants</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-red-500 text-black px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
          <button
            onClick={copyMeetingLink}
            className="bg-yellow-300 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors text-sm"
          >
            📋 Copy Link
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        
        {/* Video Area */}
        <div className="flex-1 relative">
          {isScreenSharing ? (
            <div className="w-full h-full bg-yellow-800 flex items-center justify-center">
              <div className="text-center text-black">
                <div className="text-6xl mb-4">🖥️</div>
                <h3 className="text-2xl font-semibold mb-2">Screen Sharing</h3>
                <p className="text-gray-400">You are sharing your screen</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 p-4">
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 h-full">
                
                {/* Main Video (Current User) */}
                <div className="relative bg-gray-900 rounded-xl overflow-hidden border-2 border-yellow-500">
                  {isCameraOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-black">
                        <div className="text-4xl mb-2">{currentUser.avatar}</div>
                        <p className="font-medium">{currentUser.name}</p>
                        <p className="text-sm text-gray-400">Camera Off</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                    {currentUser.name} (You)
                  </div>
                  
                  {currentUser.isHost && (
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                      HOST
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {!isMicOn && (
                      <div className="bg-red-500 p-2 rounded-full">
                        <span className="text-white text-sm">🔇</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Other Participants */}
                {participants.slice(1).map((participant) => (
                  <div key={participant.id} className="relative bg-gray-900 rounded-xl overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-black">
                        <div className="text-4xl mb-2">{participant.avatar}</div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-sm text-gray-400">Camera Off</p>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
                      {participant.name}
                    </div>
                    
                    {participant.isHost && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                        HOST
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {participant.isMuted && (
                        <div className="bg-red-500 p-2 rounded-full">
                          <span className="text-white text-sm">🔇</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meeting Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-4 border border-gray-600">
              
              <button
                onClick={toggleMic}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  isMicOn 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={isMicOn ? 'Mute' : 'Unmute'}
              >
                {isMicOn ? '🎤' : '🔇'}
              </button>

              <button
                onClick={toggleCamera}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  isCameraOn 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={isCameraOn ? 'Stop Video' : 'Start Video'}
              >
                {isCameraOn ? '📹' : '📷'}
              </button>

              <button
                onClick={toggleScreenShare}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  isScreenSharing 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-gray-600 hover:bg-gray-500 text-white'
                }`}
                title={isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
              >
                🖥️
              </button>

              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="p-4 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition-all duration-300"
                title="Participants"
              >
                👥
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="p-4 bg-gray-600 hover:bg-gray-500 text-white rounded-xl transition-all duration-300 relative"
                title="Chat"
              >
                💬
                {chatMessages.length > 2 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chatMessages.length - 2}
                  </div>
                )}
              </button>

              <button
                onClick={leaveMeeting}
                className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300"
                title="Leave Meeting"
              >
                📞
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {(showChat || showParticipants) && (
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            
            {/* Sidebar Header */}
            <div className="border-b border-gray-700 p-4 flex">
              <button
                onClick={() => {
                  setShowParticipants(true);
                  setShowChat(false);
                }}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  showParticipants ? 'bg-yellow-300 text-black' : 'text-gray-400 '
                }`}
              >
                👥 Participants
              </button>
              <button
                onClick={() => {
                  setShowChat(true);
                  setShowParticipants(false);
                }}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  showChat ? 'bg-yellow-300 text-black' : 'text-gray-400 hover:text-yellow'
                }`}
              >
                💬 Chat
              </button>
            </div>

            {/* Participants Panel */}
            {showParticipants && (
              <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <span>👥</span>
                  Participants ({participants.length})
                </h3>
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-xl">
                      <span className="text-2xl">{participant.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">{participant.name}</p>
                          {participant.isHost && (
                            <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-medium">
                              HOST
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">
                          {participant.id === currentUser.id ? 'You' : 'Guest'}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {participant.isMuted && (
                          <span className="text-red-400 text-sm">🔇</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Panel */}
            {showChat && (
              <div className="flex-1 flex flex-col">
                
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span>💬</span>
                    Chat
                  </h3>
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="bg-gray-700/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white-400 font-medium text-sm">
                            {message.sender}
                          </span>
                          <span className="text-white-500 text-xs">{message.time}</span>
                        </div>
                        <p className="text-white text-sm">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Input */}
                <div className="border-t border-gray-700 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-yellow-300 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors"
                    >
                      📤
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Zoom;