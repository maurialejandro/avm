import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {deleteToken, getDecodeToken} from "../api/handleToken/handleToken";

export const VerifySupervisor = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        (async() => {
            const decode = await getDecodeToken();
            if(decode === 'error-decode-token'){
                await deleteToken();
                navigate('/')
            }
            if(!decode){
                navigate('/');
                await deleteToken();
            }
            if(decode.type !== 'administrator_supervisor'){
                navigate('/');
                await deleteToken();
            }
        })()
    }, [navigate]);

    return <> {children} </>
}