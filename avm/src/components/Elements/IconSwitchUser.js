import React from "react";
import "../styles/FormStyles.css";

export function IconSwitchUser(props) {
    const { userType, setUserType } = props;
    const handleUserType = () => {
        setUserType(!userType);
    }
    return (
        <>
            {userType === true && (
                <button
                    className="btn-type-user"
                    onClick={() => handleUserType()}
                    style={{position: "fixed", right: "5vw", top: "1vh"}}
                >
                    <i className="fas fa-user"></i>
                </button>
            )}
            {userType === false && (
                <button
                    className="btn-type-user"
                    onClick={() => handleUserType()}
                    style={{position: "fixed", right: "5vw", top: "1vh"}}
                >
                    <i className="fas fa-lock"></i>
                </button>
            )}
        </>
    );
}