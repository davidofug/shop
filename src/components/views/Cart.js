import {useState}from 'react'
import { useCart } from '../contexts/Cart'
import { Link } from 'react-router-dom'
import { useEffect } from 'react/cjs/react.development';

function Cart() {
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'UGX',
    });

    const { itemsInCart, setItemsInCart, total, setTotal } = useCart();
    // let [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal( itemsInCart.reduce( (currentItem, previousItem ) => currentItem.subtotal + previousItem.subtotal, 0))
    },[])

    if(itemsInCart?.length >0 )
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsInCart.map((itemInCart, index ) =>
                            <tr className="cart-item" key={itemInCart._id}>
                                <td>{itemInCart.name}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        // value={ }
                                        defaultValue={itemInCart.qty}
                                        placeholder={itemInCart.qty}
                                        onChange={(event) => {
                                            const item = itemsInCart[index]
                                            item.qty = Number(event.target.value)
                                            item['subtotal'] = Number(item.qty) * Number(item.price)
                                            itemsInCart[index] = item
                                            setItemsInCart([...itemsInCart])
                                            const subTotals = itemsInCart.map(itemInCart => itemInCart.subtotal)
                                            const reducer = (currentValue, previosValue) => {
                                                return  currentValue + previosValue
                                            }
                                            setTotal(subTotals.reduce(reducer))
                                        }

                                    } />
                                </td>
                                <td>{formatter.format(itemInCart.price)}</td>
                                <td>{formatter.format(itemInCart.subtotal || itemInCart.price)}</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th><th>Total {formatter.format(total)}</th>
                        </tr>
                    </tfoot>
                </table>
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
