import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import {Container} from "@mui/system";
import {TableClientAppreciation} from "../../components/Tables/TableClientAppreciation";
import {Footer} from "../../components/Elements/Footer";

export function ClientAppreciation() {
    return (
        <>
            <NavBar/>
            <Container>
                <br/>
                <br/>
                <div className="d-flex flex-row mb-2 justify-content-between">
                    <h3 className='p-2'> Listado Valoraciones </h3>
                </div>
                <hr/>
                <TableClientAppreciation/>
            </Container>
            <br/>
            <br/>
            <Footer/>
        </>

    )
}