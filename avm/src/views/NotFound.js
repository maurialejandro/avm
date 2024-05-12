import React from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
export default function NotFound(){
    const navigate = useNavigate();

    return(
        <div className="container">
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

            <div className="d-flex align-items-center justify-content-center">
                <h2 className="text-center">Ups... Página no encontrada</h2>
                <Button
                    variant="outlined"
                    style={{marginLeft: '10px'}}
                    onClick={() => { navigate('/') }}
                >
                    Ir a iniciar sesión
                </Button>
            </div>
        </div>
    )
}