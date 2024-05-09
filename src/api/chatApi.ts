import HTTPTransport from '../core/httpTransport.ts';
import baseURL from './apiBaseURL.ts';

const base = baseURL;
const chatAPIinstance = new HTTPTransport();

export class ChatAPI {
    static newChat(data: Record<string, unknown>){
        return chatAPIinstance.post(`${base}/chats`, {data})
    }
    static allChatsData(){
        return chatAPIinstance.get(`${base}/chats`)
    }
}