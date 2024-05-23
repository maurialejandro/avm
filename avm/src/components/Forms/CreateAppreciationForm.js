import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import '../../components/styles/FormStyles.css';
import { Map } from "../Elements/Map";
import { Button, Grid } from "@mui/material";
import Select from "react-select";
import { AutoCompleteInputMap } from "../Elements/AutoCompleteInputMap";
import { searchCommune } from "../../services/commune";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from "@mui/material/CircularProgress";
import { searchClient } from "../../services/client";
import {enqueueSnackbar} from "notistack";
import {storeAppreciation} from "../../services/appreciation";
import { useNavigate } from 'react-router-dom';

export function CreateAppreciationForm() {
    const [ coordinates, setCoordinates ] = React.useState({});
    const [ communeSearch, setCommuneSearch ] = React.useState(null);
    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ isDataRutSet, setIsDataRutSet ] = React.useState(true);
    const [ rutError, setRutError ] = React.useState('');
    const [ typeAssetError, setTypeAssetError ] = React.useState('');
    const [ addressError, setAddressError ] = React.useState('');
    const navigate = useNavigate();
    const options = [
        { value: 1, label: 'Casa' },
        { value: 2, label: 'Departamento' },
    ];

    useEffect(() => {
        (async () => {
            if(communeSearch){
                await getCommuneBack(communeSearch);
            }
        })()
    }, [communeSearch])
    const getCommuneBack = async (search) => {
        const res = await searchCommune(search.trim());
        if(res.success === true){
            setValue('commune', res.data?.name);
            setValue('region', res.data.region.name);
            setValue('communeId', res.data.id);
        }
    }

    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors } = useForm({
        defaultValues: {
            rut: "",
            name: "",
            email: "",
            phone: "",
            region: "",
            commune: "",
            communeId: "",
            latitude: "",
            longitude: "",
            typeOfAsset: "",
            addressMap: "",
            rolBlock: "",
            rolPlotOfLand: "",
            terrainArea: "",
            terrainConstruction: "",
            bedroom: "",
            bathroom: "",
            newClient: false,
        }
    })
    const onSubmit = async (data) => {
        setIsLoading(true);
        const res = await storeAppreciation(data);
        if(res.success === true){
            enqueueSnackbar(res.message, {
                variant: "success",
            });
        }
        if(res.success === false){
            enqueueSnackbar('Error al crear Valoracion', {
                variant: "error"
            });
        }
        navigate('/appreciations');
        setIsLoading(false);
    }
    const handleEnterKey = async () => {
        setIsLoading(true)
        const res = await searchClient(getValues('rut'));
        if(res.error){
            setRutError('Rut incorrecto')
            await setIsLoading(false);
            return;
        }
        if(res.code === "ERR_BAD_RESPONSE"){
            enqueueSnackbar('Error en el servidor... Contactarse con el equipo TI', {
                variant: "error",
            });
            await setIsLoading(false);
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
        if(res.client.length === 0){
            enqueueSnackbar('No se encontro ningun cliente', {
                variant: "warning"
            });
            setValue('newClient', true);
            setIsLoading(false);
            setIsDataRutSet(false);
            return;
        }
        if(res.success === true){
            setIsLoading(false);
            setValue('name', res.client[0].name, { shouldTouch: true });
            setValue('email', res.client[0].email, { shouldTouch: true });
            setValue('phone', res.client[0].phone, { shouldTouch: true });
            setValue('newClient', false);
            setIsDataRutSet(false);
        }

    }
    const checkKeyDown = (e) => {
        if(e.key === "Enter") e.preventDefault();
    }
    const handleError = () => {

        if(!getValues('rut')){
            setRutError('Rut es requerido')
        }
        if(!getValues('typeOfAsset')){
            setTypeAssetError('Tipo de bien es requerido')
        }
        if(!getValues('addressMap')){
            setAddressError('Direccion es requerida')
        }
    }
    const handleClearError = () => {
        clearErrors();
        setAddressError('')
        setRutError('')
        setTypeAssetError('')
    }
    return(
        <>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => { checkKeyDown(e) }} >
            <Grid container  padding={3} borderRadius={5} borderColor="gray" backgroundColor="#f1f1f1" >
                <Grid container>
                    <Grid item xs={4}>
                        <AutoCompleteInputMap
                            setCoordinates={setCoordinates}
                            setCommuneSearch={setCommuneSearch}
                            register={register}
                            setValues={setValue}
                            handleClearError={handleClearError}
                        />
                        {addressError && <p className="error-messages-table" role="alert" > { addressError } </p> }
                    </Grid>
                    <Grid item xs={4}>
                        <input
                            className="input-form-table"
                            placeholder="Región"
                            disabled={true}
                            value={getValues('region')}
                            { ...register("region", { required: "Region es requerido"}) }
                        />
                        {errors.region && <p className="error-messages-table" role="alert" > { errors.region.message } </p> }
                    </Grid>
                    <Grid item xs={4} >
                        <input
                            className="input-form-table"
                            placeholder="Comuna"
                            disabled={true}
                            value={getValues('commune')}
                            { ...register("commune", { required: "Comuna es requerido" }) }
                        />
                        {errors.commune && <p className="error-messages-table" role="alert" > { errors.commune.message } </p> }
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            variant="outlined"
                            onClick={() => { handleClearError() }}
                            placeholder="Buscar Rut 77111222-3"
                            { ...register("rut", { required: "Rut es requerido"}) }
                            style={{ backgroundColor: "white", width: "350px", marginBottom: '10px' }}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    handleEnterKey();
                                }
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        { isLoading && <CircularProgress size={20} /> }
                                    </InputAdornment>
                                )
                            }}
                        />
                        {rutError && <p className="error-messages-table" role="alert"> { rutError } </p>}
                        <input
                            className="input-form-table"
                            placeholder="Nombre Cliente"
                            disabled={ isDataRutSet }
                            {...register("name", { required: "Nombre es requerido" })}
                            aira-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.name && <p className="error-messages-table" role="alert" > { errors.name.message } </p> }
                        <input
                            className="input-form-table"
                            placeholder="Correo Cliente"
                            disabled={ isDataRutSet }
                            { ...register("email", { required: "Correo es requerido"}) }
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email && <p className="error-messages-table" role="alert" > { errors.email.message } </p> }
                        <Grid container style={{ width: "312px" }} >
                            <Grid item xs={6}>
                                <input
                                    className="input-phone-ext"
                                    placeholder="+56"
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    type='number'
                                    className="input-phone"
                                    placeholder="Teléfono Cliente"
                                    disabled={ isDataRutSet }
                                    { ...register("phone", { required: "Telefono es requerido" }) }
                                    aria-invalid={errors.phone ? true : false}
                                />
                                {errors.phone && <p className="error-messages-table-phone" role="alert" > { errors.phone.message } </p> }
                            </Grid>
                        </Grid>

                        <Grid container style={{ width: "367px" }} >
                            <Grid item xs={6}>
                                <input
                                    type="number"
                                    className="input-block"
                                    placeholder="Manzana"
                                    disabled={ isDataRutSet }
                                    { ...register("rolBlock", { required: "Manzana es requerido" }) }
                                    aria-invalid={errors.rolBlock ? "true" : "false"}
                                />
                                {errors.rolBlock && <p className="error-messages-table-block" role="alert" > { errors.rolBlock.message } </p> }
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    type="number"
                                    className="input-plot-of-land"
                                    placeholder="Predio"
                                    disabled={ isDataRutSet }
                                    { ...register("rolPlotOfLand", { required: "Predio es requerido" }) }
                                    aria-invalid={errors.rolPlotOfLand ? true : false}
                                />
                                {errors.rolPlotOfLand && <p className="error-messages-table" role="alert" > { errors.rolPlotOfLand.message } </p> }
                            </Grid>
                        </Grid>
                        <div
                            style={{ width: '350px', marginBottom: '10px', marginTop: '-10px' }}
                        >
                            <Select
                                placeholder="Tipo de bien"
                                options={options}
                                onChange={(e) => {
                                    setValue('typeOfAsset', e.value);
                                }}
                            />
                            {typeAssetError && <p className="error-messages-table-type-of-asset" role="alert"> { typeAssetError } </p>}
                        </div>
                        <input
                            type="number"
                            className="input-form-table"
                            placeholder="Área Terreno"
                            disabled={ isDataRutSet }
                            { ...register("terrainArea", { valueAsNumber: true, required: "Area Terreno es requerido" }) }
                        />
                        {errors.terrainArea && <p className="error-messages-table" role="alert" > { errors.terrainArea.message } </p> }
                        <input
                            type="number"
                            className="input-form-table"
                            placeholder="Área construcción"
                            disabled={ isDataRutSet }
                            { ...register("terrainConstruction", { valueAsNumber: true, required: "Area Contruccion es requerido" }) }
                        />
                        {errors.terrainConstruction && <p className="error-messages-table" role="alert" > { errors.terrainConstruction.message } </p> }
                        <input
                            type="number"
                            className="input-form-table"
                            placeholder="Habitación"
                            disabled={ isDataRutSet }
                            { ...register("bedroom", { valueAsNumber: true, required: "Habitaciones es requerido" }) }
                        />
                        {errors.bedroom && <p className="error-messages-table" role="alert" > { errors.bedroom.message } </p> }
                        <input
                            type="number"
                            className="input-form-table"
                            placeholder="Baño"
                            disabled={ isDataRutSet }
                            { ...register("bathroom", { valueAsNumber: true, required: "Bano es requerido" }) }
                        />
                        {errors.bathroom && <p className="error-messages-table" role="alert" > { errors.bathroom.message } </p> }
                    </Grid>
                    <Grid item xs={8}>
                        <Map coordinates={coordinates} />
                    </Grid>
                    <Grid container >
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={8} >
                            <button
                                className="btn-table p-2"
                                style={{ marginLeft: "100px", width: "500px", alignItems: 'center'}}
                                onClick={(e) => {
                                    handleError()
                                }}
                            >
                           {isLoading &&
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: "10px" }} ></span>}
                                CREAR VALORACIÓN
                            </button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </form>
        </>
    )
}