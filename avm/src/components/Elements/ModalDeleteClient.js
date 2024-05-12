import * as React from 'react';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import {EditClientForm} from "../Forms/EditClientForm";

export function ModalDeleteClient(props) {
    const { openDelete, setOpenDelete } = props;
    return (
        <>
            <MDBModal open={openDelete} onClose={() => setOpenDelete(!openDelete)} tabIndex='2'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Desea eliminar el cliente NAME</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <button className="btn btn-primary" >
                                Eiminar
                            </button>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <button onClick={() => setOpenDelete(!openDelete)} className="btn btn-primary" >
                                Cerrar
                            </button>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}