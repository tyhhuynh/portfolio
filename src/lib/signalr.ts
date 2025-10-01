import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

interface JoinResult {
  success: boolean;
  isOwner: boolean;
  normalizedDisplayName: string;
}

interface UserEvent {
  displayName?: string;
  participants: string[];
}

interface CreateRoomResult {
  roomCode: string;
  hostName: string;
}

class ChatService {
  private connection: HubConnection | null = null;

  async start() {
    await this.connect();
  }

  onReconnected(callback: () => Promise<void>) {
    if (!this.connection) return () => {};
    
    this.connection.onreconnected(callback);
    return () => this.connection?.off('reconnected', callback);
  }

  async connect() {
    const baseUrl = process.env.NEXT_PUBLIC_NULLROOM_URL || 'https://null-room.onrender.com';
    this.connection = new HubConnectionBuilder()
      .withUrl(`${baseUrl}/hubs/chat`)
      .withAutomaticReconnect() // Add automatic reconnection
      .build();
    
    await this.connection.start();
  }

  // Helper method to ensure connection is ready
  private async ensureConnected(): Promise<void> {
    if (!this.connection) {
      throw new Error('Not connected');
    }

    // If disconnected, try to reconnect
    if (this.connection.state === HubConnectionState.Disconnected) {
      await this.connection.start();
    }

    // Wait for connection to be ready (with timeout)
    if (this.connection.state === HubConnectionState.Connecting || 
        this.connection.state === HubConnectionState.Reconnecting) {
      
      // Wait up to 5 seconds for connection to be ready
      const maxWaitTime = 5000;
      const startTime = Date.now();
      
      while ((this.connection.state === HubConnectionState.Connecting || 
              this.connection.state === HubConnectionState.Reconnecting) &&
             (Date.now() - startTime) < maxWaitTime) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // If still not connected after waiting, throw error
    if (this.connection.state !== HubConnectionState.Connected) {
      throw new Error(`Connection not ready. State: ${this.connection.state}`);
    }
  }
  
  async createRoom(displayName?: string): Promise<CreateRoomResult> {
    await this.ensureConnected();
    return await this.connection!.invoke('CreateRoom', displayName);
  }
  
  async joinRoom(passcode: string, displayName: string): Promise<JoinResult> {
    await this.ensureConnected();
    return await this.connection!.invoke('JoinRoom', passcode, displayName);
  }

  async endRoom(passcode: string) {
    await this.ensureConnected();
    await this.connection!.invoke('EndRoom', passcode);
  }

  onPresenceList(callback: (data: { participants: string[] }) => void) {
    this.connection?.on('PresenceList', callback);
    return () => this.connection?.off('PresenceList', callback);
  }

  async requestPresence(passcode: string) {
    await this.ensureConnected();
    await this.connection!.invoke('Heartbeat', passcode);
  }

  onRoomClosed(callback: () => void) {
    this.connection?.on('RoomClosed', callback);
    return () => this.connection?.off('RoomClosed', callback);
  }
  
  async sendMessage(passcode: string, text: string) {
    await this.ensureConnected();
    await this.connection!.invoke('SendMessage', passcode, text);
  }
  
  onReceiveMessage(callback: (data: any) => void) {
    this.connection?.on('ReceiveMessage', callback);
    return () => this.connection?.off('ReceiveMessage', callback);
  }
  
  onUserJoined(callback: (data: UserEvent) => void) {
    this.connection?.on('UserJoined', callback);
    return () => this.connection?.off('UserJoined', callback);
  }
  
  onUserLeft(callback: (data: UserEvent) => void) {
    this.connection?.on('UserLeft', callback);
    return () => this.connection?.off('UserLeft', callback);
  }
}

export const chatService = new ChatService();