import React from 'react';
import {IconSwitchUser} from "../components/Elements/IconSwitchUser";
import '../App.css';
import logo from "../logo.svg";
import {AdminLogin} from "./AdminViews/Login/AdminLogin";
import {ClientLogin} from "./ClientViews/Login/ClientLogin";

export function Login(){
    const [userType, setUserType] = React.useState(true);

    return(
        <>
            <IconSwitchUser userType={userType} setUserType={setUserType}/>
            <div className="imgfondo">
                <br/>
                <br/>
                <br/>
                <header className="App-header">
                    <div>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                bottom: "10px",
                                right: "10px",
                                width: "100px",
                                margin: 10,
                            }}
                        />
                        <br/>
                        <br/>
                    </div>
                    {userType === false && <AdminLogin/>}
                    {userType === true && <ClientLogin/>}
                </header>
            </div>
        </>
    );
}