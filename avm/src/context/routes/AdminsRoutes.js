import { Routes, Route } from 'react-router-dom';
import {VerifyAdmin} from "../../middleware/VarifyAdmin";
import {Valoration} from "../../views/AdminViews/Valoration/Valoration";
import * as React from "react";
import {Clients} from "../../views/AdminViews/Clients/Clients";
import {CreateValoration} from "../../views/AdminViews/Valoration/CreateValoration";
import NotFound from "../../views/NotFound";

export const AdminsRoutes = () => {

    return(
        <Routes>
            <Route path="/appreciations" element={<VerifyAdmin><Valoration /></VerifyAdmin>}/>
            <Route path="/create-appreciation" element={<VerifyAdmin><CreateValoration /></VerifyAdmin>} />
            <Route path="/clients" element={<VerifyAdmin><Clients /></VerifyAdmin>} />
        </Routes>
    )
}