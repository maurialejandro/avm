import {enqueueSnackbar} from "notistack";

export const  handleErrorServer  = async (res) =>  {
    if(res.code === "ERR_BAD_RESPONSE"){
        console.log("PASO")
        enqueueSnackbar('Error en el servidor... Contactarse con el equipo TI', {
            variant: "error",
        });
        return;
    }
    if(res.code === 'ERR_BAD_REQUEST'){
        enqueueSnackbar('Error en el servidor... Contactece con el equipo TI.', {
            variant: 'error',
        })
        return;
    }
    if(res.code === "ERR_NETWORK"){
        enqueueSnackbar('Error de conexión con el servidor', {
            variant: "error"
        });
        return;
    }
}