import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartItems from "./CartItems";
import "../Css/styles.css";

const Cart = () => {
    //const user = useSelector((store) => store.user.token);
    const user = localStorage.getItem("accessToken");
    const token = 'Bearer ' + user;
    console.log(token)

    const [items, setItems] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = "https://academics.newtonschool.co/api/v1/ecommerce/cart";

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'projectID': "3oxp02p5lcr2",
            },
        })
            .then(response => response.json())
            .then(result => {
                setItems(result);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);
    const handleDelete = async (productId) => {
        const deleteUrl = `https://academics.newtonschool.co/api/v1/ecommerce/cart/${productId}`;

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': token,
                    'projectID': '3oxp02p5lcr2', // Replace with your project ID
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete product from the cart');
            }

            // If the deletion is successful, fetch the updated cart
            const updatedCart = await response.json();
            setItems(updatedCart);
        } catch (error) {
            console.error('Error deleting product:', error.message);
        }
    };
    if (loading) {
        return <div>Loading...</div>; // Add a loading state
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Add an error state
    }

    if (items == undefined) {
        return <div>Your cart is empty</div>;
    } else {
        const list = items?.data?.items;
        console.log(items)



        // CSS styles
        const mainPart = {

        }
        if (!localStorage.getItem("accessToken")) {
            return (
                <div className="text-lg font-bold text-center p-4 bg-yellow-200 border border-yellow-400 rounded">
                    You are not logged in yet. Please log in to see your cart.
                </div>
            )
        }
        else {



            return (

                <>
                    <h2 className="pl-[16%] text">Your Cart</h2>
                    <div className="main bg-[#f9f9f9] flex flex-col justify-center items-center h-[100vh] w-[100%]">
                        <div className="h-[100%] w-[70%] ">
                            <div className="left p-2 flex flex-col gap-2 ">

                                <div className="coupon rounded bg-white px-2 flex justify-between items-center h-[60px] w-[75%] ">
                                    <div className="left">
                                        <h5 className="font-bold text-l">Apply Coupon</h5>
                                    </div>
                                    <div className="right font-bold text-2xl">
                                        <i class="ri-arrow-right-s-line"></i>
                                    </div>
                                </div>

                                <div className="content rounded h-[100%] w-[75%] bg-white">
                                    <div className="mx-4 flex gap-2 flex-col">
                                        <h1 className="text-2xl font-semibold mb-4">Total Price is ${items?.data?.totalPrice}</h1>
                                        {list.map((item, index) => (
                                            <CartItems key={index} value={item} onDelete={handleDelete} />
                                        ))}
                                    </div>
                                </div>

                            </div>
                            <div className="right"></div>
                        </div>
                    </div>
                </>
            );
        }
    }
};

export default Cart;
