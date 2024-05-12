import React, {useState} from "react";
import {
    Grid,
    Typography
} from "@mui/material";
import {AdminForm} from "../../../components/Auth/Forms/AdminForm";
import CircularProgress from "@mui/material/CircularProgress";

export function AdminLogin() {
    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                width="500px"
            >
                <div className="glass">
                    <div className="text-center align-items-center">
                    <Typography variant="h6">Bienvenido a la Intranet AVM </Typography>
                        <hr style={{backgroundColor: '#bcbbbb'}}/>
                        <Typography variant="h6">Administradores </Typography>
                        <br/>
                        <AdminForm/>
                    </div>
                </div>
            </Grid>
        </>
    )
}