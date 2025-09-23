import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for the chats and messages
const mockChats = [
  { id: 1, name: 'Ali Raza', lastMessage: 'Okay, sounds good!', profilePic: 'https://placehold.co/100x100/A3E635/ffffff?text=AR' },
  { id: 2, name: 'Fatima Khan', lastMessage: 'I am on my way.', profilePic: 'https://placehold.co/100x100/4ADE80/ffffff?text=FK' },
  { id: 3, name: 'Taha Ahmed', lastMessage: 'See you tomorrow!', profilePic: 'https://placehold.co/100x100/34D399/ffffff?text=TA' },
  { id: 4, name: 'Ayesha Bibi', lastMessage: 'Thank you!', profilePic: 'https://placehold.co/100x100/22D3EE/ffffff?text=AB' },
];

const mockMessages = {
  1: [
    { id: 1, sender: 'other', type: 'text', content: 'Hey, how are you?' },
    { id: 2, sender: 'me', type: 'text', content: 'I am doing well, thanks! What about you?' },
    { id: 3, sender: 'other', type: 'text', content: 'All good. I just wanted to confirm our meeting.' },
    { id: 4, sender: 'me', type: 'text', content: 'Okay, sounds good!' },
  ],
  2: [
    { id: 1, sender: 'other', type: 'text', content: 'Are you coming to the event tonight?' },
    { id: 2, sender: 'me', type: 'text', content: 'Yes, I am on my way.' },
  ],
  3: [
    { id: 1, sender: 'other', type: 'text', content: 'Can you send me the presentation slides?' },
    { id: 2, sender: 'me', type: 'text', content: 'Sure, will do!' },
    { id: 3, sender: 'other', type: 'text', content: 'Thanks! See you tomorrow!' },
  ],
  4: [
    { id: 1, sender: 'other', type: 'text', content: 'Thank you!' },
    { id: 2, sender: 'me', type: 'text', content: 'You are welcome.' },
  ],
};

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState(mockMessages[mockChats[0].id]);
  const [newMessage, setNewMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom when new message comes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const message = {
      id: messages.length + 1,
      sender: 'me',
      type: 'text',
      content: newMessage,
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleChatClick = (chat) => {
    setActiveChat(chat);
    setMessages(mockMessages[chat.id] || []);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const message = {
        id: messages.length + 1,
        sender: 'me',
        type: 'image',
        content: imageUrl,
      };
      setMessages([...messages, message]);
    }
  };

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = {
            id: messages.length + 1,
            sender: 'me',
            type: 'location',
            content: `Latitude: ${latitude}, Longitude: ${longitude}`,
          };
          setMessages([...messages, message]);
        },
        (error) => {
          setModalMessage(`Error getting location: ${error.message}`);
          setShowModal(true);
        }
      );
    } else {
      setModalMessage("Geolocation is not supported by your browser.");
      setShowModal(true);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const message = {
          id: messages.length + 1,
          sender: 'me',
          type: 'voice',
          content: audioUrl,
        };
        setMessages([...messages, message]);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setModalMessage(`Error accessing microphone: ${err.message}`);
      setShowModal(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceNote = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="flex flex-col w-1/3 min-w-[300px] max-w-[400px] bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Chats</h2>
          <button onClick={handleLogout} className="px-4 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition">Logout</button>
        </div>
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockChats.map(chat => (
            <div
              key={chat.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-emerald-50 transition ${activeChat.id === chat.id ? 'bg-emerald-100' : ''}`}
              onClick={() => handleChatClick(chat)}
            >
              <img src={chat.profilePic} alt={chat.name} className="w-12 h-12 rounded-full mr-4" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{chat.name}</h3>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex-1 flex flex-col bg-gray-50 max-h-screen">
        <div className="p-4 bg-white border-b border-gray-200 flex items-center shadow-sm">
          <img src={activeChat.profilePic} alt={activeChat.name} className="w-10 h-10 rounded-full mr-4" />
          <h2 className="text-xl font-semibold text-gray-800">{activeChat.name}</h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-md ${
                  message.sender === 'me'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}
              >
                {message.type === 'text' && <p>{message.content}</p>}
                {message.type === 'image' && <img src={message.content} alt="Sent" className="max-w-full rounded-lg" />}
                {message.type === 'location' && <p className="font-mono">{message.content}</p>}
                {message.type === 'voice' && <audio controls src={message.content} />}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center shadow-lg">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
          />
          <div className="flex space-x-2 ml-4">
            {/* Image Upload */}
            <label className="p-3 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            </label>
            {/* Location */}
            <button onClick={handleLocationShare} className="p-3 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </button>
            {/* Voice */}
            <button onClick={handleVoiceNote} className={`p-3 rounded-full text-white transition ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </button>
            {/* Send */}
            <button onClick={handleSendMessage} className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Notification</h3>
            <p className="text-gray-600 text-center mb-6">{modalMessage}</p>
            <button onClick={() => setShowModal(false)} className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
