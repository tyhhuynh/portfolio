'use client';

import { useState, useEffect } from 'react';
import { chatService } from '@/lib/signalr';
import CreateRoom from '@/app/components/createRoom';
import JoinRoom from '@/app/components/joinRoom';
import ChatRoom from '@/app/components/chatRoom';
import { Toaster } from 'sonner';

export default function ChatPage() {
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [progress, setProgress] = useState(12);
  const [me, setMe] = useState<{ displayName: string; isHost: boolean } | null>(null);

  
  useEffect(() => {
    if (isConnected) return;
    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.max(1, Math.round((90 - p) * 0.06)) : p));
    }, 150);
    return () => clearInterval(interval);
  }, [isConnected]);

  useEffect(() => {
    const connect = async () => {
      try {
        await chatService.connect();
        setIsConnected(true);
        setProgress(100);
      } catch (error) {
        console.error('failed to connect:', error);
      }
    };

    connect();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" />
      <div className="w-[1000px] h-[800px] bg-black text-white overflow-auto p-4">
        <h1 className="font-bold text-center text-[32px]">Welcome to Null-Room</h1>
          <h2 className="text-center text-[20px] p-2">a lightweight real-time chatroom project where conversations vanish</h2>
            <h3 className="text-center text-[20px] pb-2">host or join a room to start chatting</h3>
        <div className="grid md:grid-cols-2 gap-2">
          <CreateRoom onCreated={(code, meInfo) => { setCurrentRoom(code); setMe(meInfo); }} />
          <JoinRoom onJoined={(code, meInfo) => { setCurrentRoom(code); setMe(meInfo); }} />
        </div>

        {!isConnected ? (
          <div className="mt-6">
            <div className="w-full h-4 rounded bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-[#00ff00] transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[20px] text-[#00ff00] text-center mt-2">waking the backend…</p>
          </div>
        ) : currentRoom && me ? (
          <div className="mt-2">
            <ChatRoom passcode={currentRoom} me={me} onLeave={() => setCurrentRoom(null)} />
          </div>
        ) : null}
      </div>
    </div>
  );
}