import store from './Store.ts';

class WebSocketService {
  private static instance: WebSocketService | null = null;
  private socket: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private connectionPromise: Promise<void> | null = null;
  private connectionResolver: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (this.instance === null) {
      this.instance = new WebSocketService();
    }
    return this.instance;
  }

  public openConnection(chatID: number, token: string) {
    console.log('Attempting to open connection...');
    this.closeConnection();

    const userID = store.getState().user?.id;
    if (userID == null) {
      console.error('User ID is missing, cannot establish WebSocket connection.');
      return;
    }

    const base = 'wss://ya-praktikum.tech/ws/chats';
    console.log(`Connecting to WebSocket at ${base}/${userID}/${chatID}/${token}`);
    this.socket = new WebSocket(`${base}/${userID}/${chatID}/${token}`);

    this.connectionPromise = new Promise((resolve) => {
      this.connectionResolver = resolve;
    });

    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('message', this.handleMessage);
    this.socket.addEventListener('close', this.handleClose);
    this.socket.addEventListener('error', this.handleError);
  }

  private handleOpen = () => {
    console.log('Соединение установлено');
    this.setupPing();
    if (this.connectionResolver) {
      console.log('Resolving connection promise');
      this.connectionResolver();
      this.connectionResolver = null;
    }
  };

  private handleMessage = (event: MessageEvent) => {
    console.log('Получены данные', event.data);
    const data = JSON.parse(event.data);
    if (Array.isArray(data)) {
      console.log('old messages', data);
      store.setMessages(data);
    } else {
      console.log('New message', data);
    }
  };

  private handleClose = (event: CloseEvent) => {
    console.log('Соединение закрыто', `Код: ${event.code} Причина: ${event.reason}`);
    this.cleanup();
  };

  private handleError = (event: ErrorEvent) => {
    console.error('WebSocket error:', event.message);
  };

  private setupPing() {
    this.cleanupPing();
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        console.log('Sending ping to server');
        this.socket.send('ping');
      } else {
        console.warn('Socket is not open, cannot send ping');
      }
    }, 60000);
  }

  public sendMessage(content: string, type: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('Sending message', { content, type });
      this.socket.send(JSON.stringify({ content, type }));
    } else {
      console.warn('WebSocket is not open. Message not sent.');
    }
  }

  public async getOldMessages() {
    if (this.connectionPromise) {
      console.log('Awaiting connection promise before fetching old messages');
      await this.connectionPromise;
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('Fetching old messages');
      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    } else {
      console.warn('WebSocket is not open. Unable to fetch old messages.');
    }
  }

  public closeConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (this.socket) {
            console.log('Closing WebSocket connection');
            this.socket.addEventListener('close', () => {
                this.cleanup();
                resolve();
            }, { once: true });
            this.socket.close();
            this.socket = null;
        } else {
            console.warn('No WebSocket connection to close');
            resolve();
        }
        this.connectionPromise = null;
        this.connectionResolver = null;
    });
}


  private cleanup() {
    console.log('Cleaning up WebSocketService');
    this.cleanupPing();
    this.socket = null;
    this.connectionPromise = null;
    this.connectionResolver = null;
  }

  private cleanupPing() {
    if (this.pingInterval) {
      console.log('Clearing ping interval');
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }
}

const wsService = WebSocketService.getInstance();

export default wsService;
