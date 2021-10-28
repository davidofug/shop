import MyRouter from './routes/MyRouter'
import AuthProvider from './contexts/Auth'
import React from 'react'

function App() {
    return (
        <AuthProvider>
            <MyRouter />
        </AuthProvider>
    )
}

export default App
