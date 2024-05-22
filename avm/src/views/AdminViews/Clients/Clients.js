import React from 'react';
import {TableClients} from "../../../components/Tables/TableClients";
import NavBar from "../../../components/NavBar/NavBar";
import "../../../components/styles/FormStyles.css";
import {Container} from "@mui/system";
import {Footer} from "../../../components/Elements/Footer";
import {ModalFormEditClient} from "../../../components/Elements/ModalFormEditClient";
import {ModalDeleteClient} from "../../../components/Elements/ModalDeleteClient";

export function Clients(){
    const [ open, setOpen ] = React.useState(false);
    const [ openDelete, setOpenDelete ] = React.useState(false);
    const [ userClient, setUserClient ] = React.useState({});

    return(
        <>
            <NavBar/>
                <Container>
                    <br/>
                    <br/>
                    <div className="d-flex flex-row align-items-center">
                        <h3 className="p-2"> Listado Clientes </h3>
                    </div>
                    <hr/>
                    <input className='input-search' placeholder='Buscar'/>
                    <TableClients
                        open={open} 
                        setOpen={setOpen} 
                        openDelete={openDelete} 
                        setOpenDelete={setOpenDelete} 
                        userClient={userClient}
                        setUserClient={setUserClient}
                    />
                    <ModalFormEditClient 
                        open={open} 
                        setOpen={setOpen}
                        userClient={userClient}
                        setUserClient={setUserClient} 
                    />
                    <ModalDeleteClient userClient={userClient} openDelete={openDelete} setOpenDelete={setOpenDelete} />
                </Container>
            <br/>
            <br/>
            <Footer/>
        </>
    )
}