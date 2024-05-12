import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteToken, getDecodeToken } from "../api/handleToken/handleToken";

export const VerifyAdmin = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const decode = await getDecodeToken();
            // add logout fetch back
            if(decode === 'error-decode-token'){
                await deleteToken();
                navigate('/');
            }
            if(!decode){
                navigate('/');
                await deleteToken();
            }
            if(decode.type !== 'administrator_coordinator'){
                navigate('/');
                await deleteToken();
            }
        })()
    }, [navigate]);

    return <> {children} </>;
}