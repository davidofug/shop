import {useRef, useState} from 'react'
import { useCart } from '../contexts/Cart'
import Countries from '../helpers/countries.element'
import Districts from '../helpers/districts.element'
import USstates from '../helpers/us.states.element'

function Checkout() {
    const checkoutRef = useRef()
    const { total } = useCart()
    const [country, setCountry] = useState('Uganda')
    const handlePayment = () => {
    }

    return (
        <div>
            <h1>Checkout</h1>
            <form ref={checkoutRef} method="post">
                <fieldset>
                    <legend>Billing info</legend>
                    <div>
                        <label>Name</label>
                        <input type="text" placeholder="Name" />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Shipping info</legend>
                    <div>
                        <label>Name <span class="required-label">*</span></label>
                        <input type="text" required placeholder="Name" />
                    </div>
                    <div>
                        <label>Company (optional)</label>
                        <input type="text" placeholder="Company" />
                    </div>
                    <div>
                        <label>Address line 1: <span class="required-label">*</span></label>
                        <input type="text" required placeholder="Ex. Suite no. Apt.No, Plot No., Rd." />
                    </div>
                    <div>
                        <label>Address line 2: </label>
                        <input type="text" placeholder="State, zip code, town" />
                    </div>

                    <div>
                        <label>Country <span class="required-label">*</span></label>
                        <Countries onChange={(event) => setCountry(event.target.value)} required id="country" />
                    </div>
                    {country == 'Uganda' ?
                        <>
                            <div>
                                <label>District <span class="required-label">*</span></label>
                                <Districts id="district"/>
                            </div>
                            <div>
                                <label>Town/Village </label>
                                <input type="text" placeholder="Town/Village" />
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <label>State <span class="required-label">*</span></label>
                                <USstates id="us_state"/>
                            </div>
                            <div>
                                <label>Town/City</label>
                                <input type="text" placeholder="Town/City"/>
                            </div>
                            <div>
                                <label>Zip code/Postal code</label>
                                <input type="text" placeholder="Postal Code"/>
                            </div>
                        </>
                    }

                </fieldset>

                <fieldset>
                    <legend>Payment</legend>
                    <div>
                        <label>Voucher code</label>
                        <input type="text" placeholder="Voucher code"/>
                    </div>

{/*                     <p>Subtotal {total}</p>
                    <p>Shipping {shipping}</p>
                    <p>Discount {discount}</p>
                    <p>Tax {tax}</p>
                    <p>Total {total + shipping + tax - discount}</p> */}

                </fieldset>

                <div>
                    <label>MoMO/MobileMoney <input type="radio" name="payment_method" value="momo" /></label>
                    <label>Airtel <input type="radio"  name="payment_method" value="airtel" /></label>
                </div>
                <button type="submit" onClick={handlePayment}>Pay Now</button>
            </form>
        </div>
    )
}

export default Checkout
