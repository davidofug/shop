import * as React from 'react'
import PrivateRoute  from './PrivateRoute'
import PublicRoute  from './PublicRoute'
import Login from '../views/Login'
import Home from '../views/Home'
import Account from '../views/Account'
import Cart from '../views/Cart'
import Checkout from '../views/Checkout'
import Dashboard from '../views/Dashboard'
import Pay from '../views/Pay'
import NotAuthorized from '../views/NotAuthorized'
import NotFound from '../views/NotFound'

import {
    BrowserRouter as Router,
    Switch, Route
} from 'react-router-dom'

function MyRouter() {

    return (
        <Router>
            <Switch>
                <PublicRoute path="/" exact>
                    <Home />
                </PublicRoute>
                <PublicRoute path="/not-authorized" >
                    <NotAuthorized />
                </PublicRoute>
                <PublicRoute path="/login">
                    <Login />
                </PublicRoute>
                <PublicRoute path="/cart">
                    <Cart />
                </PublicRoute>
                <PublicRoute path="/checkout">
                    <Checkout />
                </PublicRoute>
                <PrivateRoute path="/dashboard">
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute path="/account">
                    <Account />
                </PrivateRoute>
                <PrivateRoute path="/pay">
                    <Pay />
                </PrivateRoute>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            </Router>
    )
}

export default MyRouter
