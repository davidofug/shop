import { createContext, useState, useContext} from "react";
const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
}

export default function CartProvider({ children }) {
    const [itemsInCart, setItemsInCart] = useState([])
    const [total, setTotal] = useState(0)

    return (
        <CartContext.Provider value={{ itemsInCart, setItemsInCart, total, setTotal } }>
            {children}
        </CartContext.Provider>
    )
}
