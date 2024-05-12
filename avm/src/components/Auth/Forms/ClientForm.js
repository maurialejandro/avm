import React from 'react';
import { useForm } from 'react-hook-form';
import "../../styles/FormStyles.css";
import {clientLogin} from "../../../services/authClient";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {jwtDecode} from "jwt-decode";
import {saveToken} from "../../../api/handleToken/handleToken";
import {useUserLoginContext} from "../../../context/AuthContext";

export function ClientForm(props){
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ errorRut, setErrorRut ] = React.useState(null);
    const [ errorCode, setErrorCode ] = React.useState(null);
    const navigate = useNavigate();
    const login = useUserLoginContext();
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            rut: "",
            accessCode: ""
        }
    })
    const onSubmit = async (data) => {
        setIsLoading(true);
        const res = await clientLogin(data);
        console.log(res);
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
            });
            setErrorRut('Error en las credenciales');
            setIsLoading(false);
            return;
        }
        if(res.error?.rut){
            setErrorRut(res.error.rut[0])
        }
        if(res.error?.accessCode){
            setErrorCode(res.error.accessCode)
        }
        if(res.success === true){
            const decoded = jwtDecode((res.access_token));
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
            navigate('/client-appreciation')
        }
        setIsLoading(false);
    }
    const clearErrorRut = () => {
        setErrorRut(null)
    }
    const clearErrorAccessCode = () => {
        setErrorCode(null)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                onClick={() => clearErrorRut()}
                className="input-form-login"
                placeholder="77333222-1"
                {...register("rut", {required: "Rut es requerido"})}
                aria-invalid={errors.rut ? "true" : "false"}
            />
            {errors.rut && <p className="error-messages" role="alert">{errors.rut.message}</p>}
            {errorRut && <p className="error-messages" role="alert">{errorRut}</p>}
            <input
                onClick={() => clearErrorAccessCode()}
                className="input-form-login"
                type="password"
                placeholder="Codigo acceso"
                {...register("accessCode", {required: "Codigo acceso es requerido"})}
                aria-invalid={errors.accessCode ? "true" : "false"}
            />
            {errors.accessCode && <p className="error-messages" role="alert">{errors.accessCode.message}</p>}
            {errorCode && <p className="error-messages" role="alert">{errorCode}</p>}
            <button className='btn-login' type="submit">
                {isLoading &&
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }} ></span>}
                Ingresar
            </button>
            <div className="txt-footer">
                <hr style={{ backgroundColor: '#bcbbbb' }} />
                © 2024 Valuaciones de Chile. Todos los Derechos Reservados
            </div>
        </form>
    )
}