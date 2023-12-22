import { useEffect, useState } from "react";
import Product from "./Product";
import { useEffect } from "react";
import Categorycard from "./Categorycard";
import 'remixicon/fonts/remixicon.css'
import SearchBar from "./SearchBar"
import "../Css/styles.css";
import React, { useRef } from 'react';



const Category = () => {


    const scrollRef = useRef(null);

    const scrollTo = (position) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = position;
        }
    };

    const scrollLeft = () => {
        scrollTo(scrollRef.current.scrollLeft - 150); // Adjust the scroll amount 
    };

    const scrollRight = () => {
        scrollTo(scrollRef.current.scrollLeft + 150); // Adjust the scroll amount 
    };



    const [products, setProducts] = useState();
    useEffect(() => { fetchProducts(); }, [])

    const fetchProducts = () => {
        const num = -1
        const projectId = '3oxp02p5lcr2';
        const url = "https://academics.newtonschool.co/api/v1/ecommerce/electronics/categories"


        fetch(url, {

            method: 'GET',
            headers: {
                'projectID': projectId,
            },
        })
            .then(response => response.json())
            .then(data => {
                const p = data.data || [];
                setProducts(p);
                console.log(p);

            })

            .catch(error => {
                console.error('Error fetching products:', error);

            });
    };
    if (products == undefined) {
        return <h2>redering</h2>
    }
    else {

        return (
            <div id="Categoryy" className="bg-[rgb(19,19,19)] flex justify-center items-center flex-col relative">
                <h1 className="flex flex-col justify-center items-center gap-4 font-semibold text-xl text-white">These are the Categories</h1>

                <div ref={scrollRef}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        overflowX: 'scroll',
                        scrollBehavior: 'smooth',
                    }} className="relative categories flex flex-col justify-center items-center gap-4">

                    <div className="product-list flex text-sm items-center justify-start gap-4 flex-nowrap">
                        {products.length > 0 && products.map(product => (
                            <Categorycard key={product} props={product} />
                        ))}
                    </div>
                </div>

                <div className=" w-[75%] arrow flex text-white justify-between items-between" style={{ marginTop: '-88px', }}>
                    <button onClick={scrollLeft}>{<i class="ri-arrow-left-s-line"></i>}</button>
                    <button onClick={scrollRight}>{<i class="ri-arrow-right-s-line"></i>}</button>
                </div>

            </div>)
    }
}
export default Category;