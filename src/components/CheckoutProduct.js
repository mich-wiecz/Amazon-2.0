import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import Currency from 'react-currency-formatter'
import {useDispatch} from 'react-redux'
import {addToBasket, removeOneFromBasket, removeAllFromBasket} from '../slices/basketSlice'

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
    count
}) {

    const dispatch = useDispatch()

    function handleAddingToBasket() {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime
        }

        dispatch(addToBasket(product))

    }

    function handleRemovingOneFromBasket() {
        dispatch(removeOneFromBasket({id}))
    }

    function handleRemovingAllFromBasket() {
        dispatch(removeAllFromBasket({id}))
    }

    return (
        <div className="grid grid-cols-5">
            <Image 
            src={image}
            alt={title}
            width={200}
            height={200}
            objectFit="contain"
            />
            <div className="col-span-3 mx-5">
                <p>
                    {title}
                </p>
                <div className="flex">
                    {Array(rating).fill().map((_, index) => (
                        <StarIcon 
                        key={index}
                        className="h-5 text-yellow-500"
                        />
                    ))}
                </div>
                <p className="text-sm my-2 line-clamp-3">
                    {description}
                </p>
                <div className="flex justify-between">
                    <Currency 
                    quantity={price}
                    currency="GBP"
                    />
                     <p>
                    Amount: {count}
                     </p>
                </div>
               
                {
                    hasPrime &&
                    <div className="flex items-center space-x-2">
                        <img 
                        loading="lazy"
                        className="w-12"
                        src="https://links.papareact.com/fdw" 
                        alt="prime delivery photo" 
                        />
                        <p className="text-sm text-gray-500">
                            FREE Next-day Delivery
                        </p>
                    </div>
                }
            </div>
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button 
                className="button"
                onClick={handleAddingToBasket}
                >
                        Add One
                </button>
                <button 
                className="button"
                onClick={handleRemovingOneFromBasket}
                >
                        Remove One
                </button>
                <button
                className="button"
                onClick={handleRemovingAllFromBasket}
                >
                    Remove All
                </button>
            </div>
        </div>
    )
}

export default CheckoutProduct
