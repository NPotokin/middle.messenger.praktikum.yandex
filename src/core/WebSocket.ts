import store from './Store.ts';

class WebSocketService {
  private static instance: WebSocketService | null = null;
  private socket: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (this.instance === null) {
      this.instance = new WebSocketService();
    }
    return this.instance;
  }

  public openConnection(chatID: number, token: string) {
    this.closeConnection();

    const userID = store.getState().user?.id;
    if (userID == null) {
      console.error('User ID is missing, cannot establish WebSocket connection.');
      return;
    }

    const base = 'wss://ya-praktikum.tech/ws/chats';
    this.socket = new WebSocket(`${base}/${userID}/${chatID}/${token}`);

    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('message', this.handleMessage);
    this.socket.addEventListener('close', this.handleClose);
    this.socket.addEventListener('error', this.handleError);
  }

  private handleOpen = () => {
    console.log('Соединение установлено');
    this.setupPing();
  };

  private handleMessage = (event: MessageEvent) => {
    console.log('Получены данные', event.data);
    const data = JSON.parse(event.data)
    if(Array.isArray(data)){
      store.setMessages(data)
      console.log('old messages', data)
    }
  };

  private handleClose = (event: CloseEvent) => {
    console.log('Соединение закрыто', `Код: ${event.code} Причина: ${event.reason}`);
    this.cleanup();
  };

  private handleError = (event: ErrorEvent) => {
    console.log('WebSocket error:', event.message);
  };

  private setupPing() {
    this.cleanupPing();
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send('ping');
      }
    }, 60000);
  }

  public sendMessage(content: string, type: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ content, type }));
    } else {
      console.log('WebSocket is not open. Message not sent.');
    }
  }

  public getOldMessages() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    } else {
      console.log('WebSocket is not open. Unable to fetch old messages.');
    }
  }

  public closeConnection() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  private cleanup() {
    this.cleanupPing();
    this.socket = null;
  }

  private cleanupPing() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}

const wsService = WebSocketService.getInstance();

export default wsService;

