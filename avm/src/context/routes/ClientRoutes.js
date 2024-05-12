import React from 'react';
import {Route, Routes} from "react-router-dom";
import { VerifyClient } from "../../middleware/VerifyClient";
import { ClientAppreciation } from "../../views/ClientViews/ClientAppreciation";

export const ClientRoutes = () => {

    return(
        <Routes>
            <Route path="/client-appreciation" element={<VerifyClient> <ClientAppreciation /></VerifyClient>}/>
        </Routes>
    )
}