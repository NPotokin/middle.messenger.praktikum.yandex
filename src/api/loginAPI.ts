import baseURL from "./apiBaseURL.ts";
import HTTPTransport from "../httpTransport/httpTransport.ts";
// import { BaseAPI } from "./baseAPI.ts";

interface loginAPIinterface{
    login: string,
    password: string
    data?: Record<string, unknown>
}

const loginAPIinstance = new HTTPTransport()
const base = baseURL;

export class loginAPI {
    create(data: loginAPIinterface) {
        return loginAPIinstance.post(`${base}/auth/sighin`, data)
    }
}