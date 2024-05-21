import React, {useEffect} from 'react';
import NavBar from "../../../components/NavBar/NavBar";
import {Container} from "@mui/system";
import {CreateAppreciationForm} from "../../../components/Forms/CreateAppreciationForm";
import {Footer} from "../../../components/Elements/Footer";

export function CreateValoration() {
    return(
        <>
            <NavBar/>
            <Container>
                <br/>
                <br/>
                <div className="d-flex flex-row align-items-center">
                    <h3 className="p-2"> Ingresar Datos del Bien </h3>
                </div>
                <hr style={{background: '#e0e0e0', width: '300px', position: 'absolute'}}/>
                <br/>
                <br/>
                <CreateAppreciationForm/>
            </Container>
            <br/>
            <br/>
            <Footer/>
        </>
    )
}