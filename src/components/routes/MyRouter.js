import * as React from 'react'
import Login from '../views/Login'
import Home from '../views/Shop'
import Account from '../views/Account'
import Cart from '../views/Cart'
import Checkout from '../views/Checkout'
import Dashboard from '../views/Dashboard'
import Pay from '../views/Pay'

import {
    BrowserRouter as Router,
    Switch, Route
} from 'react-router-dom'

function MyRouter() {

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/posts" exact>
                    <Posts />
                </Route>
                <Route path="/posts/:id">
                    <Apost />
                </Route>

                <Route path="/todos">
                    <Todos />
                </Route>
            </Switch>
        </Router>
    )
}

export default MyRouter
