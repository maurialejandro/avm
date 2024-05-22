import {getSanctumToken} from "../api/handleToken/handleToken";
import {AxiosInstance} from "../api/axiosInstance/axiosInstance";
import {handleErrorServer} from "../api/handleErrorServer/handleErrorServer";

export async function getClients(){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return AxiosInstance.get("/clients").then((response) => {
        return response.data;
    }).catch((e) => {
        if(e.response?.data.errors){
            return { 'error': e.response.data.errors }
        }
        return e;
    })
}

export async function searchClient(rut){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return AxiosInstance.post('/search-client',
        JSON.stringify({
            rut: rut
        })
    ).then((response) => {
        return response.data;
    }).catch(async (e) => {

        if(e.response?.data.message){
            return { 'error': e.response.data.message }
        }
        return e;
    })
}

export async function getTypeOfAssets(){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return AxiosInstance.get("/asset").then((response) => {
        return response.data;
    }).catch((e) => {
        if(e.response?.data.errors){
            return { 'error': e.response.data.errors }
        }
        return e;
    });
}

export async function updateClient(data, id){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return AxiosInstance.patch(`update-client/${id}`, 
        JSON.stringify(data)
    ).then((response) => {
        return response.data;
    }).catch((e) => {
        if(e.response?.data.errors){
            return { 'error': e.response.data.errors }
        }
        return e;
    });
}

export async function deleteClient(id){
    let token = await getSanctumToken();
    AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return AxiosInstance.delete(`delete-client/${id}`).then((response) => {
        return response.data;
    }).catch((e) => {
        if(e.response?.data.errors){
            return { 'error': e.response.data.errors }
        }
        return e;
    })
}