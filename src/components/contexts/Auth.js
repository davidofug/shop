import React from 'react'
// import { createContext, useContext, useState } from 'react';
const AuthContext = React.createContext()

export function useAuth() {
    return React.useContext( AuthContext )
}

function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = React.useState()
    const [loading, setLoading] = React.useState(true)

    const value = {
        loading,
        currentUser,
        setCurrentUser,
        setLoading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
