"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaPaperPlane } from "react-icons/fa";
import InputUserName from "@/app/components/input-user-name";
import { publishEvent } from "@/app/utils/rest";
import { SubscribeEvent } from "@/app/utils/websocket";

interface Message {
  id: number;
  message: string;
  sender: string;
  timestamp: Date;
}

const ChatApp: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [showNameDialog, setShowNameDialog] = useState<boolean>(true);
  const [tempUserName, setTempUserName] = useState<string>("");
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const websocketRef = useRef<SubscribeEvent | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      message: "こんにちは！今日はどうですか？",
      sender: "田中さん",
      timestamp: new Date(2024, 0, 15, 9, 30),
    },
    {
      id: 2,
      message: "おはようございます！とても調子がいいです。お疲れ様です。",
      sender: "佐藤さん",
      timestamp: new Date(2024, 0, 15, 9, 32),
    },
    {
      id: 3,
      message: "それは良かったです。今日は天気も良いですね。",
      sender: "佐藤さん",
      timestamp: new Date(2024, 0, 15, 9, 35),
    },
    {
      id: 4,
      message: "本当にそうですね！散歩日和です。",
      sender: "佐藤さん",
      timestamp: new Date(2024, 0, 15, 9, 36),
    },
    {
      id: 5,
      message: "週末の予定はありますか？",
      sender: "鈴木さん",
      timestamp: new Date(2024, 0, 15, 9, 40),
    },
  ]);

  // WebSocketの初期化
  useEffect(() => {
    const subscriber = new SubscribeEvent();
    websocketRef.current = subscriber;
    subscriber.onMessage((data: any) => {
      console.log("受信したデータ:", data);
      switch (data.type) {
        case "connection_ack":
          console.log("WebSocket接続が確立されました");
          break;
        case "data":
          const eventData = JSON.parse(data.event);
          const newMessage: Message = {
            id: data.id,
            message: eventData.message,
            sender: eventData.sender,
            timestamp: new Date(eventData.timestamp),
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          break;
        default:
          break;
      }
      /* eslint @typescript-eslint/no-explicit-any: 0 */
    });

    // クリーンアップ関数：コンポーネントがアンマウントされたときに実行
    return () => {
      if (websocketRef.current) {
        websocketRef.current.removeEventListener();
        websocketRef.current.close();
      }
    };
  }, []);

  // メッセージが更新されたら自動的に最下部にスクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        // メッセージを送信
        await publishEvent({
          sender: userName,
          message: newMessage,
        });
        console.log("メッセージが正常に送信されました");
      } catch (error) {
        console.error("メッセージの送信中にエラーが発生しました:", error);
      }
      setNewMessage("");
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSendMessage();
    }
  };

  const handleSetUserName = () => {
    if (tempUserName.trim()) {
      setUserName(tempUserName.trim());
      setShowNameDialog(false);
    }
  };

  const handleUserNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSetUserName();
    }
  };

  if (showNameDialog) {
    return (
      <InputUserName
        username={tempUserName}
        setUsername={setTempUserName}
        handleUserNameKeyPress={handleUserNameKeyPress}
        handleSetUserName={handleSetUserName}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">チャット</h1>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">        {messages.map((message) => (
          <div
            key={`${message.id}-${message.timestamp.getTime()}-${message.sender}`}
            className={`flex items-start space-x-3 ${
              message.sender === userName
                ? "flex-row-reverse space-x-reverse"
                : ""
            }`}
          >
            {/* User Icon */}
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.sender === userName ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                <FaUser className="text-white text-sm" />
              </div>
            </div>

            {/* Message Content */}
            <div
              className={`flex flex-col max-w-xs lg:max-w-md ${
                message.sender === userName ? "items-end" : "items-start"
              }`}
            >
              {/* Sender Name */}
              <div
                className={`text-sm text-gray-600 mb-1 ${
                  message.sender === userName ? "text-right" : "text-left"
                }`}
              >
                {message.sender}
              </div>

              {/* Message Bubble */}
              <div
                className={`relative px-4 py-2 rounded-2xl shadow-sm ${
                  message.sender === userName
                    ? "bg-blue-500 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.message}</p>

                {/* Speech Bubble Tail */}
                <div
                  className={`absolute top-4 w-0 h-0 ${
                    message.sender === userName
                      ? "right-0 translate-x-full border-l-8 border-l-blue-500 border-t-4 border-t-transparent border-b-4 border-b-transparent"
                      : "left-0 -translate-x-full border-r-8 border-r-gray-100 border-t-4 border-t-transparent border-b-4 border-b-transparent"
                  }`}
                />
              </div>

              {/* Timestamp */}
              <div
                className={`text-xs text-gray-500 mt-1 ${
                  message.sender === userName ? "text-right" : "text-left"
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {/* 自動スクロール用の参照要素 */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-gray-50 p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
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
