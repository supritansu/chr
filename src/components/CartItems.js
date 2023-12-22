import React from 'react';
import Customer from './Customer';
import { Link } from 'react-router-dom';




const CartItems = ({ value, onDelete }) => {

    const { product, quantity, size } = value;
    const handleDelete = () => {
        // Call the onDelete function with the product ID
        onDelete(product._id);
    };

    return (
        // <div className="border p-4 mb-4 flex items-center">
        //     <img
        //         src={product.displayImage}
        //         alt={product.name}
        //         className="w-16 h-16 object-cover rounded mr-4"
        //     />
        //     <div className="flex-1">

        //         <button
        //             onClick={handleDelete}
        //             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        //         >Remove from Cart
        //         </button>

        //         <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        //         <p className="text-gray-700">${product.price}</p>
        //         <p className="text-gray-600">Quantity: {quantity}</p>
        //         <p className="text-gray-600">Size: {size}</p>
        //         <Link to={`/customer-details/${product._id}`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" value={product._id} value2={product.quantity}>
        //             Buy Now
        //         </Link>
        //     </div>
        // </div>

        <>
            <div className="cartItem bg-[#fff] border flex justify-between items-center h-[250px] w-[100%] p-1">
                <div className="img h-[250px] w-[35%] flex justify-center items-start">
                    <img
                        src={product.displayImage}
                        alt={product.name}
                        className=" h-[50%] rounded mr-4"
                    />
                </div>
                <div className="img h-[250px] w-[43%]flex flex-col justify-evenly items-start">
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>

                    <p className="text-gray-600">Quantity: {quantity}</p>
                    <p className="text-gray-600">Size: {size}</p>

                    <div className="btn">
                        <Link to={`/customer-details/${product._id}`} className=" text-black border hover:bg-gray-200 ml-[-15px] mr-3 px-4 py-2 rounded no-underline" value={product._id} value2={product.quantity}>
                            Buy Now
                        </Link>
                        <button
                            onClick={handleDelete}
                            className=" text-black border px-4 py-2 rounded hover:bg-gray-200"
                        >Remove from Cart
                        </button>
                    </div>
                </div>
                <div className="img h-[250px] w-[18%] flex justify-center items-start pt-5">
                    <p className="text-black">${product.price}</p>
                </div>
            </div>
        </>
    );
};

export default CartItems;
