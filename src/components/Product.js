// Product.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


const Product = ({ product }) => {
    console.log({ product })


    return (
        <Link to={`/product/${product._id}`}>
            <div className="h-[430px] w-[280px] rounded-lg bg-[#191919] hover:bg-[#202020] flex flex-col justify-center items-center">


                <img
                    src={product.displayImage}
                    alt={product.name}
                    className="object-cover rounded-t h-[250px] w-[80%] flex justify-center items-center"
                />



                <div className="h-[180px] w-[80%] content flex flex-col justify-around items-start">
                    <div className="font-bold text-l no-underline text-white">{product.name}</div>
                    <p className="text-white text-m no-underline">Price: ${product.price}</p>
                </div>

            </div>
        </Link>
    );
};

export default Product;
