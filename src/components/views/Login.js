import React from 'react'
import { useAuth } from '../contexts/Auth'
import { useHistory} from 'react-router-dom'
function Login() {

    let { setCurrentUser } = useAuth()

    const history = useHistory()
    return (
        <div>
            <button onClick={() => {
                setCurrentUser(1)
                history.push('/dashboard')
            }}
            >Login</button>
        </div>
    )
}

export default Login
