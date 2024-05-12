import { AxiosInstance } from "../api/axiosInstance/axiosInstance";
import {getSanctumToken} from "../api/handleToken/handleToken";

export async function adminLogin(data){
    return await AxiosInstance.post('login-admin',
        JSON.stringify(data)
    ).then((res) => {
        // add logic to validate response.status === 200
        return res.data;
    }).catch((e) => {
        if(e.response?.data.errors){
            return { 'error': e.response?.data.errors }
        }
        return e;
    });
}
export async function logoutSession(){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await AxiosInstance.post('logout')
        .then((res) => {
            return res.data;
        }).catch((e) => {
            return e;
        })
}