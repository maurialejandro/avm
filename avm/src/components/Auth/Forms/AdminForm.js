import React from 'react';
import { useForm } from "react-hook-form";
import "../../styles/FormStyles.css";
import { adminLogin } from "../../../services/authAdmins";
import { saveToken } from "../../../api/handleToken/handleToken";
import { useNavigate } from "react-router-dom";
import { useUserLoginContext } from "../../../context/AuthContext";
import {jwtDecode} from "jwt-decode";
import {useSnackbar} from 'notistack';

export function AdminForm(){
    const [ errorEmail, setErrorEmail ] = React.useState(null);
    const [ errorPassword, setErrorPassword ] = React.useState(null);
    const [ isLoading, setIsLoading ] = React.useState(false);
    let navigate = useNavigate();
    const login = useUserLoginContext();
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors} } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const onSubmit = async (data) => {
        await setIsLoading(true);
        const res = await adminLogin(data);
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
        if(res.success === false){
            enqueueSnackbar('Error En las credenciales', {
                variant: "error",
            })
            setErrorEmail('Error en las credenciales');
            setIsLoading(false);
            return;
        }
        if(res.error?.email){
            setErrorEmail(res.error.email[0]);
        }
        if(res.error?.password){
            setErrorPassword(res.error.password[0]);
        }
        if(res.success === true){
            const decoded = jwtDecode(res.access_token);
            const dataSession = {
                access_token: res.access_token,
                name: decoded.name,
                email: decoded.email,
                sanctumToken: decoded.sanctumToken,
                type: decoded.type
            }
            await saveToken(res.access_token);
            await login(dataSession);
            enqueueSnackbar('Iniciaste sesión satisfactoriamente', {
                variant: "success",
            });
            if(decoded.type === 'administrator_supervisor'){
                navigate('/supervisor-appreciations')
            }
            if(decoded.type === 'administrator_coordinator'){
                navigate('/appreciations');
            }
        }
        setIsLoading(false);
    }
    const clearErrorsEmail = () => {
        setErrorEmail(null);
    }
    const clearErrorPassword = () => {
        setErrorPassword(null);
    }
    return (
        // Eliminar para pantalla de celulares el nombre VALUACIONES DE LA BARRA
        // Agregar validacion del menu de la navbar cliente para los dispositivos moviles
        // nombre y buttons derecha de la navbar
        // cuando se busca nada devuelve informacion de admin
        //
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                onClick={() => clearErrorsEmail()}
                className="input-form-login"
                placeholder="Correo electronico"
                {...register("email", {required: "Correo electronico es requerido"})}
                aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && <p className="error-messages" role="alert">{errors.email.message}</p>}
            {errorEmail && <p className="error-messages" role="alert">{errorEmail}</p>}
            <input
                onClick={() => clearErrorPassword()}
                className="input-form-login"
                type="password"
                placeholder="Contrasena"
                {...register("password", {required: "Contrasena es requerida"})}
                aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className="error-messages" role="alert">{errors.password.message}</p>}
            {errorPassword && <p className="error-messages" role="alert">{errorPassword}</p>}
            <button className='btn-login' type="submit">
                {isLoading &&
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }} ></span>}
                Ingresar
            </button>
            <div className="txt-footer">
                <hr style={{backgroundColor: '#bcbbbb'}}/>
                © 2024 Valuaciones de Chile. Todos los Derechos Reservados
            </div>
        </form>
    )
}