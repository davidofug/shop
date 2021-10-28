import React from 'react'

function Home() {
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

    return (
        <div>
            <ul>
                {
                    inventoryItems.map((inventoryItem, index) => {
                        return (
                            <li key={index.toString()}>
                                <div>
                                    {inventoryItem.name}
                                </div>
                                <div>
                                    {inventoryItem.category}
                                </div>
                                <div>
                                    {inventoryItem.price}
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
