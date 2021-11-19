import {useRef, useState} from 'react'
import { useCart } from '../contexts/Cart'
import Countries from '../helpers/countries.element'
import Districts from '../helpers/districts.element'
import USstates from '../helpers/us.states.element'
import {getCountryZone} from '../helpers/shipping'

import {currencyFormatter, ugandaShillings} from '../helpers/currency.format'

function Checkout() {
    const checkoutRef = useRef()
    const { total } = useCart()
    const [country, setCountry] = useState('Uganda')
    const [shipping, setShipping] = useState(0)
    const [tax, setTax] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [zone, setZone] = useState(null)
    const vouchers = {
        aaa: { rate: 10, status: 'active', amount: 10000 },
        bbb: { rate: 20, status: 'expired', amount: 10000 },
        ccc: { rate: 30, status: 'active', amount: null },
        ddd: { rate: null, status: 'active', amount: null },
        eee: { rate: null, status: 'active', amount: 17000 },
    }
    const handlePayment = () => {
    }
    const getVoucherInfo = (appliedVoucher) => {
        let theVoucher = vouchers[appliedVoucher]
        if (theVoucher) {
            if (theVoucher.status !== 'expired') {
                if (!theVoucher.rate && !theVoucher.amount) {
                    return {msg: 'Invalid voucher'}
                }
                return theVoucher?.amount > 0 ? { amount: theVoucher.amount } : { rate: theVoucher.rate }
            }
            return {msg: 'Expired voucher'}
        }
        return {msg:'Invalid voucher'}
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
                        <Countries onChange={(event) => {
                            setCountry(event.target.value)
                            setZone(getCountryZone(event.target.value))
                            // console.log(zone)
                        }} required id="country" />
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
                {zone &&
                    <fieldset>
                    <legend>Shipping methods</legend>
                    {zone.transport_mode[1]}
                    </fieldset>
                }
                <fieldset>
                    <legend>Cart Details</legend>
                    <p>Subtotal {ugandaShillings.format(total)}</p>
                    <p>Shipping {shipping}</p>
                    <p>Discount {discount}</p>
                    <p>Tax {tax}</p>
                    <p>Total {currencyFormatter((total + shipping + tax - discount), 'GBP','en-GB')}</p>

                </fieldset>

                <fieldset>
                    <legend>Payment</legend>
                    <div>
                        <label>Voucher code</label>
                        <input type="text" placeholder="Voucher code" onBlur={event => {
                            let voucherInfo = getVoucherInfo(event.target.value)
                            if (voucherInfo?.msg) {
                                event.target.value = voucherInfo.msg
                            } else {
                                voucherInfo?.amount ? setDiscount(voucherInfo.amount):  setDiscount((voucherInfo.rate/100) * total)
                            }
                        }}/>
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
