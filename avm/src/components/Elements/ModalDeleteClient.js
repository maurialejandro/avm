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
import { deleteClient } from '../../services/client';

export function ModalDeleteClient(props) {
    const { openDelete, setOpenDelete, userClient } = props;
    const handleDelete = async (id) => {
        console.log(id)
        const res = await deleteClient(id);
        console.log(res);
    }
    return (
        <>
            <MDBModal open={openDelete} onClose={() => setOpenDelete(!openDelete)} tabIndex='2'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Desea eliminar el cliente { userClient.name }</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <button className="btn btn-primary" onClick={() => { handleDelete(userClient.id) }} >
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