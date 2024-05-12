import { AxiosInstance } from "../api/axiosInstance/axiosInstance";
import {getSanctumToken, getToken} from "../api/handleToken/handleToken";

export async function getAppreciation(){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return AxiosInstance.get("appreciations").then((response) => {
        return response.data;
    }).catch( (e) => {
        console.log(e);
        return e;
    })
}

export async function getAppreciationByClient(){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return AxiosInstance.get("appreciations-client").then((response) => {
        return response.data;
    }).catch( (e) => {
        console.log(e);
        return e;
    })
}

export async function storeAppreciation(data){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return AxiosInstance.post('create-appreciation',
        JSON.stringify({
            data: data
        })
    ).then((res) => {
        return res.data
    }).catch((e) => {
        console.log(e);
        if(e.response?.data.errors){
            return { 'error': e.response.data.errors }
        }
        return e;
    })
}
