import Header from '../components/Header'
import Image from 'next/image'
import {useSession} from 'next-auth/client'
import {useSelector} from 'react-redux'
import {selectItems, selectTotal} from '../slices/basketSlice'

import CheckoutProduct from '../components/CheckoutProduct'
import { v4 as uuid } from 'uuid';
import Currency from 'react-currency-formatter'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {

    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const [session] = useSession()

    async function handleCreatingCheckoutSession() {
        const stripe = await stripePromise

        const checkoutSession = await axios.post('/api/create-checkout-session', {
            items,
            email: session.user.email
        })

        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) {
            alert(result.error.message)
        }
    }

    return (
        <div className="bg-gray-100">
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">

                <div className="flex-grow m-5 shadow-sm">
                    <Image 
                    src="https://links.papareact.com/ikj"
                    alt="advertisement"
                    width={1020}
                    height={250}
                    objectFit="contain"
                    />
                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {
                                items.length === 0
                                ?
                                'Your Amazon Basket is empty'
                                :
                                'Shopping Basket'
                            }
                        </h1>
                        {
                            items.map((productObj) => {
                                return (
                                    <CheckoutProduct 
                                    key={uuid()}
                                    {...productObj}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="flex flex-col bg-white p-10 shadow-md">
                    {
                        items.length > 0 &&
                        <>
                            <h2 className="whitespace-nowrap">
                                Subtotal ({items.length} items):{" "}
                                <span className="font-bold ">
                                    <Currency 
                                     quantity={total}
                                     currency="GBP"
                                    />
                                </span>
                            </h2>
                            <button
                            role="link"
                            disabled={!session}
                            className={`button mt-2 ${!session ? ' from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed' : ''}`}
                            onClick={handleCreatingCheckoutSession}
                            >
                                {
                                    !session
                                    ?
                                    'Sign in to checkout'
                                    :
                                    'Proceed to checkout'
                                }
                            </button>
                        </>
                    }
                </div>
            </main>
        </div>
    )
}

export default Checkout
