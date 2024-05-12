import { AxiosInstance } from "../api/axiosInstance/axiosInstance";
import {getToken} from "../api/handleToken/handleToken";

export async function clientLogin(data) {
    return await AxiosInstance.post("login-client",
        JSON.stringify(data),
    ).then((res) => {
        return res.data
    }).catch((e) => {
        if(e.response?.data.errors){
            return { 'error': e.response?.data.errors }
        }
        return e;
    })
}