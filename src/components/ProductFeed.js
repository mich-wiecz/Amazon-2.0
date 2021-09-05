import Product from './Product'

function ProductFeed({
    products
}) {
    
    function mapProducts(products, range) {
        if (range) {
            const [startIndex, endIndex] = range
            products = products.slice(startIndex, endIndex)
        }
        return  products.map(({
            id,
            title,
            price,
            description,
            category,
            image
        }) => {
            return (
                <Product 
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                />
            )
        })
    }

    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
            {
                mapProducts(products, [0, 4])
            }
            <img 
            className="md:col-span-full"
            src="https://links.papareact.com/dyz" 
            alt="advertisement" 
            />
            <div className="md:col-span-2">
                {
                  mapProducts(products, [4, 5])
                }
            </div>
            {
                mapProducts(products, [5, products.length])       
            }
            
        </div>
    )
}

export default ProductFeed
