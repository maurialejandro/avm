import { Routes, Route } from 'react-router-dom';
import {Valoration} from "../../views/AdminViews/Valoration/Valoration";
import * as React from "react";
import {Clients} from "../../views/AdminViews/Clients/Clients";
import { CreateValoration } from "../../views/AdminViews/Valoration/CreateValoration";
import { VerifySupervisor } from "../../middleware/VerifySupervisor";

export const SupervisorRoutes = () => {
    return(
        <Routes>
            <Route path="/supervisor-appreciations" element={<VerifySupervisor><Valoration /></VerifySupervisor>}/>
            <Route path="/supervisor-clients" element={<VerifySupervisor><Clients /></VerifySupervisor>} />
        </Routes>
    )
}