import { useState } from "react";
import Product from "./Product";
import "../Css/styles.css";


const Categorycard = ({ props }) => {
    const [products, setProducts] = useState([]);
    console.log(props);
    console.log("I have been called--cc card");
    const fetchProducts = (pro) => {
        const num = -1
        console.log(pro)
        const projectId = '3oxp02p5lcr2';
        const url = `https://academics.newtonschool.co/api/v1/ecommerce/electronics/products?filter={"subCategory":"${pro}"}`;


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



    return (
        <div className='flex justify-center items-center
         '>
            <button
                className="circle bg-green-500 hover:bg-green-700 text-white font-bold"
                onClick={() => fetchProducts(props)}
            >
                {props}
            </button>

            {products.length > 0 && products.map((product) => {
                return <Product key={product._id} product={product} />;
            })}

        </div>)
}

export default Categorycard;