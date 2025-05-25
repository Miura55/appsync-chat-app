import React from "react";

const InputUserName: React.FC<{
  username: string;
  setUsername: (username: string) => void;
  handleUserNameKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSetUserName: () => void;
}> = ({ username, setUsername, handleUserNameKeyPress, handleSetUserName }) => {
  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">チャットへようこそ</h2>
            <p className="text-gray-600">ユーザー名を入力してください</p>
          </div>
          
          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleUserNameKeyPress}
              placeholder="ユーザー名を入力..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            
            <button
              onClick={handleSetUserName}
              disabled={!username.trim()}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              チャットを開始
            </button>
          </div>
        </div>
      </div>
    );
}

export default InputUserName;
