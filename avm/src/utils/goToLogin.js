import {useNavigate} from "react-router-dom";

export function useGoToLogin(){
    const navigation = useNavigate();
    navigation('Login');
}