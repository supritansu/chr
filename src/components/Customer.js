import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Customer = () => {
    const { pid } = useParams();
    //const user = useSelector((store) => store.user.token);
    const user = localStorage.getItem("accessToken");
    const token = 'Bearer ' + user;
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
    });

    const order = () => {
        // Make sure to replace 'projectId' with the actual project ID
        const projectId = '3oxp02p5lcr2';

        fetch("https://academics.newtonschool.co/api/v1/ecommerce/order", {
            method: "POST",
            headers: {
                'projectId': projectId,
                "Authorization": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: pid,
                quantity: 1,
                addressType: "HOME",
                address: address,
            }),
        })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="main flex justify-center items-center h-[90vh] w-[100%] bg-slate-200">
                <div className="  h-[100%] w-[70%] bg-white p-10">
                    <h2>Enter Your Address</h2>
                    <form className="pt-3">
                        <div className="flex items-center gap-5 pb-3 ">
                            <h5 className=" pr-[30px] "> Street:</h5>
                            <input className="bg-[#f6f6f6] p-2 rounded-md"
                                type="text"
                                name="street"
                                placeholder="enter street"
                                value={address.street}
                                onChange={handleChange}
                            />
                        </div>
                 
                        <div className="flex items-center gap-5 pb-3">
                            <h5 className=" pr-[49px] ">  City:</h5>
                            <input className="bg-[#f6f6f6] p-2 rounded-md"
                                type="text"
                                name="city"
                                placeholder="enter city"
                                value={address.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center gap-5 pb-3">
                            <h5 className=" pr-[37px] "> State:</h5>
                            <input className="bg-[#f6f6f6] p-2 rounded-md"
                                type="text"
                                name="state"
                                placeholder="enter state"
                                value={address.state}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center gap-5 pb-3">
                           <h5 className=" pr-[8px] "> Country:</h5>
                            <input className="bg-[#f6f6f6] p-2 rounded-md"
                                type="text"
                                name="country"
                                placeholder="enter country"
                                value={address.country}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center gap-5 pb-3">
                            <h5 className=" pr-[0px] ">Zip Code:</h5>
                            <input className="bg-[#f6f6f6] p-2 rounded-md"
                                type="text"
                                name="zipCode"
                                placeholder="enter zip code"
                                value={address.zipCode}
                                onChange={handleChange}
                            />
                        </div>

                        <button className="rounded bg-[#353535] text-white py-2 px-3 " type="button" onClick={order}>
                            Order Now
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Customer;
