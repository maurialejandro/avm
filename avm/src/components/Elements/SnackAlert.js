import React from 'react';
import {SnackbarProvider} from "notistack";

export default function SnackAlert(props){

    return(
        <SnackbarProvider maxSnack={2} >
            { props.children }
        </SnackbarProvider>
    )
}