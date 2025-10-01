'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { chatService } from '@/lib/signalr';
import { errorToast } from '@/lib/utils';

interface Message {
  displayName: string;
  text: string;
  utc: string;
}
interface UserInfo {
  displayName: string;
  isHost: boolean;
}
interface ChatRoomProps {
  passcode: string;
  me: UserInfo;
  onLeave?: () => void;
}

export default function ChatRoom({ passcode, me, onLeave }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);
  const [hostName, setHostName] = useState<string>(me.isHost ? me.displayName : '');

  // live refs to avoid stale closures
  const meRef = useRef(me);
  const passcodeRef = useRef(passcode);
  const loadedPresenceRef = useRef(false);
  const joinedRef = useRef(false); // <-- NEW: prevent double joins

  useEffect(() => { meRef.current = me; }, [me]);
  useEffect(() => { passcodeRef.current = passcode; }, [passcode]);

  // reset only when room changes
  useEffect(() => {
    setMessages([]);
    setNewMessage('');
    setParticipants([]);
    loadedPresenceRef.current = false;
    joinedRef.current = false; // reset join state when switching rooms
    setHostName(me.isHost ? me.displayName : '');
  }, [passcode, me.isHost, me.displayName]);

  const isHostUser = useCallback((u: string) => u === hostName, [hostName]);
  const getUsernameColor = useCallback(
    (u: string) => (isHostUser(u) ? 'text-[#00ffff]' : 'text-[#ffff00]'),
    [isHostUser]
  );

  // --- helpers ---
  const dedupeNames = (list: string[] | undefined): string[] => {
    if (!list || list.length === 0) return [];
    // normalize: trim + case-insensitive uniqueness
    const seen = new Set<string>();
    const out: string[] = [];
    for (const raw of list) {
      const trimmed = (raw ?? '').trim();
      const key = trimmed.toLowerCase();
      if (trimmed && !seen.has(key)) {
        seen.add(key);
        out.push(trimmed);
      }
    }
    return out;
  };

  useEffect(() => {
    let cancelled = false;

    const ensureConnectedAndJoined = async () => {
      await chatService.start?.();

      // register handlers BEFORE join
      const offReceive = chatService.onReceiveMessage((data: Message) => {
        if (cancelled) return;
        setMessages(prev => [...prev, data]);
      });

      const applyPresence = (p: { participants: string[]; hostName?: string }) => {
        if (cancelled) return;
        const clean = dedupeNames(p.participants);
        setParticipants(clean);

        // authoritative host
        if (meRef.current.isHost) {
          setHostName(meRef.current.displayName);
        } else if (p.hostName) {
          setHostName(p.hostName);
        } else if (!hostName && clean.length) {
          setHostName(clean[0]);
        }

        if ((clean && clean.length > 0) || p.hostName) {
          loadedPresenceRef.current = true;
        }
      };

      const offPresence = chatService.onPresenceList(applyPresence);

      const offJoined = chatService.onUserJoined((data: { participants: string[] }) => {
        if (cancelled) return;
        setParticipants(dedupeNames(data.participants));
      });

      const offLeft = chatService.onUserLeft((data: { participants: string[] }) => {
        if (cancelled) return;
        setParticipants(dedupeNames(data.participants));
      });

      const offRoomClosed = chatService.onRoomClosed(() => {
        if (cancelled) return;
        errorToast('host has ended session');
        if (onLeave) {
          onLeave();
        } else {
          window.location.href = '/projects/null-room';
        }
      });

      // JOIN only once per connection
      if (!joinedRef.current) {
        await chatService.joinRoom(passcodeRef.current, meRef.current.displayName);
        joinedRef.current = true;
      }

      // request presence after join
      await chatService.requestPresence(passcodeRef.current);

      // Re-join + re-request on real reconnection
      const offReconnected = chatService.onReconnected?.(async () => {
        if (cancelled) return;
        joinedRef.current = false; // allow rejoin on reconnection
        try {
          if (!joinedRef.current) {
            await chatService.joinRoom(passcodeRef.current, meRef.current.displayName);
            joinedRef.current = true;
          }
        } finally {
          loadedPresenceRef.current = false;
          await chatService.requestPresence(passcodeRef.current);
        }
      });

      // small resilience: retry presence until we get a non-empty snapshot
      let tries = 0;
      const maxTries = 8;
      const interval = setInterval(async () => {
        if (cancelled || loadedPresenceRef.current) {
          clearInterval(interval);
          return;
        }
        tries++;
        try {
          await chatService.requestPresence(passcodeRef.current);
        } catch {}
        if (tries >= maxTries) clearInterval(interval);
      }, 300);

      // cleanup
      return () => {
        cancelled = true;
        clearInterval(interval);
        offReceive?.();
        offPresence?.();
        offJoined?.();
        offLeft?.();
        offRoomClosed?.();
        offReconnected?.();
      };
    };

    ensureConnectedAndJoined();
    return () => { cancelled = true; };
  }, [passcode, onLeave, hostName]);

  const sendMessage = async () => {
    const text = newMessage.trim();
    if (!text) return;
    try {
      await chatService.sendMessage(passcode, text);
      setNewMessage('');
    } catch (e) {
      console.error('Failed to send message:', e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  const endSession = async () => {
    try {
      await chatService.endRoom(passcode);
    } catch (e) {
      console.error('Failed to end session:', e);
      if (e instanceof Error) {
        if (e.message.includes('only host can end session')) {
          errorToast('ERROR: only host can end session');
        } else if (e.message.includes('room not found')) {
          errorToast('ERROR: room not found or DNE');
        } else {
          errorToast('ERROR: failed to end session')
        }
      }
    }
  };

  return (
    <div className="bg-[#000000] border border-[#ff00ff] flex flex-col h-96 rounded-lg shadow-md">
      {/* Header */}
      <div className="p-2 border-b border-[#ff00ff]">
        <h3 className="text-[#ff00ff] text-[16px] font-bold">room #{passcode}</h3>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-[12px] text-[#00ffff]">
            host: {me.isHost ? me.displayName : (hostName || 'unknown')}
          </span>
          {me.isHost && (
            <button
              onClick={endSession}
              className="bg-[#ff0000] text-[#000000] text-[12px] rounded hover:cursor-pointer px-2 py-0.5"
            >
              end session
            </button>
          )}
        </div>

        <p className="text-[12px] text-[#ffff00]">
          users: {participants.length ? participants.join(', ') : 'loading...'}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-2 overflow-y-auto scrollbar-magenta">
        {messages.map((msg, i) => (
          <div key={i} className="mb-1">
            <span className={`text-[16px] ${getUsernameColor(msg.displayName)}`}>
              {msg.displayName}:
            </span>
            <span className="text-[16px] ml-1">{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-[#ff00ff] flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a message..."
          className="border border-[#ff00ff] text-[#ff00ff] focus:outline-none flex-1 rounded p-1"
        />
        <button onClick={sendMessage} className="bg-[#ff00ff] text-[#000000] rounded hover:cursor-pointer p-1">
          send
        </button>
      </div>
    </div>
  );
}
