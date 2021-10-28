import * as React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'

import { useAuth } from '../contexts/Auth'

function PrivateRoute({children, ...rest}) {
    const { currentUser } = useAuth()

    // React.useEffect(() => {
    //     console.log(currentUser)
    //     console.log('Private route')
    // }, [])

    return (
        <Route {...rest}
            render={() => currentUser
                    ? (children)
                    : (<Redirect to={{
                        pathname: "/not-authorized"
                    }}  />)
            }
        />
    )
}

export default PrivateRoute
