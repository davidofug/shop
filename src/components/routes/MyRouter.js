import * as React from 'react'
import PrivateRoute  from './PrivateRoute'
import Login from '../views/Login'
import Home from '../views/Home'
import Account from '../views/Account'
import Cart from '../views/Cart'
import Checkout from '../views/Checkout'
import Dashboard from '../views/Dashboard'
import Pay from '../views/Pay'
import NotAuthorized from '../views/NotAuthorized'

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
                <Route path="/not-authorized" exact>
                    <NotAuthorized />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/cart">
                    <Cart />
                </Route>

                <Route path="/checkout">
                    <Checkout />
                </Route>
                <PrivateRoute path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/account">
                    <Account />
                </PrivateRoute>
                <PrivateRoute path="/pay">
                    <Pay />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default MyRouter
