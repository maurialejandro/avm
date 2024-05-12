import {getToken} from "../api/handleToken/handleToken";
import {AxiosInstance} from "../api/axiosInstance/axiosInstance";


export async function getTypeAssets (){
    let token = await getToken();
    AxiosInstance.defaults.headers.common['X-Auth-Token'] = token;
    return AxiosInstance.get('get-type-assets').then((response) => {
        return response.data;
    }).catch((e) => {
        console.log(e);
        if(e.response?.data.errors){
            return { 'error': e.response.data.errors }
        }
        return e;
    })
}