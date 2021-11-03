import React from 'react'
import { useAuth } from '../contexts/Auth'

function Home() {
    const { currentUser } = useAuth()
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'UGX',
      });

    const inventoryItems = [
        {
            name: "Blue T-shirt",
            category: "All",
            price: 35000
        },
        {
            name: "Black Shoes",
            category: "Men",
            price: 150000
        },
        {
            name: "White Dress",
            category: "Women",
            price: 105000
        },
        {
            name: "Macbook Air",
            category: "Tech",
            price: 450000000
        }
    ]
    // if (currentUser)
    //     return (<Redirect to={{ pathname: "/dashboard" }} />)

    return (
        <div>
            <div className="header">
                <h1>Shop Now</h1>
                <div>
                    <button>Basket</button>
                </div>
            </div>
            <ul className="item-list">
                {
                    inventoryItems.map((inventoryItem, index) => {
                        return (
                            <li key={index.toString()} className="item">
                                <div>
                                    {inventoryItem.name}
                                </div>
                                <div className="category">
                                    {inventoryItem.category}
                                </div>
                                <div>
                                    {formatter.format(inventoryItem.price)}
                                </div>
                                <div className="cta">
                                    <button><span>Wishlist</span></button>
                                    <button><span>Rate</span></button>
                                    <button><span>Cart</span></button>
                                    <button><span>Buy Now</span></button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Home
