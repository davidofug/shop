import {useRef, useState} from 'react'
import { useCart } from '../contexts/Cart'
import Countries from '../helpers/countries.element'
import Districts from '../helpers/districts.element'
import USstates from '../helpers/us.states.element'
import {currencyFormatter, ugandaShillings} from '../helpers/currency.format'

function Checkout() {
    const checkoutRef = useRef()
    const { total } = useCart()
    const [country, setCountry] = useState('Uganda')
    const [shipping, setShipping] = useState(0)
    const [tax, setTax] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [voucher, setVoucher] = useState('')
    const vouchers = ['10% off', '20% off', '30% off']
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
                    <legend>Cart Details</legend>
                    <p>Subtotal {ugandaShillings.format(total)}</p>
                    <p>Shipping {shipping}</p>
                    <p>Discount {discount}</p>
                    <p>Tax {tax}</p>
                    <p>Total {currencyFormatter((total + shipping + tax - discount), 'UGX','en-US')}</p>

                </fieldset>

                <fieldset>
                    <legend>Payment</legend>
                    <div>
                        <label>Voucher code</label>
                        <input type="text" placeholder="Voucher code"/>
                    </div>
                    <label>
                        MoMO/MobileMoney <input type="radio" name="payment_method" value="momo" />
                    </label>
                    <label>Airtel <input type="radio"  name="payment_method" value="airtel" /></label>
                </fieldset>
                <button type="submit" onClick={handlePayment}>Pay Now</button>
            </form>
        </div>
    )
}

export default Checkout
