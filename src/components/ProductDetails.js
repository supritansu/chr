import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "./Review";
import MyContext from "./MyContext";
import { useSelector } from "react-redux";
import Image from "./Image";
import Video from "./Video";



const ProductDetails = () => {




    console.log("I have been called")
    const product_link = "https://academics.newtonschool.co/api/v1/ecommerce/product/"
    const product_review = "https://academics.newtonschool.co/api/v1/ecommerce/review/"
    const cart_link = "https://academics.newtonschool.co/api/v1/ecommerce/cart/"
    const { pid } = useParams();
    console.log(pid)

    const [details, setdetails] = useState([]);
    const [reviews, setreviews] = useState([]);

    //const user = useSelector((store) => store.user.token)
    const user = localStorage.getItem("accessToken");
    const token = 'Bearer ' + user;
    useEffect(() => {
        console.log("Use Effect")
        // Your code for side effects goes here
        fetchDetails()

        // It can return a cleanup function, which will be run before the component is unmounted

    }, []);
    const addCart = () => {
        var myHeaders = new Headers();

        myHeaders.append("Authorization", token);

        myHeaders.append("projectID", "3oxp02p5lcr2");

        myHeaders.append("Content-Type", "application/javascript");

        var raw = "{\n quantity: 1\n}";

        var requestOptions = {

            method: 'PATCH',

            headers: myHeaders,

            body: raw,

            redirect: 'follow'

        };
        //console.log("Added to cart is called")
        //const projectId = '3oxp02p5lcr2';

        const url = cart_link + pid;


        //const params = new URLSearchParams();

        //params.append('quantity', 1);
        fetch(url, requestOptions,

        )
            .then(response => response.json())
            .then(data => {
                const cartitems = data || [];

                console.log("Item added to cart", cartitems)
                console.log(token)

            })

            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    };
    const fetchDetails = () => {
        const projectId = '3oxp02p5lcr2';
        const url = product_link + pid;
        console.log(url)

        fetch(url, {

            method: 'GET',
            headers: {


                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const newdetails = data.data || [];
                setdetails(newdetails)
                console.log(newdetails)

            })

            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const fetchReview = () => {
        console.log("Fethreview called")
        const projectId = '3oxp02p5lcr2';
        const url = product_review + pid;


        fetch(url, {

            method: 'GET',
            headers: {
                'Authorization': token,
                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const newreviews = data.data || [];
                setreviews(newreviews)
                console.log(newreviews)

            })

            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    };

    const addReview = () => {
        console.log("Fethreview called")
        const projectId = '3oxp02p5lcr2';
        const url = product_review + pid;


        fetch(url, {

            method: 'POST',
            headers: {
                'Authorization': token,
                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const newreviews = data.data || [];
                setreviews(newreviews)
                console.log(newreviews)

            })

            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    };
    if (details.length <= 0) {
        return <p>Loading</p>
    }
    else {
        return (
            <div className="main w-full bg-[#181818] flex justify-center items-center">
                <div className="main-part bg-[#181818] flex items-center justify-center w-4/5">
                    <div className="left pt-60 h-[400px] w-[250px] flex flex-col gap-2 items-center justify-center">
                        {/* Array of Small Images on the Left */}
                        {details.images.length > 0 &&
                            details.images.map((image, index) => (
                                <div className="small-pic bg-[#171717] border-2 border-[#a4a4a4] p-2 h-[100px] w-[100px]">
                                    <Image key={index} props={image} />
                                </div>
                            ))}
                    </div>

                    {/* Videos on the Right
                    {details.videos.length > 0 && (
                        <div className="mx-4">
                            {details.videos.map((video, index) => (
                                <Video key={index} props={video} />
                            ))}
                        </div>
                    )} */}

                    {/* Main Display Image */}
                    <div className="max-w-sm mx-4">
                        <img src={details.displayImage} alt={details.name} className="w-full" />
                    </div>


                    <div className="content">
                        <h1 className="text-xl text-white font-bold mt-4 mb-2">{details.name}</h1>
                        {/* <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={fetchReview}
                        >
                            Fetch Reviews
                        </button> */}

                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={addCart}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Remove from Cart
                        </button>
                    </div>

                    {reviews.length > 0 && (
                        <div className="mt-4">
                            {reviews.map(review => (
                                <Review key={review._id} props={review} />
                            ))}
                        </div>
                    )}
                </div>
            </div>


        );
    }
}
export default ProductDetails;