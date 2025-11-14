import { useState } from "react";

export default function HomeUI({ navigateFn }) {
  const [createName, setCreateName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [roomCode, setRoomCode] = useState("");

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
    const newRoom = Math.random().toString(36).substring(2, 8).toUpperCase();
    goTo(`/room?roomID=${newRoom}&userName=${encodeURIComponent(createName)}`);
  };

  const handleJoinRoom = () => {
    if (!joinName.trim() || !roomCode.trim()) return;
    goTo(`/room?roomID=${roomCode}&userName=${encodeURIComponent(joinName)}`);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-900 via-gray-800 to-black text-white flex justify-center items-center p-4">
      <div className="w-full max-w-5xl bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-700 space-y-10">

        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-md">
            🎥 Talk Buddy
          </h1>
          <p className="text-gray-300 mt-2">Fun meets Professional — Start a call instantly</p>
        </div>

        {/* SIDE-BY-SIDE CONTAINER */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* CREATE ROOM BLOCK */}
          <div className="flex-1 bg-gray-800/40 border border-gray-700 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white text-center mb-2">Create a New Room</h2>

            <div>
              <label className="block font-semibold text-gray-200 mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:ring-4 focus:ring-purple-500/40 focus:border-purple-500 outline-none"
                placeholder="Enter your name"
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
              />
            </div>

            <button
              onClick={handleCreateRoom}
              disabled={!createName.trim()}
              className="w-full py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 font-bold text-lg shadow-lg hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Create Room
            </button>
          </div>

          {/* JOIN ROOM BLOCK */}
          <div className="flex-1 bg-gray-800/40 border border-gray-700 rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold text-white text-center mb-2">Join an Existing Room</h2>

            <div>
              <label className="block font-semibold text-gray-200 mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 focus:ring-4 focus:ring-blue-500/40 focus:border-blue-500 outline-none"
                placeholder="Enter your name"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
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

        {/* Footer */}
        <div className="text-center mt-10 text-gray-400 text-xs">
          End-to-end encrypted • Powered by ZEGOCLOUD
        </div>
      </div>
    </div>
  );
}
