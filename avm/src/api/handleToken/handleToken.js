import { jwtDecode } from "jwt-decode";

export async function saveToken(token){
    await sessionStorage.setItem("token", token);
}

export async function getToken(){
    return sessionStorage.getItem("token");
}

export async function getSanctumToken(){
    try {
        let token = await getToken();
        let decode = await jwtDecode(token);
        return decode.sanctumToken;
    } catch (e) {
        return 'error-decode-token';
    }
}

export async function getDecodeToken(){

    try{
        let token = await getToken();
        return await jwtDecode(token);
    } catch(e) {
        return 'error-decode-token';
    }
}

export async function deleteToken(){
    await sessionStorage.removeItem("token");
}