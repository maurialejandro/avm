import {getSanctumToken, getToken} from "../api/handleToken/handleToken";
import {AxiosInstanceFile} from "../api/axiosInstance/axiosInstance";

export async function uploadFile(data) {
    let token = await getSanctumToken();
    AxiosInstanceFile.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await AxiosInstanceFile.post('store-file', data).then((response) => {
        return response.data;
    }).catch((e) => {
        console.log(e);
        if(e.response?.data.errors){
            return {'error': e.response.data.errors }
        }
        return e;
    })
}