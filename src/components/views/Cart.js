import React from 'react'
import { useCart } from '../contexts/Cart'
import { Link } from 'react-router-dom'

function Cart() {
    
    const { itemsInCart } = useCart();

    if(itemsInCart?.length >0 )
        return (
            <div>
                {itemsInCart.map(itemInCart =>  <div key={itemInCart._id}>{itemInCart.name}</div>)}
            </div>
        )

    return (
        <>
            <h1>Your Basket is empty</h1>
            <p><Link to="/">Shop Now</Link></p>
        </>
    )
}

export default Cart
