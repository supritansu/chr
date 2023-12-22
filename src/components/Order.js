import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Order = () => {
    //const user = useSelector((store) => store.user.token);
    const user = localStorage.getItem("accessToken");
    const token = 'Bearer ' + user;
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await fetch("https://academics.newtonschool.co/api/v1/ecommerce/order", {
                    method: "GET",
                    headers: {
                        'projectID': '3oxp02p5lcr2',
                        "Authorization": token,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order history');
                }

                const result = await response.json();
                setOrderHistory(result.data);
            } catch (error) {
                console.error('Error fetching order history:', error.message);
            }
        };

        fetchOrderHistory();
    }, [token]);
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
                <h2 className="ml-[210px]">Order History</h2>
                <div className="h-[100%] w-[100%] flex pb-4 justify-center items-start ">
                    <div className="h-[90%] w-[75%] gap-2 pb-4">
                        <div className="content h-400px] w-[100%] p-5 rounded bg-slate-100 m-4 ">
                            {orderHistory.map((order, index) => (
                                <div key={index}>
                                    <h3>Order {index + 1}</h3>
                                    <div className="main-content flex justify-between">
                                        <div className="item w-[40%]">
                                            <p>Ordered Items:</p>
                                            <ul>
                                                {order.order.items.map((item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        Product Name: {item.product.name}, Price: ${item.product.price}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <p className=" w-[10%]">Ordered at: {new Date(order.createdAt).toLocaleString()}</p>

                                        <div className="detail  w-[20%]">
                                            <p>Shipment Details:</p>
                                            <ul>
                                                <li>Street: {order.order.shipmentDetails.address.street}</li>
                                                <li>City: {order.order.shipmentDetails.address.city}</li>
                                                <li>State: {order.order.shipmentDetails.address.state}</li>
                                                <li>Country: {order.order.shipmentDetails.address.country}</li>
                                                <li>Zip Code: {order.order.shipmentDetails.address.zipCode}</li>
                                                <li>Type: {order.order.shipmentDetails.type}</li>
                                            </ul>
                                        </div>

                                        <p className=" w-[10%]">Total Price: ${order.order.totalPrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Order;
