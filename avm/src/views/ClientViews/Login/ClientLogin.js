import React from "react";
import {Grid, Typography} from "@mui/material";
import {ClientForm} from "../../../components/Auth/Forms/ClientForm";
import CircularProgress from "@mui/material/CircularProgress";

export function ClientLogin() {
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
                        <hr style={{ backgroundColor: '#bcbbbb' }} />
                        <br/>
                        <ClientForm />
                    </div>

                </div>

            </Grid>
        </>
    )
}