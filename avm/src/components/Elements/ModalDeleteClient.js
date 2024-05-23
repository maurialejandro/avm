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
import { useSnackbar } from 'notistack';

export function ModalDeleteClient(props) {
    const { openDelete, setOpenDelete, userClient, refresh, setRefresh } = props;
    const [ isLoading, setIsLoading ] = React.useState();
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = async (id) => {
        const res = await deleteClient(id);
        if(res.code === "ERR_BAD_RESPONSE"){
            enqueueSnackbar('Error en el servidor... Contactarse con el equipo TI', {
                variant: "error",
            });
            await setIsLoading(false);
            return;
        }
        if(res.code === 'ERR_BAD_REQUEST'){
            enqueueSnackbar('Error en el servidor... Contactese con el equipo TI.', {
                variant: 'error',
            })
            setIsLoading(false)
            return;
        }
        if(res.code === "ERR_NETWORK"){
            enqueueSnackbar('Error de conexión con el servidor', {
                variant: "error",
            })
            setIsLoading(false);
            return;
        }
        if(res.success === true){
            enqueueSnackbar('Cliente eliminado satisfactoriamente',{
                variant: 'success'
            });
        }
        if(res.success === false){ 
            enqueueSnackbar('Error al eliminar cliente', {
                variant: 'error'
            });
        }
        setOpenDelete(!openDelete);
        setRefresh(!refresh);
        setIsLoading(false);
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
                            {isLoading &&
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }} ></span>}
        
                                Eliminar
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