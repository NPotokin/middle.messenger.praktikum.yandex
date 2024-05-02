import baseURL from "./apiBaseURL.ts";
import HTTPTransport from "../httpTransport/httpTransport.ts";
// import { BaseAPI } from "./baseAPI.ts";



const loginAPIinstance = new HTTPTransport()
const base = baseURL;

export class loginAPI {
    create(data:{}) {
        return loginAPIinstance.post(`${base}/auth/sighin`, data)
    }
}