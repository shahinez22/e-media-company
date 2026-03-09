import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [currentUser] = useState({
    id: 1,
    name: 'shahinez',
    avatar: '👩‍💼',
    status: 'online'
  });

  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([1, 2, 4, 6]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😀', '😂', '😍', '🥰', '😊', '😉', '👍', '👏', '❤️', '🔥', '💯', '🎉', '😢', '😮', '🤔', '👌'];

  const [conversations] = useState([
    {
      id: 1,
      name: 'douaa',
      avatar: '👩‍💼',
      lastMessage: 'Hey! How are you doing?',
      lastMessageTime: '2 min ago',
      unreadCount: 3,
      isOnline: true,
      isGroup: false
    },
    {
      id: 2,
      name: 'Team Alpha',
      avatar: '👥',
      lastMessage: 'Meeting at 3 PM today',
      lastMessageTime: '5 min ago',
      unreadCount: 0,
      isOnline: false,
      isGroup: true,
      members: ['shahinez', 'amina', 'douaa', 'fatima']
    },
    {
      id: 3,
      name: 'adem',
      avatar: '👨‍🔬',
      lastMessage: 'Thanks for the help!',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      isGroup: false
    },
    {
      id: 4,
      name: 'fatima',
      avatar: '👩‍🎨',
      lastMessage: 'Check out this design',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
      isGroup: false
    },
    {
      id: 5,
      name: 'Project Team',
      avatar: '🚀',
      lastMessage: 'Great work everyone!',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false,
      isGroup: true,
      members: ['shahinez', 'amina', 'adem', 'fatima', 'douaa']
    },
    {
      id: 6,
      name: 'amine',
      avatar: '👨‍💼',
      lastMessage: 'Let\'s schedule a call',
      lastMessageTime: '2 days ago',
      unreadCount: 0,
      isOnline: true,
      isGroup: false
    }
  ]);

  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 2,
        senderName: 'douaa',
        text: 'Hey shahinez! How are you doing?',
        timestamp: '10:30 AM',
        type: 'text',
        isRead: false
      },
      {
        id: 2,
        senderId: 2,
        senderName: 'douaa',
        text: 'I wanted to discuss the new project with you',
        timestamp: '10:31 AM',
        type: 'text',
        isRead: false
      },
      {
        id: 3,
        senderId: 1,
        senderName: 'shahinez',
        text: 'Hi douaa ! I\'m doing great, thanks for asking 😊',
        timestamp: '10:35 AM',
        type: 'text',
        isRead: true
      },
      {
        id: 4,
        senderId: 2,
        senderName: 'douaa',
        text: 'That\'s wonderful! When can we meet?',
        timestamp: '10:36 AM',
        type: 'text',
        isRead: false
      }
    ],
    2: [
      {
        id: 1,
        senderId: 3,
        senderName: 'amine',
        text: 'Team meeting scheduled for 3 PM today',
        timestamp: '9:00 AM',
        type: 'text',
        isRead: true
      },
      {
        id: 2,
        senderId: 4,
        senderName: 'fatima',
        text: 'I\'ll be there!',
        timestamp: '9:05 AM',
        type: 'text',
        isRead: true
      },
      {
        id: 3,
        senderId: 1,
        senderName: 'shahinez',
        text: 'Count me in 👍',
        timestamp: '9:10 AM',
        type: 'text',
        isRead: true
      }
    ],
    4: [
      {
        id: 1,
        senderId: 4,
        senderName: 'fatima',
        text: 'Check out this new design concept!',
        timestamp: '2:00 PM',
        type: 'text',
        isRead: false
      },
      {
        id: 2,
        senderId: 4,
        senderName: 'fatima',
        text: 'design-mockup.jpg',
        timestamp: '2:01 PM',
        type: 'image',
        isRead: false
      }
    ]
  });

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentConversation = conversations.find(conv => conv.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  // Simulate typing indicator
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: currentMessages.length + 1,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: messageInput.trim(),
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'text',
        isRead: true
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }));

      setMessageInput('');
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const addEmoji = (emoji) => {
    setMessageInput(prev => prev + emoji);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        id: currentMessages.length + 1,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: file.name,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: file.type.startsWith('image/') ? 'image' : 'file',
        isRead: true
      };

      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }));
    }
  };

  const startVoiceCall = () => {
    alert(`Starting voice call with ${currentConversation?.name}...`);
  };

  const startVideoCall = () => {
    alert(`Starting video call with ${currentConversation?.name}...`);
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      
      {/* Sidebar - Conversations List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-yellow-300 to-yellow-600">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{currentUser.avatar}</span>
            <div className="flex-1">
              <h2 className="text-black font-semibold text-lg">{currentUser.name}</h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-blue-100 text-sm capitalize">{currentUser.status}</span>
              </div>
            </div>
            <div className="text-2xl text-white">💬</div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-grey/30 rounded-xl text-black placeholder-black-400 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-200">🔍</span>
          </div>
        </div>

        {/* Online Users */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Online ({onlineUsers.length})
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {conversations
              .filter(conv => onlineUsers.includes(conv.id) && !conv.isGroup)
              .map(user => (
              <div key={user.id} className="flex-shrink-0 text-center">
                <div className="relative">
                  <span className="text-2xl">{user.avatar}</span>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <p className="text-xs text-gray-600 mt-1 max-w-16 truncate">{user.name.split(' ')[0]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setSelectedChat(conversation.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 mb-2 ${
                  selectedChat === conversation.id
                    ? 'bg-yellow-50 border-2 border-yellow-200 shadow-md'
                    : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-3xl">{conversation.avatar}</span>
                    {conversation.isOnline && !conversation.isGroup && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate max-w-48">{conversation.lastMessage}</p>
                      {conversation.unreadCount > 0 && (
                        <div className="bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                          {conversation.unreadCount}
                        </div>
                      )}
                    </div>
                    
                    {conversation.isGroup && (
                      <p className="text-xs text-gray-500 mt-1">
                        {conversation.members.length} members
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {currentConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <span className="text-3xl">{currentConversation.avatar}</span>
                    {currentConversation.isOnline && !currentConversation.isGroup && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{currentConversation.name}</h2>
                    <p className="text-sm text-gray-600">
                      {currentConversation.isGroup 
                        ? `${currentConversation.members.length} members`
                        : currentConversation.isOnline ? 'Online' : 'Last seen recently'
                      }
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSearchTerm('')}
                    className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    title="Search in conversation"
                  >
                    🔍
                  </button>
                  
                  {!currentConversation.isGroup && (
                    <>
                      <button
                        onClick={startVoiceCall}
                        className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                        title="Voice call"
                      >
                        📞
                      </button>
                      
                      <button
                        onClick={startVideoCall}
                        className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        title="Video call"
                      >
                        📹
                      </button>
                    </>
                  )}
                  
                  <button
                    className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors"
                    title="More options"
                  >
                    ⋮
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
              <div className="max-w-4xl mx-auto space-y-4">
                {currentMessages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${
                      message.senderId === currentUser.id 
                        ? 'order-2' 
                        : 'order-1'
                    }`}>
                      
                      {message.senderId !== currentUser.id && (
                        <p className="text-xs text-gray-600 mb-1 px-2">{message.senderName}</p>
                      )}
                      
                      <div className={`rounded-2xl p-4 shadow-sm ${
                        message.senderId === currentUser.id
                          ? 'bg-blue-500 text-white ml-4'
                          : 'bg-white text-gray-800 mr-4 border border-gray-200'
                      }`}>
                        
                        {message.type === 'text' && (
                          <p className="text-sm leading-relaxed">{message.text}</p>
                        )}
                        
                        {message.type === 'image' && (
                          <div>
                            <div className="bg-gray-200 rounded-lg p-8 text-center mb-2">
                              <span className="text-2xl">🖼️</span>
                              <p className="text-sm text-gray-600 mt-2">{message.text}</p>
                            </div>
                          </div>
                        )}
                        
                        {message.type === 'file' && (
                          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                            <span className="text-2xl">📎</span>
                            <div>
                              <p className="text-sm font-medium">{message.text}</p>
                              <p className="text-xs text-gray-500">Click to download</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs ${
                            message.senderId === currentUser.id ? 'text-blue-200' : 'text-gray-500'
                          }`}>
                            {message.timestamp}
                          </span>
                          
                          {message.senderId === currentUser.id && (
                            <span className="text-xs text-blue-200">
                              {message.isRead ? '✓✓' : '✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl p-4 shadow-sm mr-4 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-gray-500">typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="max-w-4xl mx-auto">
                
                {/* Emoji Picker */}
                {showEmojiPicker && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {emojis.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => addEmoji(emoji)}
                          className="text-2xl hover:bg-white rounded-lg p-2 transition-colors"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-end gap-3">
                  {/* File Upload */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex-shrink-0"
                    title="Attach file"
                  >
                    📎
                  </button>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                  />

                  {/* Message Input */}
                  <div className="flex-1 relative">
                    <textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
                      rows="1"
                      style={{ minHeight: '52px' }}
                    />
                    
                    {/* Emoji Button */}
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-yellow-600 transition-colors"
                      title="Add emoji"
                    >
                      😊
                    </button>
                  </div>

                  {/* Send Button */}
                  <button
                    onClick={sendMessage}
                    disabled={!messageInput.trim()}
                    className={`p-3 rounded-xl transition-colors flex-shrink-0 ${
                      messageInput.trim()
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    title="Send message"
                  >
                    📤
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome to Chat</h2>
              <p className="text-gray-600">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;