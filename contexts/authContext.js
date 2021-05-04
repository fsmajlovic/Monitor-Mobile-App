import React from 'react'

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
    const values = { };

    return (
        <AuthContext.Provider value={values}>
            { props.children}
        </AuthContext.Provider>
    )
}

