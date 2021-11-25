import {useRef, useState} from 'react'
import { useCart } from '../contexts/Cart'
import Countries from '../helpers/countries.element'
import Districts from '../helpers/districts.element'
import USstates from '../helpers/us.states.element'
import {getCountryZone} from '../helpers/shipping'
import axios from 'axios'
import {currencyFormatter, ugandaShillings} from '../helpers/currency.format'

function Checkout() {
    const checkoutRef = useRef()
    const { total } = useCart()
    const [country, setCountry] = useState('Uganda')
    const [shipping, setShipping] = useState(0)
    const [tax, setTax] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [zone, setZone] = useState(null)
    const [patasenteOption, setPatasenteOption] = useState(null)
    const [patasentePhone, setPatasentePhone] = useState(null)
    const [mtnSecretCode, setMTNSecretCode] = useState(null)
    const [secretCode, setSecretCode] = useState(null)
    const vouchers = {
        aaa: { rate: 10, status: 'active', amount: 25000 },
        bbb: { rate: 20, status: 'expired', amount: 10000 },
        ccc: { rate: 30, status: 'active', amount: null },
        ddd: { rate: null, status: 'active', amount: null },
        eee: { rate: null, status: 'active', amount: 17000 },
    }
    const handlePayment = async (event) => {
        event.preventDefault()
        console.log('Payment submitting')
        let data = {
            'amount': 2000,
            'email': 'davidwampamba@gmail.com',
            'phone': Number(patasentePhone),
            'secret_code': Number(secretCode),
            'mobile_money_company_id': 1,
            'reason':'Purchase on DevShop'
        }

        try {
            const RESULTS = await axios.post('/patasente/send-payment', data)
            console.log(RESULTS)

        }catch (error) {
            console.error(error)
        }
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
            <form method="post" onSubmit={handlePayment}>
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
                        <Countries
                            onChange={(event) => {
                                setShipping(0)
                                setCountry(event.target.value)
                                setZone(getCountryZone(event.target.value))
                            }}
                            required
                            id="country"
                        />

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
                            {country == 'United States' ? <div>
                                <label>State <span class="required-label">*</span></label>
                                <USstates id="us_state" />
                            </div> :
                            <div>
                                <label>State <span class="required-label">*</span></label>
                                <input type="text" required placeholder="State" />
                            </div>
                            }
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
                {zone?.error
                    ?
                    <div>{zone.error}</div>
                    :
                    <fieldset>
                    <legend>Shipping methods</legend>
                    {zone && zone.map(theCompany =>
                            <div key={theCompany.company.toLocaleLowerCase()}>
                                <h1>{theCompany.company}</h1>
                            {
                                theCompany.classes.map(companyClass =>
                                    <div key={`${theCompany.company}_${companyClass.label}`}>
                                        <input

                                            onChange={(event) => {
                                                setShipping(Number(event.target.getAttribute('data-cost')))
                                            }}

                                            id={`${theCompany.company} ${companyClass.label}`}
                                            type="radio"
                                            name="shipping_class"
                                            value={`${theCompany.company} ${companyClass.label}`}
                                            data-cost={companyClass.cost}
                                        />
                                        <label htmlFor={
                                            `${theCompany.company} ${companyClass.label}`
                                        }>{`${companyClass.label} ${companyClass.cost}`}
                                        </label>
                                    </div>
                            ) }
                            </div>
                    )}
                    </fieldset>
                }
                <fieldset>
                    <legend>Cart Details</legend>
                    <p>Subtotal {ugandaShillings.format(total)}</p>
                    <p>Shipping {shipping}</p>
                    <p>Discount {discount}</p>
                    <p>Tax {tax}</p>
                    <p>Total {currencyFormatter((total + shipping + tax - discount))}</p>
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
                    <div>
                        <h1>Patasente</h1>
                        <select onChange={(event) => setPatasenteOption(Number(event.target.value))}>
                            <option>-Select-</option>
                            <option value="1">MTN</option>
                            <option value="2">Airtel</option>
                        </select>
                        {patasenteOption === 1 ?
                            <>
                                <p>
                                    <input onChange={event => setPatasentePhone(event.target.value)} placeholder="Phone Number" />
                                </p>
                                {!mtnSecretCode &&
                                    <button onClick={async (event) => {
                                        event.preventDefault()
                                        try {
                                            const data = {
                                                phone: Number(patasentePhone),
                                                mobile_money_company_id: 1,
                                                // username: 'davidwampamba@gmail.com'
                                            };
                                            // const URL = `${process.env.REACT_APP_PATASENTE_URL}\\${process.env.REACT_APP_PATASENTE_API_KEY}\\${process.env.REACT_APP_PATASENTE_GATEWAY_KEY}`

                                            fetch('/patasente', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify(data),
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    if (data.result == 'success') {
                                                        setMTNSecretCode(true)
                                                    } else {
                                                        console.log(data)
                                                    }
                                                })
                                                .catch((error) => {
                                                    console.error('Error:', error);
                                                });

                                            /*const RESULTS = await fetch(URL,{
                                            method: 'POST',
                                            headers: {
                                                'Access-Control-Allow-Origin': '*',
                                                'Content-Type': 'application/json',
                                                'Accept':'application/json',
                                                'mode':'no-cors'
                                            },
                                            body: JSON.stringify(data)
                                            })

                                            console.log( RESULTS.data )
                                            if (RESULTS.data.status === 'success') {
                                            setMTNSecretCode(RESULTS.data.token)
                                            }
                                            */
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }}>Request Token</button>}
                                {
                                    mtnSecretCode && <>
                                        <input placeholder="Secret code" onChange={(event) => setSecretCode(event.target.value)}/>
                                        <div>
                                            <input type="submit" value="Pay Now" />
                                        </div>
                                    </>
                                }
                            </>
                            :
                            <>
                                <p>
                                    <input placeholder="Phone number" />
                                </p>
                                <p>
                                    <input placeholder="Secret code..." onChange={(event) => secretCode(event.target.value)} />
                                </p>
                                <input type="submit" value="Pay Now" />
                            </>
                            }
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Checkout
