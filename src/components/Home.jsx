import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function HomeUI({ navigateFn }) {
  const [createName, setCreateName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [showRoomLink, setShowRoomLink] = useState(false);
  const [generatedRoomLink, setGeneratedRoomLink] = useState("");
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  const goTo = (path) => {
    if (typeof navigateFn === "function") {
      try {
        navigateFn(path);
      } catch {
        window.location.href = path;
      }
    } else {
      window.location.href = path;
    }
  };

  const handleCreateRoom = () => {
    if (!createName.trim()) return;
    const roomID = Math.random().toString(36).substring(2, 8).toUpperCase();
    const link = `${window.location.origin}/room?roomID=${roomID}`;
    setGeneratedRoomLink(link);
    setShowRoomLink(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRoomLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const joinCreatedRoom = () => {
    const roomID = new URLSearchParams(new URL(generatedRoomLink).search).get('roomID');
    goTo(`/room?roomID=${roomID}&userName=${encodeURIComponent(createName)}`);
  };

  const handleJoinRoom = () => {
    if (!joinName.trim() || !roomCode.trim()) return;
    goTo(`/room?roomID=${roomCode}&userName=${encodeURIComponent(joinName)}`);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex justify-center items-center p-4 animate-fadeIn">
      <div className="w-full max-w-4xl bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700 space-y-10 transition-all duration-500 ease-out animate-slideUp">

        <div className="text-center mb-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
            🎥 Talk Buddy
          </h1>
          <p className="text-gray-300 mt-2">Fun meets Professional — Start a call instantly</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* CREATE ROOM BLOCK */}
          <div className="flex-1 bg-gray-800/40 border border-gray-700 rounded-2xl p-6 space-y-6 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-xl font-bold text-white text-center mb-2">Create a New Room</h2>

            <div>
              <label className="block font-semibold text-gray-200 mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:ring-4 focus:ring-purple-500/40 focus:border-purple-500 outline-none"
                placeholder="Enter your name"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                title="Enter your display name for creating a room"
              />
            </div>

            <button
              onClick={handleCreateRoom}
              disabled={!createName.trim()}
              className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 font-bold text-lg shadow-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all animate-pop"
            >
              Create Room
            </button>

            {showRoomLink && (
              <div className="mt-6 p-4 bg-gray-700/30 border border-purple-500 rounded-xl space-y-4 animate-fadeIn">
                <div className="text-sm text-purple-100">Room Created! Share this link:</div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    readOnly
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900 text-white border border-purple-400 text-xs"
                    value={generatedRoomLink}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm hover:bg-purple-700"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
                <button
                  onClick={joinCreatedRoom}
                  className="w-full py-2 bg-purple-700 hover:bg-purple-800 rounded-lg text-white font-semibold text-sm"
                >
                  Join This Room →
                </button>
              </div>
            )}
          </div>

          {/* JOIN ROOM BLOCK */}
          <div className="flex-1 bg-gray-800/40 border border-gray-700 rounded-2xl p-6 space-y-6 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-xl font-bold text-white text-center mb-2">Join an Existing Room</h2>

            <div>
              <label className="block font-semibold text-gray-200 mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:ring-4 focus:ring-blue-500/40 focus:border-blue-500 outline-none"
                placeholder="Enter your name"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
                title="Enter your display name for joining a room"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-200 mb-2">Room Code</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 uppercase tracking-widest font-mono focus:ring-4 focus:ring-blue-500/40 focus:border-blue-500 outline-none"
                placeholder="ABC123"
                maxLength={6}
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                title="Enter the 6‑character room code you received"
              />
            </div>

            <button
              onClick={handleJoinRoom}
              disabled={!joinName.trim() || !roomCode.trim()}
              className="w-full py-3 rounded-xl bg-gray-800 border border-gray-600 font-bold text-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Join Room
            </button>
          </div>
        </div>

        <div className="text-center mt-10 text-gray-400 text-xs">
          End-to-end encrypted • Powered by ZEGOCLOUD
        </div>
      </div>
    </div>
  );
}
