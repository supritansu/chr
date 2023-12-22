import { useEffect, useState } from "react";
import Product from "./Product";
import { useEffect } from "react";

const Deal = () => {

    const [products, setProducts] = useState();
    useEffect(() => { fetchProducts(); }, [])

    const fetchProducts = () => {
        const num = -1
        const projectId = '3oxp02p5lcr2';
        const url = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?sort={"price":${num}}`;


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
            <>
            <div className="dod-items bg-[rgb(18,18,18)] flex flex-col justify-center items-center">
                <h1 className="text-white">Deals of the Day</h1>
                <div className="dod-item flex justify-center items-center">
                    <div className="scroll flex justify-center items-center gap-5">
                        {products.length > 0 && products.map(product => (
                        <Product key={product._id} product={product} />
                    ))}
                    </div>
                </div>
            </div>
            </>
        )
    }
}
export default Deal;
