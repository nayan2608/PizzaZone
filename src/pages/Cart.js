import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

function Cart(){

    let totalsum=0;
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext);
    const [priceFetched, togglepriceFetched] = useState(false);

    useEffect(() => {
        if (!cart.items) {
            return;
        }
        if (priceFetched) {
            return;
        }
        fetch('api/products/cart-items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: Object.keys(cart.items)})
        }).then(res => res.json())
        .then(products => {
            setProducts(products);
            togglepriceFetched(true);
        })
    }, [cart, priceFetched]);

    const getQuntity = (productId) => {
        return cart.items[productId];
    }

    const increment = (productId) => {
        const currentQuntity = cart.items[productId];
        const _cart = {...cart};
        _cart.items[productId] = currentQuntity + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }

    const decrement = (productId) => {
        const currentQuntity = cart.items[productId];
        
        if (currentQuntity === 1) {
            return;
        }

        const _cart = {...cart};
        _cart.items[productId] = currentQuntity - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }

    const getSum = (productId, price) => {
        const sum = price*getQuntity(productId);
        totalsum += sum;
        return sum;
    }

    const DeleteItem = (productId) => {
        const _cart = {...cart};
        const quntity = _cart.items[productId];
        delete _cart.items[productId];
        _cart.totalItems -= quntity;
        setCart(_cart);
        const productList = products.filter((product) => product._id !== productId);
        setProducts(productList);
    }

    const handleOrder = () => {
        window.alert('Order placed Successfully');
        setProducts([]);
        setCart({});
    }

    return(
        products.length === 0 ? <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt="empty cart"/> :
            <div className="container mx-auto lg:w-1/2 w-full pb-24">
                <h1 className="my-12 font-bold">Cart Items</h1>
                <ul>
                    {
                        products.map(product => {
                            return (
                                <li className="mb-12" key={product._id}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img className="h-16" src="/images/peproni.png" alt="pizza" />
                                            <span className="font-bold ml-4 w-48">{ product.name }</span>
                                        </div>
                                        <div>
                                            <button onClick={() => { decrement(product._id) }} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                                            <b className="px-4">{ getQuntity(product._id) }</b>
                                            <button onClick={() => { increment(product._id) }} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                                        </div>
                                        <span>₹ { getSum(product._id, product.price) }</span>
                                        <button onClick={() => {DeleteItem(product._id)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <hr className="my-6"/>
                <div className="text-right">
                    <b>Grand Total : ₹ </b> {totalsum}
                </div>
                <div className="text-right mt-6">
                    <button onClick={handleOrder} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
                </div>
            </div>
    )
}

export default Cart;