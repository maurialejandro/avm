import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {deleteToken, getDecodeToken} from "../api/handleToken/handleToken";

export const VerifyClient = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            console.log('HERE')
            const decode = await getDecodeToken();
            if(decode === 'error-decode-token'){
                await deleteToken();
                navigate('/');
            }
            if(!decode){
                await deleteToken();
                navigate('/');
            }
            if(decode.type !== 'client') {
                await deleteToken();
                navigate('/');
            }
        })()
    }, [navigate]);
    return <> {children} </>
}