'use client';

import React, { useState } from 'react';
import { FaUser, FaPaperPlane } from 'react-icons/fa';
interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  isOwn: boolean;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "こんにちは！今日はどうですか？",
      sender: "田中さん",
      timestamp: new Date(2024, 0, 15, 9, 30),
      isOwn: false
    },
    {
      id: 2,
      text: "おはようございます！とても調子がいいです。お疲れ様です。",
      sender: "あなた",
      timestamp: new Date(2024, 0, 15, 9, 32),
      isOwn: true
    },
    {
      id: 3,
      text: "それは良かったです。今日は天気も良いですね。",
      sender: "田中さん",
      timestamp: new Date(2024, 0, 15, 9, 35),
      isOwn: false
    },
    {
      id: 4,
      text: "本当にそうですね！散歩日和です。",
      sender: "あなた",
      timestamp: new Date(2024, 0, 15, 9, 36),
      isOwn: true
    },
    {
      id: 5,
      text: "週末の予定はありますか？",
      sender: "鈴木さん",
      timestamp: new Date(2024, 0, 15, 9, 40),
      isOwn: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('ja-JP', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "あなた",
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">チャット</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.isOwn ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            {/* User Icon */}
            <div className="flex-shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                message.isOwn ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                <FaUser className="text-white text-sm" />
              </div>
            </div>

            {/* Message Content */}
            <div className={`flex flex-col max-w-xs lg:max-w-md ${
              message.isOwn ? 'items-end' : 'items-start'
            }`}>
              {/* Sender Name */}
              <div className={`text-sm text-gray-600 mb-1 ${
                message.isOwn ? 'text-right' : 'text-left'
              }`}>
                {message.sender}
              </div>

              {/* Message Bubble */}
              <div
                className={`relative px-4 py-2 rounded-2xl shadow-sm ${
                  message.isOwn
                    ? 'bg-blue-500 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                
                {/* Speech Bubble Tail */}
                <div
                  className={`absolute top-4 w-0 h-0 ${
                    message.isOwn
                      ? 'right-0 translate-x-full border-l-8 border-l-blue-500 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                      : 'left-0 -translate-x-full border-r-8 border-r-gray-100 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                  }`}
                />
              </div>

              {/* Timestamp */}
              <div className={`text-xs text-gray-500 mt-1 ${
                message.isOwn ? 'text-right' : 'text-left'
              }`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="メッセージを入力..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full p-2 transition-colors duration-200"
          >
            <FaPaperPlane className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
