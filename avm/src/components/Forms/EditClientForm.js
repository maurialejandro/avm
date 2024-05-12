import React from 'react';
import { useForm } from 'react-hook-form';
import "../../components/styles/FormStyles.css";

export function EditClientForm(props) {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            rut: '',
            email: '',
            phone: ''
        }
    })

    const onSubmit = async (data) => {
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} >
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
                Actualizar
            </button>
        </form>
    )
}