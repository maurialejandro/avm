import React from 'react';
import { useForm } from 'react-hook-form';
import "../../components/styles/FormStyles.css";
import { updateClient } from '../../services/client';
import { useSnackbar } from 'notistack';

export function EditClientForm(props) {
    const { userClient, setOpen, setRows, setRefresh, refresh } = props;
    const { enqueueSnackbar } = useSnackbar();
    const [ isLoading, setIsLoading ] = React.useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            name: userClient.name,
            rut: userClient.rut,
            email: userClient.email,
            phone: userClient.phone
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true);
        const res = await updateClient(data, userClient.id);
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
            await setIsLoading(false);
            return;
        }
        if(res.success === true){
            enqueueSnackbar('Cliente actualizado satisfactoriamente', {
                variant: 'success'
            });
            setRefresh(!refresh);
        }
        if(res.success === false){
            enqueueSnackbar('Error al actualizar cliente', {
                variant: 'error'
            });
        }
        setIsLoading(false);
        setOpen(false);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} >
            <input 
                className='form-control'
                placeholder='Nombre'
                { ...register("name", { required: "Nombre es requerido" }) }
                aira-invalid={errors.name ? true : false}
            />
            { errors.name && <p className='error-message-table' > { errors.name.message } </p> }
            <input
                className="form-control"
                placeholder="Rut"
                { ...register("rut", { required: "Rut es requerido"}) }
                aria-invalid={errors.rut ? true : false}
            />
            { errors.rut && <p className="error-messages-table">{errors.rut.message}</p> }
            <input
                className="form-control"
                placeholder="Correo electronico"
                { ...register("email", { required: "Correo electronico es requerido" }) }
                aria-invalid={errors.email ? "true" : "false"}
            />
            { errors.email && <p className="error-messages" role="alert">{errors.email.message}</p> }
            <input
                className="form-control"
                placeholder="Telefono"
                { ...register("phone", { required: "Telefono es requerido" }) }
                aria-invalid={errors.phone ? true : false}
            />
            { errors.phone && <p className="error-messages" role="alert">{errors.phone.message}</p> }
            <button className="btn btn-primary" type="submit">
            {isLoading &&
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }} ></span>}
                Actualizar
            </button>
        </form>
    )
}