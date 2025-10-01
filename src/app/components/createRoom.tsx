'use client';
import { useState } from 'react';
import { chatService } from '@/lib/signalr';

export default function CreateRoom({ 
  onCreated, 
}: { onCreated?: (code: string, me: { displayName: string; isHost: boolean }) => void }) {
  const [displayName, setDisplayName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    setIsCreating(true);
    try {
      const result = await chatService.createRoom(displayName);
      setPasscode(result.roomCode);
      onCreated?.(result.roomCode, { displayName: result.hostName, isHost: true });
    } catch (error) {
      console.error('failed to create room:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-[#000000] border border-[#00ffff] rounded-lg shadow-md p-4">
      <h2 className="text-[20px] font-bold pb-2">host a chatroom</h2>
      <input
        type="text"
        placeholder="enter display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full text-[#00ffff] border border-[#00ffff] focus:outline-none rounded mb-4 p-2"
      />
      <button
        onClick={handleCreateRoom}
        disabled={isCreating}
        className="w-full bg-[#00ffff] text-[#000000] text-[16px] rounded hover:cursor-pointer p-2"
      >
        {isCreating ? 'creating...' : 'create room'}
      </button>
      {passcode && (
        <div className="bg-[#000000] mt-2">
          <p className="text-[20px] font-bold">room code: {passcode}</p>
          <p className="text-[14px] text-[#00ffff]">share this code with others to join!</p>
        </div>
      )}
    </div>
  );
}