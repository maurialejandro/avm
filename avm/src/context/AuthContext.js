import React from 'react';

const authContext = React.createContext()
const userLoginContext = React.createContext();
const userLogoutContext = React.createContext();

export function useAuthContext() {
    return React.useContext(authContext);
}
export function useUserLoginContext() {
    return React.useContext(userLoginContext);
}
export function useUserLogout(){
    return React.useContext(userLogoutContext);
}
const sessionType = {
    access_token: null,
    isLogged: false,
    user: {
        email: null,
        password: null,
        type: null
    }
}

export const AuthProvider = (props) => {
    const [ session, setSession ] = React.useState(sessionType);
    const login = (data) => {
        if(session.isLogged === false){
            const { access_token, name, email, type, sanctumToken } = data;
            const dataSession = {
                access_token,
                isLogged: true,
                user: {
                    sanctumToken,
                    name,
                    email,
                    type
                }
            }
            setSession(dataSession);
        }
    }
    const logout = () => {
        if(session.isLogged === true){
            setSession(sessionType);
        }
    }
    return (
        <authContext.Provider value={session}>
            <userLoginContext.Provider value={login}>
                <userLogoutContext.Provider value={logout}>
                    {props.children}
                </userLogoutContext.Provider>
            </userLoginContext.Provider>
        </authContext.Provider>
    )
}