import * as React from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import {EditClientForm} from "../Forms/EditClientForm";

export function ModalFormEditClient(props) {
    const { open, setOpen, userClient, setUserClient } = props;
    return (
        <>
            <MDBModal open={open} onClose={() => setOpen(!open)} tabIndex='2'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Editar Cliente</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <EditClientForm
                                userClient={userClient}
                                setUserClient={setUserClient}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button onClick={() => setOpen(!open)} className="btn btn-primary" >
                                Cerrar
                            </button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}