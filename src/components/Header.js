import React, { useState, useEffect } from 'react';
import { image_link } from '../utils/constants';
import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css'
import SearchBar from "./SearchBar"
import "../Css/styles.css";



const Header = ({ setIscategory }) => {

    const [userLocation, setUserLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ latitude, longitude });

                        // Make API call to OpenWeatherMap
                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<YOUR_API_KEY>&units=metric`)
                            .then(response => response.json())
                            .then(data => {
                                setWeatherData(data);
                            })
                            .catch(error => console.log(error));
                    },
                    (error) => {
                        console.error("Error getting location:", error.message);
                        setUserLocation("Location not available");
                    }
                );
            } else {
                setUserLocation("Geolocation is not supported by this browser.");
            }
        };

        getLocation();
    }, []);


    return (
        <div className="header bg-black text-white p-4 ">
            <div className="header-part flex items-center justify-between">
                <div className="part1 gap-8 flex items-center justify-between">
                    <div className="flex items-center mb-2 md:mb-0">
                        <Link to={"/"}>
                            <div className="user mb-2 md:mb-0">
                                <img className=" h-7" src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1637759004/Croma%20Assets/CMS/Category%20icon/Final%20icon/Croma_Logo_acrkvn.svg' alt="Icon" />
                            </div>
                        </Link>
                        {/* <div className="menu ml-2">Menu</div> */}
                    </div>
                    {/*<div className="flex items-center mb-2 md:mb-0">
                        <div className="menuIcon">
                            <i class="ri-menu-fill"></i>Menu
                        </div>
                    </div>*/}
                </div>

                <div className="part2 gap-8 flex items-center justify-between">



                    <SearchBar />
                </div>

                <div className="part3 gap-8 flex items-center justify-between">
                    <div className="location mb-2 md:mb-0">
                        {/* Display the extracted location and weather information */}
                        {userLocation && typeof userLocation === "object" ? (
                            <>
                                <p className="text-xs md:text-base">{`Location: Lat ${userLocation.latitude}, Long ${userLocation.longitude}`}</p>
                            </>
                        ) : (
                            <span>{userLocation}</span>
                        )}
                    </div>

                    <Link className='under' to={"/order"}>
                        <div className="order under text-white">
                            Order History
                        </div>
                    </Link>

                    <Link className='under' to={"/login"}>
                        <div className="user text-white ">
                            <i class="ri-user-fill"></i>
                        </div>
                    </Link>

                    <Link className='under' to={"/cart"}>
                        <div className=" cart text-white" >
                            <i class="ri-shopping-cart-2-fill"></i>
                        </div>
                    </Link>
                </div>
            </div>


        </div>
    );
};

export default Header;
