import React from 'react'
import { useCart } from '../contexts/Cart'

function Cart() {
    const { itemsInCart } = useCart();

    return (
        <div>
            {itemsInCart.map(itemInCart =>  <div key={itemInCart._id}>{itemInCart.name}</div>)}
        </div>
    )
}

export default Cart
