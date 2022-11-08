import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from "../CartContext";

function SingleProduct(){

     const [product, setProduct] = useState({});
     const { cart, setCart } = useContext(CartContext);
     const params = useParams();
     const navigate = useNavigate();

     useEffect(() => {
        fetch(`/api/products/${params._id}`)
        .then(response => response.json())
        .then(product => {
            setProduct(product);
        })
     }, [params._id]);

     const addtocart = (event, product) => {
        event.preventDefault();
        let _cart = {...cart};

        if (!_cart.items) {
           _cart.items = {}
        }

        if (_cart.items[product._id]) {
           _cart.items[product._id] += 1;
        }
        else{
           _cart.items[product._id] = 1;
        }

        if (!_cart.totalItems) {
           _cart.totalItems = 0;
        }
        _cart.totalItems += 1;
        setCart(_cart);
   }

     return (
         <div className="container mx-auto mt-12">
            <button className="mb-12 font-bold" onClick={ () => { navigate('/') } }>Back</button>
            <div className="flex">
                <img src={product.image} alt="pizza" />
                <div className="ml-16 mt-5">
                    <h1 className="text-xl font-bold">{product.name}</h1>
                    <div className="text-md">{product.size}</div>
                    <div className="font-bold mt-2">₹ {product.price}</div>
                    <button onClick={(e) => {addtocart(e, product)}} className="bg-yellow-500 py-1 px-8 rounded-full font-bold mt-4">Add to cart</button>
                </div>
            </div>
         </div>
     )
}

export default SingleProduct;