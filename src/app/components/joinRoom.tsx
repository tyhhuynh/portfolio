'use client';
import { useState } from 'react';
import { chatService } from '@/lib/signalr';

export default function JoinRoom({ 
  onJoined,
}: { onJoined?: (code: string, me: { displayName: string, isHost: boolean }) => void }) {
  const [passcode, setPasscode] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');

  const handleJoinRoom = async () => {
    setIsJoining(true);
    setError('');
    try {
      const result = await chatService.joinRoom(passcode, displayName);
      if (result.success) {
        onJoined?.(passcode, { 
          displayName: result.normalizedDisplayName, 
          isHost: result.isOwner 
        });
      }
    } catch (error: any) {
      console.error('Failed to join room:', error);
      // Check if it's a "room not found" error
      if (error.message?.includes('Room not found') || error.message?.includes('not found')) {
        setError('room does not exist');
      } else {
        setError('failed to join room');
      }
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="bg-[#000000] border border-[#ffff00] rounded-lg shadow-md pt-4 pr-4 pl-4 pb-2">
      <h2 className="text-[20px] font-bold pb-2">join a chatroom</h2>
      <input
        type="text"
        placeholder="room code (8 digits)"
        value={passcode}
        onChange={(e) => setPasscode(e.target.value)}
        className="w-full text-[#ffff00] border border-[#ffff00] focus:outline-none rounded mb-4 p-2"
      />
      <input
        type="text"
        placeholder="enter display name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="w-full text-[#ffff00] border border-[#ffff00] focus:outline-none rounded mb-4 p-2"
      />
      <button
        onClick={handleJoinRoom}
        disabled={isJoining}
        className="w-full bg-[#ffff00] text-[#000000] text-[16px] rounded hover:cursor-pointer p-2"
      >
        {isJoining ? 'joining...' : 'join room'}
      </button>
      {error && (
        <div className="text-[#ff0000] text-[12px] pt-2">{error}</div>
      )}
    </div>
  );
}