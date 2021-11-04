import PrivateRoute  from './PrivateRoute'
import NotLoggedIn from '../views/NotLoggedIn'
import Login from '../views/Login'
import Logout from '../views/Logout'
import Home from '../views/Home'
import Help from '../views/Help'
import Account from '../views/Account'
import Cart from '../views/Cart'
import Checkout from '../views/Checkout'
import Dashboard from '../views/Dashboard'
import Pay from '../views/Pay'
import NotAuthorized from '../views/NotAuthorized'
import NotFound from '../views/NotFound'
import { useAuth } from '../contexts/Auth'

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import { useCart } from '../contexts/Cart'

function MyRouter() {

    const date = new Date()
    const { currentUser } = useAuth()
    const { itemsInCart } = useCart()

    return (
        <Router>
                <header className="header">
                    <h1>
                        <Link to="/">DevShop</Link>
                    </h1>
                    <nav>
                        <ul>
                            {currentUser &&
                                <>
                                    <li>
                                        <Link to="/">Shop</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/account">My Account</Link>
                                    </li>

                                </>
                        }
                            <li>
                                <Link to="/help">Help</Link>
                            </li>
                            <li>
                                {currentUser ? <Link to="/logout">Logout</Link> : <Link to="/login">Login</Link>}
                            </li>
                            <li>
                                <Link to="/cart" className="btn basket">{itemsInCart?.length} Basket</Link>
                            </li>
                        </ul>
                    </nav>
                </header>

            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/home" exact>
                    <Home />
                </Route>
                <Route path="/not-logged-in" >
                    <NotLoggedIn />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/help">
                    <Help />
                </Route>
                <Route path="/cart">
                    <Cart />
                </Route>
                <Route path="/checkout">
                    <Checkout />
                </Route>
                <Route path="/logout">
                    <Logout />
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
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            <footer>
                <p>&copy; Copyright {date.getFullYear() }</p>
            </footer>
        </Router>
    )
}

export default MyRouter
